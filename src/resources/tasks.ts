// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { ZodType } from 'zod';

import { APIPromise } from '../core/api-promise';
import { APIResource } from '../core/resource';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';
import {
  parseStructuredTaskOutput,
  stringifyStructuredOutput,
  type TaskCreateParamsWithSchema,
  type TaskViewWithSchema,
} from '../lib/parse';
import { BrowserState, reducer } from '../lib/stream';
import * as TasksAPI from './tasks';

export class Tasks extends APIResource {
  /**
   * Create and start a new AI agent task.
   *
   * This is the main endpoint for running AI agents. You can either:
   *
   * 1. Start a new session with a new task
   * 2. Add a follow-up task to an existing session
   *
   * When starting a new session:
   *
   * - A new browser session is created
   * - Credits are deducted from your account
   * - The agent begins executing your task immediately
   *
   * When adding to an existing session:
   *
   * - The agent continues in the same browser context
   * - No additional browser start up costs are charged (browser session is already
   *   active)
   * - The agent can build on previous work
   *
   * Key features:
   *
   * - Agent profiles: Define agent behavior and capabilities
   * - Browser profiles: Control browser settings and environment (only used for new
   *   sessions)
   * - File uploads: Include documents for the agent to work with
   * - Structured output: Define the format you want results in
   * - Task metadata: Add custom data for tracking and organization (useful when
   *   using webhooks)
   *
   * Args:
   *
   * - request: Complete task configuration including agent settings, browser
   *   settings, and task description
   *
   * Returns:
   *
   * - The created task ID together with the task's session ID
   *
   * Raises:
   *
   * - 402: If user has insufficient credits for a new session
   * - 404: If referenced agent/browser profiles don't exist
   * - 400: If session is stopped or already has a running task
   */
  create<T extends ZodType>(
    body: TaskCreateParamsWithSchema<T>,
    options?: RequestOptions,
  ): APIPromise<TaskCreateResponse>;
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<TaskCreateResponse>;
  create(
    body: TaskCreateParams | TaskCreateParamsWithSchema<ZodType>,
    options?: RequestOptions,
  ): APIPromise<TaskCreateResponse> {
    if (body.structuredOutputJson != null && typeof body.structuredOutputJson === 'object') {
      const schema = body.structuredOutputJson;

      const _body: TaskCreateParams = {
        ...body,
        structuredOutputJson: stringifyStructuredOutput(schema),
      };

      return this._client.post('/tasks', { body: _body, ...options });
    }

    return this._client.post('/tasks', { body, ...options });
  }

  /**
   * Get detailed information about a specific AI agent task.
   *
   * Retrieves comprehensive information about a task, including its current status,
   * progress, and detailed execution data. You can choose to get just the status
   * (for quick polling) or full details including steps and file information.
   *
   * Use this endpoint to:
   *
   * - Monitor task progress in real-time
   * - Review completed task results
   * - Debug failed tasks by examining steps
   * - Download output files and logs
   *
   * Args:
   *
   * - task_id: The unique identifier of the agent task
   *
   * Returns:
   *
   * - Complete task information
   *
   * Raises:
   *
   * - 404: If the user agent task doesn't exist
   */
  retrieve<T extends ZodType>(
    req: { taskId: string; schema: T },
    options?: RequestOptions,
  ): APIPromise<TaskViewWithSchema<T>>;
  retrieve(taskID: string, options?: RequestOptions): APIPromise<TaskView>;
  retrieve(req: string | { taskId: string; schema: ZodType }, options?: RequestOptions): APIPromise<unknown> {
    if (typeof req === 'string') {
      return this._client.get(path`/tasks/${req}`, options);
    }

    const { taskId, schema } = req;

    return this._client
      .get(path`/tasks/${taskId}`, options)
      ._thenUnwrap((rsp) => parseStructuredTaskOutput(rsp as TaskView, schema));
  }

  private async *watch(
    taskId: string,
    config: { interval: number },
    options?: RequestOptions,
  ): AsyncGenerator<{ event: 'status'; data: TaskView }> {
    const tick: { current: number } = { current: 0 };
    const state: { current: BrowserState } = { current: null };

    poll: do {
      if (options?.signal?.aborted) {
        break poll;
      }

      tick.current++;

      const status = await this.retrieve(taskId);

      const [newState, event] = reducer(state.current, { kind: 'status', status });

      if (event != null) {
        yield { event: 'status', data: event };

        if (event.status === 'finished') {
          break;
        }
      }

      state.current = newState;

      await new Promise((resolve) => setTimeout(resolve, config.interval));
    } while (true);
  }

  stream<T extends ZodType>(
    body: {
      taskId: string;
      schema: T;
    },
    options?: RequestOptions,
  ): AsyncGenerator<{ event: 'status'; data: TaskViewWithSchema<T> }>;
  stream(taskId: string, options?: RequestOptions): AsyncGenerator<{ event: 'status'; data: TaskView }>;
  async *stream(
    body: string | { taskId: string; schema: ZodType },
    options?: RequestOptions,
  ): AsyncGenerator<unknown> {
    let req: TaskCreateParams;

    const taskId = typeof body === 'object' ? body.taskId : body;

    for await (const msg of this.watch(taskId, { interval: 500 }, options)) {
      if (options?.signal?.aborted) {
        break;
      }

      if (typeof body === 'object') {
        const parsed = parseStructuredTaskOutput<ZodType>(msg.data, body.schema);
        yield { event: 'status', data: parsed };
      } else {
        yield { event: 'status', data: msg.data };
      }
    }
  }

  /**
   * Control the execution of an AI agent task.
   *
   * Allows you to pause, resume, or stop tasks, and optionally stop the entire
   * session. This is useful for:
   *
   * - Pausing long-running tasks to review progress
   * - Stopping tasks that are taking too long
   * - Ending sessions when you're done with all tasks
   *
   * Available actions:
   *
   * - STOP: Stop the current task
   * - PAUSE: Pause the task (can be resumed later)
   * - RESUME: Resume a paused task
   * - STOP_TASK_AND_SESSION: Stop the task and end the entire session
   *
   * Args:
   *
   * - task_id: The unique identifier of the agent task to control
   * - request: The action to perform on the task
   *
   * Returns:
   *
   * - The updated task information
   *
   * Raises:
   *
   * - 404: If the user agent task doesn't exist
   */
  update(taskID: string, body: TaskUpdateParams, options?: RequestOptions): APIPromise<TaskView> {
    return this._client.patch(path`/tasks/${taskID}`, { body, ...options });
  }

  /**
   * Get a paginated list of all AI agent tasks for the authenticated user.
   *
   * AI agent tasks are the individual jobs that your agents perform within a
   * session. Each task represents a specific instruction or goal that the agent
   * works on, such as filling out a form, extracting data, or navigating to specific
   * pages.
   *
   * You can control what data is included for each task:
   *
   * - Task steps: Detailed actions the agent took
   * - User uploaded files: Files you provided for the task
   * - Output files: Files generated by the agent during the task
   *
   * Returns:
   *
   * - A paginated list of agent tasks
   * - Total count of tasks
   * - Page information for navigation
   * - Optional detailed data based on your parameters
   */
  list(
    query: TaskListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskListResponse> {
    return this._client.get('/tasks', { query, ...options });
  }

  /**
   * Get a download URL for the execution logs of an AI agent task.
   *
   * Task logs contain detailed information about how the AI agent executed the task,
   * including:
   *
   * - Step-by-step reasoning and decisions
   * - Actions taken on web pages
   * - Error messages and debugging information
   * - Performance metrics and timing data
   *
   * This is useful for:
   *
   * - Understanding how the agent solved the task
   * - Debugging failed or unexpected results
   * - Optimizing agent behavior and prompts
   * - Auditing agent actions for compliance
   *
   * Args:
   *
   * - task_id: The unique identifier of the agent task
   *
   * Returns:
   *
   * - A presigned download URL for the task log file
   *
   * Raises:
   *
   * - 404: If the user agent task doesn't exist
   * - 500: If the download URL cannot be generated (should not happen)
   */
  getLogs(taskID: string, options?: RequestOptions): APIPromise<TaskGetLogsResponse> {
    return this._client.get(path`/tasks/${taskID}/logs`, options);
  }

  /**
   * Get a download URL for a specific output file generated by an AI agent task.
   *
   * AI agents can generate various output files during task execution, such as:
   *
   * - Screenshots of web pages
   * - Extracted data in CSV/JSON format
   * - Generated reports or documents
   * - Downloaded files from websites
   *
   * This endpoint provides a secure, time-limited download URL for accessing these
   * files. The URL expires after a short time for security.
   *
   * Args:
   *
   * - task_id: The unique identifier of the agent task
   * - file_id: The unique identifier of the output file
   *
   * Returns:
   *
   * - A presigned download URL for the requested file
   *
   * Raises:
   *
   * - 404: If the user agent task or output file doesn't exist
   * - 500: If the download URL cannot be generated (should not happen)
   */
  getOutputFile(
    fileID: string,
    params: TaskGetOutputFileParams,
    options?: RequestOptions,
  ): APIPromise<TaskGetOutputFileResponse> {
    const { task_id } = params;
    return this._client.get(path`/tasks/${task_id}/output-files/${fileID}`, options);
  }

  /**
   * Get a download URL for a specific user uploaded file that was used in the task.
   *
   * A user can upload files to their account file bucket and reference the name of
   * the file in a task. These files are then made available for the agent to use
   * during the agent task run.
   *
   * This endpoint provides a secure, time-limited download URL for accessing these
   * files. The URL expires after a short time for security.
   *
   * Args:
   *
   * - task_id: The unique identifier of the agent task
   * - file_id: The unique identifier of the user uploaded file
   *
   * Returns:
   *
   * - A presigned download URL for the requested file
   *
   * Raises:
   *
   * - 404: If the user agent task or user uploaded file doesn't exist
   * - 500: If the download URL cannot be generated (should not happen)
   */
  getUserUploadedFile(
    fileID: string,
    params: TaskGetUserUploadedFileParams,
    options?: RequestOptions,
  ): APIPromise<TaskGetUserUploadedFileResponse> {
    const { task_id } = params;
    return this._client.get(path`/tasks/${task_id}/user-uploaded-files/${fileID}`, options);
  }
}

/**
 * View model for representing an output file generated by the agent
 *
 * Attributes: id: Unique identifier for the output file file_name: Name of the
 * output file
 */
export interface FileView {
  id: string;

  fileName: string;
}

export type LlmModel =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4.1'
  | 'gpt-4.1-mini'
  | 'o4-mini'
  | 'o3'
  | 'gemini-2.0-flash'
  | 'gemini-2.0-flash-lite'
  | 'gemini-2.5-flash-preview-04-17'
  | 'gemini-2.5-flash'
  | 'gemini-2.5-pro'
  | 'claude-3-7-sonnet-20250219'
  | 'claude-sonnet-4-20250514'
  | 'llama-4-maverick-17b-128e-instruct';

/**
 * View model for representing a task with its execution details
 *
 * Attributes: id: Unique identifier for the task session_id: ID of the session
 * this task belongs to session_live_url: Optional live URL of the session llm: The
 * LLM model used for this task task: The task prompt/instruction given to the
 * agent status: Current status of the task execution started_at: Naive UTC
 * timestamp when the task was started finished_at: Naive UTC timestamp when the
 * task completed (None if still running) metadata: Optional additional metadata
 * associated with the task set by the user is_scheduled: Whether this task was
 * created as a scheduled task steps: Optional list of execution steps done_output:
 * Final output/result of the task user_uploaded_files: Optional list of files
 * uploaded by user for this task output_files: Optional list of files generated as
 * output by this task browser_use_version: Version of browser-use used for this
 * task (older tasks may not have this set) is_success: Whether the task was
 * successful (self-reported by the agent)
 */
export interface TaskItemView {
  id: string;

  isScheduled: boolean;

  llm: LlmModel;

  sessionId: string;

  startedAt: string;

  /**
   * Enumeration of possible task execution states
   *
   * Attributes: STARTED: Task has been started and is currently running PAUSED: Task
   * execution has been temporarily paused (can be resumed) STOPPED: Task execution
   * has been stopped (cannot be resumed) FINISHED: Task has completed successfully
   */
  status: TaskStatus;

  task: string;

  browserUseVersion?: string | null;

  doneOutput?: string | null;

  finishedAt?: string | null;

  isSuccess?: boolean | null;

  metadata?: { [key: string]: unknown };

  outputFiles?: Array<FileView> | null;

  sessionLiveUrl?: string | null;

  steps?: Array<TaskStepView> | null;

  userUploadedFiles?: Array<FileView> | null;
}

/**
 * Enumeration of possible task execution states
 *
 * Attributes: STARTED: Task has been started and is currently running PAUSED: Task
 * execution has been temporarily paused (can be resumed) STOPPED: Task execution
 * has been stopped (cannot be resumed) FINISHED: Task has completed successfully
 */
export type TaskStatus = 'started' | 'paused' | 'stopped' | 'finished';

/**
 * View model for representing a single step in a task's execution
 *
 * Attributes: number: Sequential step number within the task memory: Agent's
 * memory at this step evaluation_previous_goal: Agent's evaluation of the previous
 * goal completion next_goal: The goal for the next step url: Current URL the
 * browser is on for this step screenshot_url: Optional URL to the screenshot taken
 * at this step actions: List of stringified json actions performed by the agent in
 * this step
 */
export interface TaskStepView {
  actions: Array<string>;

  evaluationPreviousGoal: string;

  memory: string;

  nextGoal: string;

  number: number;

  url: string;

  screenshotUrl?: string | null;
}

/**
 * View model for representing a task with its execution details
 *
 * Attributes: id: Unique identifier for the task session_id: ID of the session
 * this task belongs to session_live_url: Optional live URL of the session llm: The
 * LLM model used for this task task: The task prompt/instruction given to the
 * agent status: Current status of the task execution started_at: Naive UTC
 * timestamp when the task was started finished_at: Naive UTC timestamp when the
 * task completed (None if still running) metadata: Optional additional metadata
 * associated with the task set by the user is_scheduled: Whether this task was
 * created as a scheduled task steps: List of execution steps done_output: Final
 * output/result of the task user_uploaded_files: List of files uploaded by user
 * for this task output_files: List of files generated as output by this task
 * browser_use_version: Version of browser-use used for this task (older tasks may
 * not have this set) is_success: Whether the task was successful (self-reported by
 * the agent)
 */
export interface TaskView {
  id: string;

  isScheduled: boolean;

  llm: LlmModel;

  outputFiles: Array<FileView>;

  sessionId: string;

  startedAt: string;

  /**
   * Enumeration of possible task execution states
   *
   * Attributes: STARTED: Task has been started and is currently running PAUSED: Task
   * execution has been temporarily paused (can be resumed) STOPPED: Task execution
   * has been stopped (cannot be resumed) FINISHED: Task has completed successfully
   */
  status: TaskStatus;

  steps: Array<TaskStepView>;

  task: string;

  userUploadedFiles: Array<FileView>;

  browserUseVersion?: string | null;

  doneOutput?: string | null;

  finishedAt?: string | null;

  isSuccess?: boolean | null;

  metadata?: { [key: string]: unknown };

  sessionLiveUrl?: string | null;
}

/**
 * Response model for creating a task
 *
 * Attributes: task_id: An unique identifier for the created task session_id: The
 * ID of the session this task belongs to
 */
export interface TaskCreateResponse {
  id: string;

  sessionId: string;
}

/**
 * Response model for paginated task list requests
 *
 * Attributes: items: List of task views for the current page
 */
export interface TaskListResponse {
  items: Array<TaskItemView>;

  pageNumber: number;

  pageSize: number;

  totalItems: number;
}

/**
 * Response model for log file requests
 *
 * Attributes: download_url: URL to download the log file
 */
export interface TaskGetLogsResponse {
  downloadUrl: string;
}

/**
 * Response model for output file requests
 *
 * Attributes: download_url: URL to download the output file
 */
export interface TaskGetOutputFileResponse {
  downloadUrl: string;
}

/**
 * Response model for user uploaded file requests
 *
 * Attributes: download_url: URL to download the user uploaded file
 */
export interface TaskGetUserUploadedFileResponse {
  downloadUrl: string;
}

export interface TaskCreateParams {
  task: string;

  /**
   * Configuration settings for the AI agent
   *
   * Attributes: llm: The LLM model to use for the agent profile_id: Unique
   * identifier of the agent profile to use for the task
   */
  agentSettings?: TaskCreateParams.AgentSettings;

  /**
   * Configuration settings for the browser session
   *
   * Attributes: session_id: Unique identifier of existing session to continue
   * profile_id: Unique identifier of browser profile to use save_browser_data:
   * Whether to save browser state/data for the user to download later
   */
  browserSettings?: TaskCreateParams.BrowserSettings;

  includedFileNames?: Array<string> | null;

  metadata?: { [key: string]: string } | null;

  secrets?: { [key: string]: string } | null;

  structuredOutputJson?: string | null;
}

export namespace TaskCreateParams {
  /**
   * Configuration settings for the AI agent
   *
   * Attributes: llm: The LLM model to use for the agent profile_id: Unique
   * identifier of the agent profile to use for the task
   */
  export interface AgentSettings {
    llm?: TasksAPI.LlmModel;

    profileId?: string | null;
  }

  /**
   * Configuration settings for the browser session
   *
   * Attributes: session_id: Unique identifier of existing session to continue
   * profile_id: Unique identifier of browser profile to use save_browser_data:
   * Whether to save browser state/data for the user to download later
   */
  export interface BrowserSettings {
    profileId?: string | null;

    saveBrowserData?: boolean;

    sessionId?: string | null;
  }
}

export interface TaskUpdateParams {
  /**
   * Available actions that can be performed on a task
   *
   * Attributes: STOP: Stop the current task execution PAUSE: Pause the current task
   * execution RESUME: Resume a paused task execution STOP_TASK_AND_SESSION: Stop
   * both the task and its parent session
   */
  action: 'stop' | 'pause' | 'resume' | 'stop_task_and_session';
}

export interface TaskListParams {
  /**
   * Enumeration of possible task filters
   *
   * Attributes: STARTED: All started tasks PAUSED: All paused tasks STOPPED: All
   * stopped tasks FINISHED: All finished tasks SUCCESSFUL: All successful tasks
   * UNSUCCESSFUL: All unsuccessful tasks
   */
  filterBy?: 'started' | 'paused' | 'stopped' | 'finished' | 'successful' | 'unsuccessful' | null;

  includeOutputFiles?: boolean;

  includeSteps?: boolean;

  includeUserUploadedFiles?: boolean;

  pageNumber?: number;

  pageSize?: number;

  sessionId?: string | null;
}

export interface TaskGetOutputFileParams {
  task_id: string;
}

export interface TaskGetUserUploadedFileParams {
  task_id: string;
}

export declare namespace Tasks {
  export {
    type FileView as FileView,
    type LlmModel as LlmModel,
    type TaskItemView as TaskItemView,
    type TaskStatus as TaskStatus,
    type TaskStepView as TaskStepView,
    type TaskView as TaskView,
    type TaskCreateResponse as TaskCreateResponse,
    type TaskListResponse as TaskListResponse,
    type TaskGetLogsResponse as TaskGetLogsResponse,
    type TaskGetOutputFileResponse as TaskGetOutputFileResponse,
    type TaskGetUserUploadedFileResponse as TaskGetUserUploadedFileResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskUpdateParams as TaskUpdateParams,
    type TaskListParams as TaskListParams,
    type TaskGetOutputFileParams as TaskGetOutputFileParams,
    type TaskGetUserUploadedFileParams as TaskGetUserUploadedFileParams,
  };
}
