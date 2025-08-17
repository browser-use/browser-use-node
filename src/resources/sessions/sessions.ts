// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SessionsAPI from './sessions';
import * as TasksAPI from '../tasks';
import * as PublicShareAPI from './public-share';
import { PublicShare, ShareView } from './public-share';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
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
  retrieve(sessionID: string, options?: RequestOptions): APIPromise<SessionView> {
    return this._client.get(path`/sessions/${sessionID}`, options);
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

  /**
   * Delete a session and all its associated data.
   *
   * Permanently removes a session and all its tasks, browser data, and public
   * shares. This action cannot be undone. Use this endpoint to clean up old sessions
   * and free up storage space.
   *
   * Args:
   *
   * - session_id: The unique identifier of the agent session to delete
   *
   * Returns:
   *
   * - 204 No Content on successful deletion (idempotent)
   */
  delete(sessionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/sessions/${sessionID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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

  tasks?: Array<TasksAPI.TaskItemView> | null;
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
  }
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

  pageNumber?: number;

  pageSize?: number;
}

Sessions.PublicShare = PublicShare;

export declare namespace Sessions {
  export {
    type SessionStatus as SessionStatus,
    type SessionView as SessionView,
    type SessionListResponse as SessionListResponse,
    type SessionUpdateParams as SessionUpdateParams,
    type SessionListParams as SessionListParams,
  };

  export { PublicShare as PublicShare, type ShareView as ShareView };
}
