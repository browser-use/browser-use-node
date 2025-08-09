// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class BrowserProfiles extends APIResource {
  /**
   * Create Browser Profile
   */
  create(body: BrowserProfileCreateParams, options?: RequestOptions): APIPromise<BrowserProfileView> {
    return this._client.post('/browser-profiles', { body, ...options });
  }

  /**
   * Get Browser Profile
   */
  retrieve(profileID: string, options?: RequestOptions): APIPromise<BrowserProfileView> {
    return this._client.get(path`/browser-profiles/${profileID}`, options);
  }

  /**
   * Update Browser Profile
   */
  update(
    profileID: string,
    body: BrowserProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<BrowserProfileView> {
    return this._client.patch(path`/browser-profiles/${profileID}`, { body, ...options });
  }

  /**
   * List Browser Profiles
   */
  list(
    query: BrowserProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BrowserProfileListResponse> {
    return this._client.get('/browser-profiles', { query, ...options });
  }

  /**
   * Delete Browser Profile
   */
  delete(profileID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/browser-profiles/${profileID}`, options);
  }
}

/**
 * View model for representing a browser profile
 *
 * Attributes: id: Unique identifier for the profile name: Display name for the
 * profile description: Optional description of the profile persist: Whether
 * browser state should persist between sessions ad_blocker: Whether ad blocking is
 * enabled proxy: Whether proxy is enabled proxy_country_code: Country code for
 * proxy location store_cache: Whether to store browser cache
 * browser_viewport_width: Browser viewport width in pixels
 * browser_viewport_height: Browser viewport height in pixels is_mobile: Whether
 * the browser is mobile view created_at: Timestamp when the profile was created
 * updated_at: Timestamp when the profile was last updated
 */
export interface BrowserProfileView {
  id: string;

  adBlocker: boolean;

  browserViewportHeight: number;

  browserViewportWidth: number;

  createdAt: string;

  description: string;

  isMobile: boolean;

  name: string;

  persist: boolean;

  proxy: boolean;

  proxyCountryCode: ProxyCountryCode;

  storeCache: boolean;

  updatedAt: string;
}

export type ProxyCountryCode = 'us' | 'uk' | 'fr' | 'it' | 'jp' | 'au' | 'de' | 'fi' | 'ca' | 'in';

/**
 * Response model for paginated browser profile list requests
 *
 * Attributes: items: List of browser profile views for the current page
 */
export interface BrowserProfileListResponse {
  items: Array<BrowserProfileView>;

  pageNumber: number;

  pageSize: number;

  totalItems: number;
}

export type BrowserProfileDeleteResponse = unknown;

export interface BrowserProfileCreateParams {
  name: string;

  adBlocker?: boolean;

  browserViewportHeight?: number;

  browserViewportWidth?: number;

  description?: string;

  isMobile?: boolean;

  persist?: boolean;

  proxy?: boolean;

  proxyCountryCode?: ProxyCountryCode;

  storeCache?: boolean;
}

export interface BrowserProfileUpdateParams {
  adBlocker?: boolean | null;

  browserViewportHeight?: number | null;

  browserViewportWidth?: number | null;

  description?: string | null;

  isMobile?: boolean | null;

  name?: string | null;

  persist?: boolean | null;

  proxy?: boolean | null;

  proxyCountryCode?: ProxyCountryCode | null;

  storeCache?: boolean | null;
}

export interface BrowserProfileListParams {
  pageNumber?: number;

  pageSize?: number;
}

export declare namespace BrowserProfiles {
  export {
    type BrowserProfileView as BrowserProfileView,
    type ProxyCountryCode as ProxyCountryCode,
    type BrowserProfileListResponse as BrowserProfileListResponse,
    type BrowserProfileDeleteResponse as BrowserProfileDeleteResponse,
    type BrowserProfileCreateParams as BrowserProfileCreateParams,
    type BrowserProfileUpdateParams as BrowserProfileUpdateParams,
    type BrowserProfileListParams as BrowserProfileListParams,
  };
}
