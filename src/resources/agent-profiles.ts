// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentProfiles extends APIResource {
  /**
   * Create Agent Profile
   */
  create(body: AgentProfileCreateParams, options?: RequestOptions): APIPromise<AgentProfileView> {
    return this._client.post('/agent-profiles', { body, ...options });
  }

  /**
   * Get Agent Profile
   */
  retrieve(profileID: string, options?: RequestOptions): APIPromise<AgentProfileView> {
    return this._client.get(path`/agent-profiles/${profileID}`, options);
  }

  /**
   * Update Agent Profile
   */
  update(
    profileID: string,
    body: AgentProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AgentProfileView> {
    return this._client.patch(path`/agent-profiles/${profileID}`, { body, ...options });
  }

  /**
   * List Agent Profiles
   */
  list(
    query: AgentProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentProfileListResponse> {
    return this._client.get('/agent-profiles', { query, ...options });
  }

  /**
   * Delete Agent Profile
   */
  delete(profileID: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(path`/agent-profiles/${profileID}`, options);
  }
}

/**
 * View model for representing an agent profile
 *
 * Attributes: id: Unique identifier for the profile name: Display name for the
 * profile description: Optional description of the profile highlight_elements:
 * Whether to highlight elements during agent interaction with the browser
 * max_agent_steps: Maximum number of steps the agent can take before stopping
 * allowed_domains: List of domains the agent is allowed to access flash_mode:
 * Whether flash mode is enabled thinking: Whether thinking mode is enabled vision:
 * Whether vision capabilities are enabled system_prompt: Custom system prompt for
 * the agent (optionally set by the user) created_at: Timestamp when the profile
 * was created updated_at: Timestamp when the profile was last updated
 */
export interface AgentProfileView {
  id: string;

  allowedDomains: Array<string>;

  createdAt: string;

  description: string;

  flashMode: boolean;

  highlightElements: boolean;

  maxAgentSteps: number;

  name: string;

  systemPrompt: string;

  thinking: boolean;

  updatedAt: string;

  vision: boolean;
}

/**
 * Response model for paginated agent profile list requests
 *
 * Attributes: items: List of agent profile views for the current page
 */
export interface AgentProfileListResponse {
  items: Array<AgentProfileView>;

  pageNumber: number;

  pageSize: number;

  totalItems: number;
}

export type AgentProfileDeleteResponse = unknown;

export interface AgentProfileCreateParams {
  name: string;

  allowedDomains?: Array<string>;

  description?: string;

  flashMode?: boolean;

  highlightElements?: boolean;

  maxAgentSteps?: number;

  systemPrompt?: string;

  thinking?: boolean;

  vision?: boolean;
}

export interface AgentProfileUpdateParams {
  allowedDomains?: Array<string> | null;

  description?: string | null;

  flashMode?: boolean | null;

  highlightElements?: boolean | null;

  maxAgentSteps?: number | null;

  name?: string | null;

  systemPrompt?: string | null;

  thinking?: boolean | null;

  vision?: boolean | null;
}

export interface AgentProfileListParams {
  pageNumber?: number;

  pageSize?: number;
}

export declare namespace AgentProfiles {
  export {
    type AgentProfileView as AgentProfileView,
    type AgentProfileListResponse as AgentProfileListResponse,
    type AgentProfileDeleteResponse as AgentProfileDeleteResponse,
    type AgentProfileCreateParams as AgentProfileCreateParams,
    type AgentProfileUpdateParams as AgentProfileUpdateParams,
    type AgentProfileListParams as AgentProfileListParams,
  };
}
