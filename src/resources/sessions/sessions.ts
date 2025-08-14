// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SessionsAPI from './sessions';
import * as TasksAPI from '../tasks';
import * as PublicShareAPI from './public-share';
import { PublicShare, ShareView } from './public-share';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Sessions extends APIResource {
  publicShare: PublicShareAPI.PublicShare = new PublicShareAPI.PublicShare(this._client);

  /**
   * Get detailed information about a specific AI agent session.
   *
   * Retrieves comprehensive information about a session, including its current
   * status, live browser URL (if active), recording URL (if completed), and optional
   * task details. This endpoint is useful for monitoring active sessions or
   * reviewing completed ones.
   *
   * Args:
   *
   * - session_id: The unique identifier of the agent session
   * - params: Optional parameters to control what data is included
   *
   * Returns:
   *
   * - Complete session information including status, URLs, and optional task details
   *
   * Raises:
   *
   * - 404: If the user agent session doesn't exist
   */
  retrieve(
    sessionID: string,
    query: SessionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionView> {
    return this._client.get(path`/sessions/${sessionID}`, { query, ...options });
  }

  /**
   * Update a session's status or perform actions on it.
   *
   * Currently supports stopping a session, which will:
   *
   * 1. Stop any running tasks in the session
   * 2. End the browser session
   * 3. Generate a recording URL if available
   * 4. Update the session status to 'stopped'
   *
   * This is useful for manually stopping long-running sessions or when you want to
   * end a session before all tasks are complete.
   *
   * Args:
   *
   * - session_id: The unique identifier of the agent session to update
   * - request: The action to perform on the session
   *
   * Returns:
   *
   * - The updated session information including the new status and recording URL
   *
   * Raises:
   *
   * - 404: If the user agent session doesn't exist
   */
  update(sessionID: string, body: SessionUpdateParams, options?: RequestOptions): APIPromise<SessionView> {
    return this._client.patch(path`/sessions/${sessionID}`, { body, ...options });
  }

  /**
   * Get a paginated list of all AI agent sessions for the authenticated user.
   *
   * AI agent sessions represent active or completed browsing sessions where your AI
   * agents perform tasks. Each session can contain multiple tasks and maintains
   * browser state throughout the session lifecycle.
   *
   * You can filter sessions by status and optionally include task details for each
   * session.
   *
   * Returns:
   *
   * - A paginated list of agent sessions
   * - Total count of sessions
   * - Page information for navigation
   * - Optional task details for each session (if requested)
   */
  list(
    query: SessionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionListResponse> {
    return this._client.get('/sessions', { query, ...options });
  }
}

/**
 * Enumeration of possible (browser) session states
 *
 * Attributes: ACTIVE: Session is currently active and running (browser is running)
 * STOPPED: Session has been stopped and is no longer active (browser is stopped)
 */
export type SessionStatus = 'active' | 'stopped';

/**
 * View model for representing a (browser) session with its associated tasks.
 *
 * Attributes: id: Unique identifier for the session. status: Current status of the
 * session (active/stopped). live_url: URL where the browser can be viewed live in
 * real-time. started_at: Timestamp when the session was created and started.
 * finished_at: Timestamp when the session was stopped (None if still active).
 * tasks: Optional list of tasks associated with this session. record_url: URL to
 * access the recorded session playback. public_share_url: Optional URL to access
 * the public share of the session.
 */
export interface SessionView {
  id: string;

  startedAt: string;

  /**
   * Enumeration of possible (browser) session states
   *
   * Attributes: ACTIVE: Session is currently active and running (browser is running)
   * STOPPED: Session has been stopped and is no longer active (browser is stopped)
   */
  status: SessionStatus;

  finishedAt?: string | null;

  liveUrl?: string | null;

  publicShareUrl?: string | null;

  recordUrl?: string | null;

  tasks?: Array<SessionView.Task> | null;
}

export namespace SessionView {
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
  export interface Task {
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

    outputFiles?: Array<Task.OutputFile> | null;

    sessionLiveUrl?: string | null;

    steps?: Array<Task.Step> | null;

    userUploadedFiles?: Array<Task.UserUploadedFile> | null;
  }

  export namespace Task {
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
 * Response model for paginated session list requests
 *
 * Attributes: items: List of session views for the current page
 */
export interface SessionListResponse {
  items: Array<SessionListResponse.Item>;

  pageNumber: number;

  pageSize: number;

  totalItems: number;
}

export namespace SessionListResponse {
  /**
   * View model for representing a (browser) session with its associated tasks.
   *
   * Attributes: id: Unique identifier for the session. status: Current status of the
   * session (active/stopped). live_url: URL where the browser can be viewed live in
   * real-time. started_at: Timestamp when the session was created and started.
   * finished_at: Timestamp when the session was stopped (None if still active).
   * tasks: Optional list of tasks associated with this session.
   */
  export interface Item {
    id: string;

    startedAt: string;

    /**
     * Enumeration of possible (browser) session states
     *
     * Attributes: ACTIVE: Session is currently active and running (browser is running)
     * STOPPED: Session has been stopped and is no longer active (browser is stopped)
     */
    status: SessionsAPI.SessionStatus;

    finishedAt?: string | null;

    liveUrl?: string | null;

    tasks?: Array<Item.Task> | null;
  }

  export namespace Item {
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
    export interface Task {
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

      outputFiles?: Array<Task.OutputFile> | null;

      sessionLiveUrl?: string | null;

      steps?: Array<Task.Step> | null;

      userUploadedFiles?: Array<Task.UserUploadedFile> | null;
    }

    export namespace Task {
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
}

export interface SessionRetrieveParams {
  includeTasks?: boolean;
}

export interface SessionUpdateParams {
  /**
   * Available actions that can be performed on a session
   *
   * Attributes: STOP: Stop the session and all its associated tasks (cannot be
   * undone)
   */
  action: 'stop';
}

export interface SessionListParams {
  /**
   * Enumeration of possible (browser) session states
   *
   * Attributes: ACTIVE: Session is currently active and running (browser is running)
   * STOPPED: Session has been stopped and is no longer active (browser is stopped)
   */
  filterBy?: SessionStatus | null;

  includeTasks?: boolean;

  pageNumber?: number;

  pageSize?: number;
}

Sessions.PublicShare = PublicShare;

export declare namespace Sessions {
  export {
    type SessionStatus as SessionStatus,
    type SessionView as SessionView,
    type SessionListResponse as SessionListResponse,
    type SessionRetrieveParams as SessionRetrieveParams,
    type SessionUpdateParams as SessionUpdateParams,
    type SessionListParams as SessionListParams,
  };

  export { PublicShare as PublicShare, type ShareView as ShareView };
}
