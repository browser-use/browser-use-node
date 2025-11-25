import type { ZodType } from "zod";

import * as BrowserUse from "../../api/index.js";
import * as core from "../../core/index.js";
import { TasksClient } from "../../api/resources/tasks/client/Client.js";
import {
    type CreateTaskRequestWithSchema,
    type WrappedTaskFnsWithSchema,
    type WrappedTaskFnsWithoutSchema,
    type TaskViewWithSchema,
    stringifyStructuredOutput,
    wrapCreateTaskResponse,
    parseStructuredTaskOutput,
} from "../lib/parse.js";

export class BrowserUseTasks extends TasksClient {
    constructor(options: TasksClient.Options) {
        super(options);
    }

    public createTask<T extends ZodType>(
        request: CreateTaskRequestWithSchema<T>,
        requestOptions?: TasksClient.RequestOptions,
    ): core.HttpResponsePromise<WrappedTaskFnsWithSchema<T>>;
    public createTask(
        request: BrowserUse.CreateTaskRequest,
        requestOptions?: TasksClient.RequestOptions,
    ): core.HttpResponsePromise<WrappedTaskFnsWithoutSchema>;
    public createTask(
        request: BrowserUse.CreateTaskRequest | CreateTaskRequestWithSchema<ZodType>,
        requestOptions?: TasksClient.RequestOptions,
    ):
        | core.HttpResponsePromise<WrappedTaskFnsWithSchema<ZodType>>
        | core.HttpResponsePromise<WrappedTaskFnsWithoutSchema> {
        if ("schema" in request) {
            const req: BrowserUse.CreateTaskRequest = {
                ...request,
                structuredOutput: stringifyStructuredOutput(request.schema),
            };

            const promise: Promise<core.WithRawResponse<WrappedTaskFnsWithSchema<ZodType>>> = super
                .createTask(req, requestOptions)
                .withRawResponse()
                .then((res) => {
                    const wrapped = wrapCreateTaskResponse(this, res.data, request.schema);

                    return {
                        data: wrapped,
                        rawResponse: res.rawResponse,
                    };
                });

            return core.HttpResponsePromise.fromPromise(promise);
        }

        const promise: Promise<core.WithRawResponse<WrappedTaskFnsWithoutSchema>> = super
            .createTask(request, requestOptions)
            .withRawResponse()
            .then((res) => {
                const wrapped = wrapCreateTaskResponse(this, res.data, null);

                return {
                    data: wrapped,
                    rawResponse: res.rawResponse,
                };
            });

        return core.HttpResponsePromise.fromPromise(promise);
    }

    public getTask<T extends ZodType>(
        request: { task_id: string; schema: T },
        requestOptions?: TasksClient.RequestOptions,
    ): core.HttpResponsePromise<TaskViewWithSchema<T>>;
    public getTask(
        request: BrowserUse.GetTaskTasksTaskIdGetRequest,
        requestOptions?: TasksClient.RequestOptions,
    ): core.HttpResponsePromise<BrowserUse.TaskView>;
    public getTask(
        request: { task_id: string; schema?: ZodType },
        requestOptions?: TasksClient.RequestOptions,
    ): core.HttpResponsePromise<BrowserUse.TaskView | TaskViewWithSchema<ZodType>> {
        if (!request.schema) {
            return super.getTask(request, requestOptions);
        }

        const { task_id, schema } = request;

        const promise: Promise<core.WithRawResponse<TaskViewWithSchema<ZodType>>> = super
            .getTask({ task_id }, requestOptions)
            .withRawResponse()
            .then((res) => {
                const parsed = parseStructuredTaskOutput(res.data, schema);

                return {
                    data: parsed,
                    rawResponse: res.rawResponse,
                };
            });

        return core.HttpResponsePromise.fromPromise(promise);
    }
}
