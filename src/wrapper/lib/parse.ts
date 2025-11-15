import { createHash } from "crypto";
import stringify from "fast-json-stable-stringify";
import type { RequestOptions } from "node:http";
import z, { type ZodType } from "zod";

import type { BrowserUse } from "../../index.js";
import type { BrowserUseTasks } from "../api/BrowserUseTasks.js";
import type { CreateTaskRequest, TaskView } from "../../api/index.js";

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

export type PollConfig = {
    interval?: number;
};

export type WrappedTaskFnsWithSchema<T extends ZodType> = BrowserUse.TaskCreatedResponse & {
    /**
     * Streams the steps of the task and closes when the task is finished.
     */
    stream: (config?: PollConfig, options?: RequestOptions) => AsyncGenerator<BrowserUse.TaskStepView>;

    /**
     * Get the latest task update on every change.
     */
    watch: (
        config?: PollConfig,
        options?: RequestOptions,
    ) => AsyncGenerator<{ event: "status"; data: TaskViewWithSchema<T> }>;

    /**
     * Wait for the task to finish and return the result.
     */
    complete: (config?: PollConfig, options?: RequestOptions) => Promise<TaskViewWithSchema<T>>;
};

export type WrappedTaskFnsWithoutSchema = BrowserUse.TaskCreatedResponse & {
    /**
     * Streams the steps of the task and closes when the task is finished.
     */
    stream: (config?: PollConfig, options?: RequestOptions) => AsyncGenerator<BrowserUse.TaskStepView>;

    /**
     * Get the latest task update on every change.
     */
    watch: (config?: PollConfig, options?: RequestOptions) => AsyncGenerator<{ event: "status"; data: TaskView }>;

    /**
     * Wait for the task to finish and return the result.
     */
    complete: (config?: PollConfig, options?: RequestOptions) => Promise<TaskView>;
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
    async function* _watch(
        taskId: string,
        config?: PollConfig,
        options?: RequestOptions,
    ): AsyncGenerator<{ event: "status"; data: TaskView }> {
        const intervalMs = config?.interval ?? 2000;

        const hash: { current: string | null } = { current: null };

        poll: do {
            if (options?.signal?.aborted) {
                break poll;
            }

            const res = await client.getTask({ task_id: taskId });

            const resHash = getTaskViewHash(res);

            if (hash.current == null || resHash !== hash.current) {
                hash.current = resHash;

                yield { event: "status", data: res } satisfies { event: "status"; data: TaskView };
            }

            switch (res.status) {
                case "finished":
                case "stopped":

                case "started":
                    await new Promise((resolve) => setTimeout(resolve, intervalMs));
                    break;
                // default:
                //     throw new ExhaustiveSwitchCheck(res.status as never);
            }
        } while (true);
    }

    /**
     * Streams the steps of the task and closes when the task is finished.
     *
     * @description Logs each step of the task exactly once. If you start the stream again, it will log the steps again.
     */
    async function* stream(
        config?: { interval?: number },
        options?: RequestOptions,
    ): AsyncGenerator<BrowserUse.TaskStepView> {
        const steps: { total: number } = { total: 0 };

        for await (const msg of _watch(response.id, config, options)) {
            for (let i = steps.total; i < msg.data.steps.length; i++) {
                steps.total = i + 1;
                yield msg.data.steps[i] satisfies BrowserUse.TaskStepView;
            }
        }
    }

    function watch<T extends ZodType>(
        schema: T,
        config?: PollConfig,
        options?: RequestOptions,
    ): AsyncGenerator<{
        event: "status";
        data: TaskViewWithSchema<T>;
    }>;
    function watch(
        schema: null,
        config?: PollConfig,
        options?: RequestOptions,
    ): AsyncGenerator<{ event: "status"; data: TaskView }>;
    async function* watch(
        schema: ZodType | null,
        config?: PollConfig,
        options?: RequestOptions,
    ): AsyncGenerator<{ event: "status"; data: TaskViewWithSchema<ZodType> | TaskView }> {
        for await (const msg of _watch(response.id, config, options)) {
            if (options?.signal?.aborted) {
                break;
            }

            if (schema != null) {
                const parsed = parseStructuredTaskOutput<ZodType>(msg.data, schema);
                yield { event: "status", data: parsed } satisfies {
                    event: "status";
                    data: TaskViewWithSchema<ZodType>;
                };
            } else {
                yield { event: "status", data: msg.data } satisfies {
                    event: "status";
                    data: TaskView;
                };
            }
        }
    }

    function complete<T extends ZodType>(
        schema: T,
        config?: PollConfig,
        options?: RequestOptions,
    ): Promise<TaskViewWithSchema<T>>;
    function complete(schema: null, config?: PollConfig, options?: RequestOptions): Promise<TaskView>;
    async function complete(
        schema: ZodType | null,
        config?: PollConfig,
        options?: RequestOptions,
    ): Promise<TaskViewWithSchema<ZodType> | TaskView> {
        for await (const msg of _watch(response.id, config, options)) {
            switch (msg.data.status) {
                case "finished":
                case "stopped":
                case "started":
                    break;
                // default:
                // throw new ExhaustiveSwitchCheck(msg.data.status as never);
            }
        }

        throw new Error("Stream ended before the task finished!");
    }

    // NOTE: Finally, we return the wrapped task response.

    if (schema == null) {
        const wrapped: WrappedTaskFnsWithoutSchema = {
            ...response,
            stream: (config?: PollConfig, options?: RequestOptions) => stream(config, options),
            watch: (config?: PollConfig, options?: RequestOptions) => watch(null, config, options),
            complete: (config?: PollConfig, options?: RequestOptions) => complete(null, config, options),
        };

        return wrapped;
    } else {
        const wrapped: WrappedTaskFnsWithSchema<ZodType> = {
            ...response,
            stream: (config?: PollConfig, options?: RequestOptions) => stream(config, options),
            watch: (config?: PollConfig, options?: RequestOptions) => watch<ZodType>(schema, config, options),
            complete: (config?: PollConfig, options?: RequestOptions) => complete<ZodType>(schema, config, options),
        };

        return wrapped;
    }
}
