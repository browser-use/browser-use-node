// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as TasksAPI from './tasks';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Tasks extends APIResource {
  /**
   * Create Task
   */
  create(body: TaskCreateParams, options?: RequestOptions): APIPromise<TaskView> {
    return this._client.post('/tasks', { body, ...options });
  }

  /**
   * Get Task
   */
  retrieve(
    taskID: string,
    query: TaskRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskRetrieveResponse> {
    return this._client.get(path`/tasks/${taskID}`, { query, ...options });
  }

  /**
   * Update Task
   */
  update(taskID: string, body: TaskUpdateParams, options?: RequestOptions): APIPromise<TaskView> {
    return this._client.patch(path`/tasks/${taskID}`, { body, ...options });
  }

  /**
   * List Tasks
   */
  list(
    query: TaskListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<TaskListResponse> {
    return this._client.get('/tasks', { query, ...options });
  }

  /**
   * Get Task Logs
   */
  retrieveLogs(taskID: string, options?: RequestOptions): APIPromise<TaskRetrieveLogsResponse> {
    return this._client.get(path`/tasks/${taskID}/logs`, options);
  }

  /**
   * Get Task Output File
   */
  retrieveOutputFile(
    fileName: string,
    params: TaskRetrieveOutputFileParams,
    options?: RequestOptions,
  ): APIPromise<TaskRetrieveOutputFileResponse> {
    const { task_id } = params;
    return this._client.get(path`/tasks/${task_id}/output-files/${fileName}`, options);
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
 * Attributes: STARTED: Task has been initiated and is currently running PAUSED:
 * Task execution has been temporarily paused STOPPED: Task execution has been
 * stopped (not completed) FINISHED: Task has completed successfully
 */
export type TaskStatus = 'started' | 'paused' | 'stopped' | 'finished';

/**
 * View model for representing a task with its execution details
 *
 * Attributes: id: Unique identifier for the task session_id: ID of the session
 * this task belongs to session_live_url: Live URL of the session llm: The LLM
 * model used for this task task: The task prompt/instruction given to the agent
 * status: Current status of the task execution started_at: Naive UTC timestamp
 * when the task was started finished_at: Naive UTC timestamp when the task
 * completed (None if still running) metadata: Additional metadata associated with
 * the task (optionally set by the user) is_scheduled: Whether this task was
 * created as a scheduled task steps: List of execution steps (optionally included
 * per user request) done_output: Final output/result of the task
 * user_uploaded_files: List of files uploaded by user for this task (optionally
 * included per user request) output_files: List of files generated as output by
 * this task (optionally included per user request) browser_use_version: Version of
 * browser-use used for this task
 */
export interface TaskView {
  id: string;

  doneOutput: string;

  isScheduled: boolean;

  llm: LlmModel;

  sessionId: string;

  startedAt: string;

  /**
   * Enumeration of possible task execution states
   *
   * Attributes: STARTED: Task has been initiated and is currently running PAUSED:
   * Task execution has been temporarily paused STOPPED: Task execution has been
   * stopped (not completed) FINISHED: Task has completed successfully
   */
  status: TaskStatus;

  task: string;

  browserUseVersion?: string | null;

  finishedAt?: string | null;

  metadata?: { [key: string]: unknown };

  outputFiles?: Array<string> | null;

  sessionLiveUrl?: string | null;

  steps?: Array<TaskView.Step> | null;

  userUploadedFiles?: Array<string> | null;
}

export namespace TaskView {
  /**
   * View model for representing a single step in a task's execution
   *
   * Attributes: number: Sequential step number within the task memory: Agent's
   * memory/context at this step evaluation_previous_goal: Agent's evaluation of the
   * previous goal completion next_goal: The goal for the next step url: Current URL
   * the browser is on for this step screenshot_url: URL to the screenshot taken at
   * this step actions: List of stringified json actions performed by the agent in
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
}

/**
 * View model for representing a task with its execution details
 *
 * Attributes: id: Unique identifier for the task session_id: ID of the session
 * this task belongs to session_live_url: Live URL of the session llm: The LLM
 * model used for this task task: The task prompt/instruction given to the agent
 * status: Current status of the task execution started_at: Naive UTC timestamp
 * when the task was started finished_at: Naive UTC timestamp when the task
 * completed (None if still running) metadata: Additional metadata associated with
 * the task (optionally set by the user) is_scheduled: Whether this task was
 * created as a scheduled task steps: List of execution steps (optionally included
 * per user request) done_output: Final output/result of the task
 * user_uploaded_files: List of files uploaded by user for this task (optionally
 * included per user request) output_files: List of files generated as output by
 * this task (optionally included per user request) browser_use_version: Version of
 * browser-use used for this task
 */
export type TaskRetrieveResponse = TaskView | TaskRetrieveResponse.TaskStatusView;

export namespace TaskRetrieveResponse {
  /**
   * Minimal view for returning just the task status
   *
   * Attributes: status: Current status of the task
   */
  export interface TaskStatusView {
    /**
     * Enumeration of possible task execution states
     *
     * Attributes: STARTED: Task has been initiated and is currently running PAUSED:
     * Task execution has been temporarily paused STOPPED: Task execution has been
     * stopped (not completed) FINISHED: Task has completed successfully
     */
    status: TasksAPI.TaskStatus;
  }
}

/**
 * Response model for paginated task list requests
 *
 * Attributes: items: List of task views for the current page
 */
export interface TaskListResponse {
  items: Array<TaskView>;

  pageNumber: number;

  pageSize: number;

  totalItems: number;
}

/**
 * Response model for log file requests
 *
 * Attributes: download_url: URL to download the log file
 */
export interface TaskRetrieveLogsResponse {
  downloadUrl: string;
}

/**
 * Response model for output file requests
 *
 * Attributes: download_url: URL to download the output file
 */
export interface TaskRetrieveOutputFileResponse {
  downloadUrl: string;
}

export interface TaskCreateParams {
  task: string;

  /**
   * Configuration settings for the AI agent
   *
   * Attributes: llm: The LLM model to use for the agent (default: O3 - best
   * performance for now) profile_id: ID of the agent profile to use for the task
   * (None for default)
   */
  agentSettings?: TaskCreateParams.AgentSettings;

  /**
   * Configuration settings for the browser session
   *
   * Attributes: session_id: ID of existing session to continue (None for new
   * session) profile_id: ID of browser profile to use (None for default)
   * save_browser_data: Whether to save browser state/data for the user to download
   * later
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
   * Attributes: llm: The LLM model to use for the agent (default: O3 - best
   * performance for now) profile_id: ID of the agent profile to use for the task
   * (None for default)
   */
  export interface AgentSettings {
    llm?: TasksAPI.LlmModel;

    profileId?: string | null;
  }

  /**
   * Configuration settings for the browser session
   *
   * Attributes: session_id: ID of existing session to continue (None for new
   * session) profile_id: ID of browser profile to use (None for default)
   * save_browser_data: Whether to save browser state/data for the user to download
   * later
   */
  export interface BrowserSettings {
    profileId?: string | null;

    saveBrowserData?: boolean;

    sessionId?: string | null;
  }
}

export interface TaskRetrieveParams {
  statusOnly?: boolean;
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
  includeOutputFiles?: boolean;

  includeSteps?: boolean;

  includeUserUploadedFiles?: boolean;

  pageNumber?: number;

  pageSize?: number;
}

export interface TaskRetrieveOutputFileParams {
  task_id: string;
}

export declare namespace Tasks {
  export {
    type LlmModel as LlmModel,
    type TaskStatus as TaskStatus,
    type TaskView as TaskView,
    type TaskRetrieveResponse as TaskRetrieveResponse,
    type TaskListResponse as TaskListResponse,
    type TaskRetrieveLogsResponse as TaskRetrieveLogsResponse,
    type TaskRetrieveOutputFileResponse as TaskRetrieveOutputFileResponse,
    type TaskCreateParams as TaskCreateParams,
    type TaskRetrieveParams as TaskRetrieveParams,
    type TaskUpdateParams as TaskUpdateParams,
    type TaskListParams as TaskListParams,
    type TaskRetrieveOutputFileParams as TaskRetrieveOutputFileParams,
  };
}
