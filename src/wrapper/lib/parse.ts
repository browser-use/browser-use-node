import { createHash } from "crypto";
import stringify from "fast-json-stable-stringify";
import type { RequestOptions } from "node:http";
import z, { type ZodType } from "zod";

import type { BrowserUse } from "../../index.js";
import type { BrowserUseTasks } from "../api/BrowserUseTasks.js";
import type { CreateTaskRequest, TaskView } from "../../api/index.js";
import { ExhaustiveSwitchCheck } from "./types.js";

// RUN

export type CreateTaskRequestWithSchema<T extends ZodType> = Omit<CreateTaskRequest, "structuredOutput"> & {
    schema: T;
};

export function stringifyStructuredOutput<T extends ZodType>(schema: T): string {
    return JSON.stringify(z.toJSONSchema(schema));
}

// RETRIEVE

export type TaskViewWithSchema<T extends ZodType> = TaskView & {
    /**
     * The parsed output of the task.
     *
     * @example
     * ```ts
     * const task = await client.tasks.retrieve(taskId, { schema: z.object({ name: z.string() }) });
     * console.log(task.parsed);
     * ```
     */
    parsed: z.output<T> | null;
};

export function parseStructuredTaskOutput<T extends ZodType>(res: TaskView, schema: T): TaskViewWithSchema<T> {
    if (res.output == null) {
        return { ...res, parsed: null };
    }

    try {
        const parsed = JSON.parse(res.output);

        const response = schema.safeParse(parsed);
        if (!response.success) {
            throw new Error(`Invalid structured output: ${response.error.message}`);
        }

        return { ...res, parsed: response.data };
    } catch (e) {
        if (e instanceof SyntaxError) {
            return {
                ...res,
                parsed: null,
            };
        }
        throw e;
    }
}

/**
 * Hashes the task view to detect changes.
 * Uses fast-json-stable-stringify for deterministic JSON, then SHA-256.
 */
export function getTaskViewHash(view: TaskView): string {
    const dump = stringify(view);
    const hash = createHash("sha256").update(dump).digest("hex");
    return hash;
}

// Utils

export type WrappedTaskFnsWithSchema<T extends ZodType> = BrowserUse.TaskCreatedResponse & {
    stream: (options?: RequestOptions) => AsyncGenerator<{ event: "status"; data: TaskViewWithSchema<T> }>;
    complete: (options?: RequestOptions) => Promise<TaskViewWithSchema<T>>;
};

export type WrappedTaskFnsWithoutSchema = BrowserUse.TaskCreatedResponse & {
    stream: (options?: RequestOptions) => AsyncGenerator<{ event: "status"; data: TaskView }>;
    complete: (options?: RequestOptions) => Promise<TaskView>;
};

/**
 * Wraps the task created response with the stream and complete functions.
 */
export function wrapCreateTaskResponse<T extends ZodType>(
    client: BrowserUseTasks,
    response: BrowserUse.TaskCreatedResponse,
    schema: T,
): WrappedTaskFnsWithSchema<T>;
export function wrapCreateTaskResponse(
    client: BrowserUseTasks,
    response: BrowserUse.TaskCreatedResponse,
    schema: null,
): WrappedTaskFnsWithoutSchema;
export function wrapCreateTaskResponse(
    client: BrowserUseTasks,
    response: BrowserUse.TaskCreatedResponse,
    schema: ZodType | null,
): WrappedTaskFnsWithSchema<ZodType> | WrappedTaskFnsWithoutSchema {
    // NOTE: We create utility functions for streaming and watching internally in the function
    //       to expose them as utility methods to the base object.

    async function* watch(
        taskId: string,
        config: { interval: number },
        options?: RequestOptions,
    ): AsyncGenerator<{ event: "status"; data: TaskView }> {
        const hash: { current: string | null } = { current: null };

        poll: do {
            if (options?.signal?.aborted) {
                break poll;
            }

            const res = await client.getTask(taskId);

            const resHash = getTaskViewHash(res);

            if (hash.current == null || resHash !== hash.current) {
                hash.current = resHash;

                yield { event: "status", data: res };
            }

            switch (res.status) {
                case "finished":
                case "stopped":
                case "paused":
                    break poll;
                case "started":
                    await new Promise((resolve) => setTimeout(resolve, config.interval));
                    break;
                default:
                    throw new ExhaustiveSwitchCheck(res.status);
            }
        } while (true);
    }

    function stream<T extends ZodType>(
        schema: T,
        options?: RequestOptions,
    ): AsyncGenerator<{
        event: "status";
        data: TaskViewWithSchema<T>;
    }>;
    function stream(schema: null, options?: RequestOptions): AsyncGenerator<{ event: "status"; data: TaskView }>;
    async function* stream(
        schema: ZodType | null,
        options?: RequestOptions,
    ): AsyncGenerator<{ event: "status"; data: TaskViewWithSchema<ZodType> | TaskView }> {
        for await (const msg of watch(response.id, { interval: 500 }, options)) {
            if (options?.signal?.aborted) {
                break;
            }

            if (schema != null) {
                const parsed = parseStructuredTaskOutput<ZodType>(msg.data, schema);
                yield { event: "status", data: parsed };
            } else {
                yield { event: "status", data: msg.data };
            }
        }
    }

    function complete<T extends ZodType>(schema: T, options?: RequestOptions): Promise<TaskViewWithSchema<T>>;
    function complete(schema: null, options?: RequestOptions): Promise<TaskView>;
    async function complete(
        schema: ZodType | null,
        options?: RequestOptions,
    ): Promise<TaskViewWithSchema<ZodType> | TaskView> {
        if (schema != null) {
            const s = stream<ZodType>(schema, options);

            for await (const msg of s) {
                if (msg.data.status === "finished") {
                    return msg.data;
                }
            }
            throw new Error("Task did not finish");
        }

        for await (const msg of stream(null, options)) {
            if (msg.data.status === "finished") {
                return msg.data;
            }
        }
        throw new Error("Task did not finish");
    }

    // NOTE: Finally, we return the wrapped task response.

    if (schema == null) {
        const wrapped: WrappedTaskFnsWithoutSchema = {
            ...response,
            stream: (options?: RequestOptions) => stream(null, options),
            complete: (options?: RequestOptions) => complete(null, options),
        };

        return wrapped;
    }

    const wrapped: WrappedTaskFnsWithSchema<ZodType> = {
        ...response,
        stream: (options?: RequestOptions) => stream<ZodType>(schema, options),
        complete: (options?: RequestOptions) => complete<ZodType>(schema, options),
    };

    return wrapped;
}

// Playground

// function test1<T extends string>(val: { type: "string"; value: T }): T;
// function test1(val: { type: "null" }): null;
// function test1<T extends string>(val: { type: "string"; value: T } | { type: "null" }): T | null {
//     return val.type === "string" ? val.value : null;
// }

// function test2<T extends string>(val: { type: "string"; value: T }): T;
// function test2(val: { type: "null" }): null;
// function test2(val: { type: "string"; value: string } | { type: "null" }): string | null {
//     function util(val: { type: "string"; value: string } | { type: "null" }): string | null {
//         return val.type === "string" ? val.value : null;
//     }

//     return util(val);
// }

// const foo = test2({ type: "string", value: "bar" });
// const bar = test2({ type: "null" });
