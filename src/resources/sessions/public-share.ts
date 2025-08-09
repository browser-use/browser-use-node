// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class PublicShare extends APIResource {
  /**
   * Create Session Public Share
   */
  create(sessionID: string, options?: RequestOptions): APIPromise<ShareView> {
    return this._client.post(path`/sessions/${sessionID}/public-share`, options);
  }

  /**
   * Get Session Public Share
   */
  retrieve(sessionID: string, options?: RequestOptions): APIPromise<ShareView> {
    return this._client.get(path`/sessions/${sessionID}/public-share`, options);
  }

  /**
   * Delete Session Public Share
   */
  delete(sessionID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/sessions/${sessionID}/public-share`, options);
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

export type PublicShareDeleteResponse = unknown;

export declare namespace PublicShare {
  export { type ShareView as ShareView, type PublicShareDeleteResponse as PublicShareDeleteResponse };
}
