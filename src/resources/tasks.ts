// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { ZodType } from 'zod';

import { APIResource } from '../core/resource';
import * as TasksAPI from './tasks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';
import {
  parseStructuredTaskOutput,
  stringifyStructuredOutput,
  type TaskViewWithStructuredOutput,
  type GetTaskStatusParamsWithStructuredOutput,
  type RunTaskCreateParamsWithStructuredOutput,
} from '../lib/parse';

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
   * - The created task with its initial details
   *
   * Raises:
   *
   * - 402: If user has insufficient credits for a new session
   * - 404: If referenced agent/browser profiles don't exist
   * - 400: If session is stopped or already has a running task
   */
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<TaskView> {
    return this._client.post('/tasks', { body, ...options });
  }

  createWithStructuredOutput<T extends ZodType>(
    body: RunTaskCreateParamsWithStructuredOutput<T>,
    options?: RequestOptions,
  ): APIPromise<TaskViewWithStructuredOutput<T>> {
    return this.create(stringifyStructuredOutput(body), options)._thenUnwrap((rsp) =>
      parseStructuredTaskOutput(rsp as TaskView, body),
    );
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
  retrieve(taskID: string, options?: RequestOptions): APIPromise<TaskView> {
    return this._client.get(path`/tasks/${taskID}`, options);
  }

  retrieveWithStructuredOutput<T extends ZodType>(
    taskID: string,
    query: GetTaskStatusParamsWithStructuredOutput<T>,
    options?: RequestOptions,
  ): APIPromise<TaskViewWithStructuredOutput<T>> {
    // NOTE: We manually remove structuredOutputJson from the query object because
    //       it's not a valid Browser Use Cloud parameter.
    const { structuredOutputJson, ...rest } = query;

    return this.retrieve(taskID, rest, options)._thenUnwrap((rsp) =>
      parseStructuredTaskOutput(rsp as TaskView, query),
    );
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
  retrieveLogs(taskID: string, options?: RequestOptions): APIPromise<TaskRetrieveLogsResponse> {
    return this._client.get(path`/tasks/${taskID}/logs`, options);
  }
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
 * Enumeration of possible task execution states
 *
 * Attributes: STARTED: Task has been started and is currently running PAUSED: Task
 * execution has been temporarily paused (can be resumed) STOPPED: Task execution
 * has been stopped (cannot be resumed) FINISHED: Task has completed successfully
 */
export type TaskStatus = 'started' | 'paused' | 'stopped' | 'finished';

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

  outputFiles: Array<TaskView.OutputFile>;

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

  steps: Array<TaskView.Step>;

  task: string;

  userUploadedFiles: Array<TaskView.UserUploadedFile>;

  browserUseVersion?: string | null;

  doneOutput?: string | null;

  finishedAt?: string | null;

  isSuccess?: boolean | null;

  metadata?: { [key: string]: unknown };

  sessionLiveUrl?: string | null;
}

export namespace TaskView {
  /**
   * View model for representing an output file generated by the agent
   *
   * Attributes: id: Unique identifier for the output file file_name: Name of the
   * output file
   */
  export interface OutputFile {
    id: string;

    fileName: string;
  }

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
  export interface Step {
    actions: Array<string>;

    evaluationPreviousGoal: string;

    memory: string;

    nextGoal: string;

    number: number;

    url: string;

    screenshotUrl?: string | null;
  }

  /**
   * View model for representing an output file generated by the agent
   *
   * Attributes: id: Unique identifier for the output file file_name: Name of the
   * output file
   */
  export interface UserUploadedFile {
    id: string;

    fileName: string;
  }
}

/**
 * Response model for paginated task list requests
 *
 * Attributes: items: List of task views for the current page
 */
export interface TaskListResponse {
  items: Array<TaskListResponse.Item>;

  pageNumber: number;

  pageSize: number;

  totalItems: number;
}

export namespace TaskListResponse {
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
  export interface Item {
    id: string;

    isScheduled: boolean;

    llm: TasksAPI.LlmModel;

    sessionId: string;

    startedAt: string;

    /**
     * Enumeration of possible task execution states
     *
     * Attributes: STARTED: Task has been started and is currently running PAUSED: Task
     * execution has been temporarily paused (can be resumed) STOPPED: Task execution
     * has been stopped (cannot be resumed) FINISHED: Task has completed successfully
     */
    status: TasksAPI.TaskStatus;

    task: string;

    browserUseVersion?: string | null;

    doneOutput?: string | null;

    finishedAt?: string | null;

    isSuccess?: boolean | null;

    metadata?: { [key: string]: unknown };

    outputFiles?: Array<Item.OutputFile> | null;

    sessionLiveUrl?: string | null;

    steps?: Array<Item.Step> | null;

    userUploadedFiles?: Array<Item.UserUploadedFile> | null;
  }

  export namespace Item {
    /**
     * View model for representing an output file generated by the agent
     *
     * Attributes: id: Unique identifier for the output file file_name: Name of the
     * output file
     */
    export interface OutputFile {
      id: string;

      fileName: string;
    }

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
    export interface Step {
      actions: Array<string>;

      evaluationPreviousGoal: string;

      memory: string;

      nextGoal: string;

      number: number;

      url: string;

      screenshotUrl?: string | null;
    }

    /**
     * View model for representing an output file generated by the agent
     *
     * Attributes: id: Unique identifier for the output file file_name: Name of the
     * output file
     */
    export interface UserUploadedFile {
      id: string;

      fileName: string;
    }
  }
}

/**
 * Response model for log file requests
 *
 * Attributes: download_url: URL to download the log file
 */
export interface TaskRetrieveLogsResponse {
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

export declare namespace Tasks {
  export {
    type LlmModel as LlmModel,
    type TaskStatus as TaskStatus,
    type TaskView as TaskView,
    type TaskListResponse as TaskListResponse,
    type TaskRetrieveLogsResponse as TaskRetrieveLogsResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskUpdateParams as TaskUpdateParams,
    type TaskListParams as TaskListParams,
  };
}
