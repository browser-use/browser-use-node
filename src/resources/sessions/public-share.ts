// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class PublicShare extends APIResource {
  /**
   * Create a public share for a session.
   *
   * Generates a public sharing link that allows anyone with the URL to view the
   * session and its tasks. If a public share already exists for the session, it will
   * return the existing share instead of creating a new one.
   *
   * Public shares are useful for:
   *
   * - Sharing results with clients or team members
   * - Demonstrating AI agent capabilities
   * - Collaborative review of automated tasks
   *
   * Args:
   *
   * - session_id: The unique identifier of the agent session to share
   *
   * Returns:
   *
   * - Public share information including the share URL and usage statistics
   *
   * Raises:
   *
   * - 404: If the user agent session doesn't exist
   */
  create(sessionID: string, options?: RequestOptions): APIPromise<ShareView> {
    return this._client.post(path`/sessions/${sessionID}/public-share`, options);
  }

  /**
   * Get information about the public share for a session.
   *
   * Retrieves details about the public sharing link for a session, including the
   * share token, public URL, view count, and last viewed timestamp. This is useful
   * for monitoring how your shared sessions are being accessed.
   *
   * Args:
   *
   * - session_id: The unique identifier of the agent session
   *
   * Returns:
   *
   * - Public share information including the share URL and usage statistics
   *
   * Raises:
   *
   * - 404: If the user agent session doesn't exist or doesn't have a public share
   */
  retrieve(sessionID: string, options?: RequestOptions): APIPromise<ShareView> {
    return this._client.get(path`/sessions/${sessionID}/public-share`, options);
  }

  /**
   * Remove the public share for a session.
   *
   * Deletes the public sharing link for a session, making it no longer accessible to
   * anyone with the previous share URL. This is useful for removing access to
   * sensitive sessions or when you no longer want to share the results.
   *
   * Args:
   *
   * - session_id: The unique identifier of the agent session
   *
   * Returns:
   *
   * - 204 No Content on successful deletion (idempotent)
   *
   * Raises:
   *
   * - 404: If the user agent session doesn't exist
   */
  delete(sessionID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/sessions/${sessionID}/public-share`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * View model for representing a public share of a session.
 *
 * Attributes: share_token: Token to access the public share. share_url: URL to
 * access the public share. view_count: Number of times the public share has been
 * viewed. last_viewed_at: Timestamp of the last time the public share was viewed
 * (None if never viewed).
 */
export interface ShareView {
  shareToken: string;

  shareUrl: string;

  viewCount: number;

  lastViewedAt?: string | null;
}

export declare namespace PublicShare {
  export { type ShareView as ShareView };
}
