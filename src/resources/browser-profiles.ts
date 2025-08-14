// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class BrowserProfiles extends APIResource {
  /**
   * Create a new browser profile for the authenticated user.
   *
   * Browser profiles define how your web browsers behave during AI agent tasks. You
   * can create multiple profiles for different use cases (e.g., mobile testing,
   * desktop browsing, proxy-enabled scraping). Free users can create up to 10
   * profiles; paid users can create unlimited profiles.
   *
   * Key features you can configure:
   *
   * - Viewport dimensions: Set the browser window size for consistent rendering
   * - Mobile emulation: Enable mobile device simulation
   * - Proxy settings: Route traffic through specific locations or proxy servers
   * - Ad blocking: Enable/disable ad blocking for cleaner browsing
   * - Cache persistence: Choose whether to save browser data between sessions
   *
   * Args:
   *
   * - request: The browser profile configuration including name, description, and
   *   browser settings
   *
   * Returns:
   *
   * - The newly created browser profile with all its details
   *
   * Raises:
   *
   * - 402: If user needs a subscription to create additional profiles
   */
  create(body: BrowserProfileCreateParams, options?: RequestOptions): APIPromise<BrowserProfileView> {
    return this._client.post('/browser-profiles', { body, ...options });
  }

  /**
   * Get a specific browser profile by its ID.
   *
   * Retrieves the complete details of a browser profile, including all its
   * configuration settings like viewport dimensions, proxy settings, and behavior
   * flags.
   *
   * Args:
   *
   * - profile_id: The unique identifier of the browser profile
   *
   * Returns:
   *
   * - Complete browser profile information
   *
   * Raises:
   *
   * - 404: If the user browser profile doesn't exist
   */
  retrieve(profileID: string, options?: RequestOptions): APIPromise<BrowserProfileView> {
    return this._client.get(path`/browser-profiles/${profileID}`, options);
  }

  /**
   * Update an existing browser profile.
   *
   * Modify any aspect of a browser profile, such as its name, description, viewport
   * settings, or proxy configuration. Only the fields you provide will be updated;
   * other fields remain unchanged.
   *
   * Args:
   *
   * - profile_id: The unique identifier of the browser profile to update
   * - request: The fields to update (only provided fields will be changed)
   *
   * Returns:
   *
   * - The updated browser profile with all its current details
   *
   * Raises:
   *
   * - 404: If the user browser profile doesn't exist
   */
  update(
    profileID: string,
    body: BrowserProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<BrowserProfileView> {
    return this._client.patch(path`/browser-profiles/${profileID}`, { body, ...options });
  }

  /**
   * Get a paginated list of all browser profiles for the authenticated user.
   *
   * Browser profiles define how your web browsers behave during AI agent tasks,
   * including settings like viewport size, mobile emulation, proxy configuration,
   * and ad blocking. Use this endpoint to see all your configured browser profiles.
   *
   * Returns:
   *
   * - A paginated list of browser profiles
   * - Total count of profiles
   * - Page information for navigation
   */
  list(
    query: BrowserProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BrowserProfileListResponse> {
    return this._client.get('/browser-profiles', { query, ...options });
  }

  /**
   * Delete a browser profile.
   *
   * Permanently removes a browser profile and all its configuration. This action
   * cannot be undone. The profile will also be removed from the browser service. Any
   * active sessions using this profile will continue to work, but you won't be able
   * to create new sessions with the deleted profile.
   *
   * Args:
   *
   * - profile_id: The unique identifier of the browser profile to delete
   *
   * Returns:
   *
   * - 204 No Content on successful deletion (idempotent)
   */
  delete(profileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/browser-profiles/${profileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
 * the browser should be in mobile view created_at: Timestamp when the profile was
 * created updated_at: Timestamp when the profile was last updated
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
    type BrowserProfileCreateParams as BrowserProfileCreateParams,
    type BrowserProfileUpdateParams as BrowserProfileUpdateParams,
    type BrowserProfileListParams as BrowserProfileListParams,
  };
}
