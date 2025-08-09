// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as TasksAPI from '../tasks';
import * as PublicShareAPI from './public-share';
import { PublicShare, PublicShareDeleteResponse, ShareView } from './public-share';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Sessions extends APIResource {
  publicShare: PublicShareAPI.PublicShare = new PublicShareAPI.PublicShare(this._client);

  /**
   * Get Session
   */
  retrieve(
    sessionID: string,
    query: SessionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionView> {
    return this._client.get(path`/sessions/${sessionID}`, { query, ...options });
  }

  /**
   * Update Session
   */
  update(sessionID: string, body: SessionUpdateParams, options?: RequestOptions): APIPromise<SessionView> {
    return this._client.patch(path`/sessions/${sessionID}`, { body, ...options });
  }

  /**
   * List Sessions
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
 * Attributes: ACTIVE: Session is currently active and running (aka browser is
 * running) STOPPED: Session has been stopped and is no longer active (aka browser
 * is stopped)
 */
export type SessionStatus = 'active' | 'stopped';

/**
 * View model for representing a (browser) session with its associated tasks.
 *
 * Attributes: id: Unique identifier for the session. status: Current status of the
 * session (active/stopped). live_url: URL where the browser can be viewed live in
 * real-time. record_url: URL to access the recorded session playback. started_at:
 * Timestamp when the session was created and started. finished_at: Timestamp when
 * the session was stopped (None if still active). tasks: List of tasks associated
 * with this session (optional). public_share_url: URL to access the public share
 * of the session (optional).
 */
export interface SessionView {
  id: string;

  startedAt: string;

  /**
   * Enumeration of possible (browser) session states
   *
   * Attributes: ACTIVE: Session is currently active and running (aka browser is
   * running) STOPPED: Session has been stopped and is no longer active (aka browser
   * is stopped)
   */
  status: SessionStatus;

  finishedAt?: string | null;

  liveUrl?: string | null;

  publicShareUrl?: string | null;

  recordUrl?: string | null;

  tasks?: Array<TasksAPI.TaskView> | null;
}

/**
 * Response model for paginated session list requests
 *
 * Attributes: items: List of session views for the current page
 */
export interface SessionListResponse {
  items: Array<SessionView>;

  pageNumber: number;

  pageSize: number;

  totalItems: number;
}

export interface SessionRetrieveParams {
  includeTasks?: boolean;
}

export interface SessionUpdateParams {
  /**
   * Available actions that can be performed on a session
   *
   * Attributes: STOP: Stop the session and all its associated tasks
   */
  action: 'stop';
}

export interface SessionListParams {
  /**
   * Enumeration of possible (browser) session states
   *
   * Attributes: ACTIVE: Session is currently active and running (aka browser is
   * running) STOPPED: Session has been stopped and is no longer active (aka browser
   * is stopped)
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

  export {
    PublicShare as PublicShare,
    type ShareView as ShareView,
    type PublicShareDeleteResponse as PublicShareDeleteResponse,
  };
}
