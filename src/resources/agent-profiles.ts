// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentProfiles extends APIResource {
  /**
   * Create a new agent profile for the authenticated user.
   *
   * Agent profiles define how your AI agents behave during tasks. You can create
   * multiple profiles for different use cases (e.g., customer support, data
   * analysis, web scraping). Free users can create 1 profile; paid users can create
   * unlimited profiles.
   *
   * Key features you can configure:
   *
   * - System prompt: The core instructions that define the agent's personality and
   *   behavior
   * - Allowed domains: Restrict which websites the agent can access
   * - Max steps: Limit how many actions the agent can take in a single task
   * - Vision: Enable/disable the agent's ability to see and analyze screenshots
   * - Thinking: Enable/disable the agent's reasoning process
   *
   * Args:
   *
   * - request: The agent profile configuration including name, description, and
   *   behavior settings
   *
   * Returns:
   *
   * - The newly created agent profile with all its details
   *
   * Raises:
   *
   * - 402: If user needs a subscription to create additional profiles
   */
  create(body: AgentProfileCreateParams, options?: RequestOptions): APIPromise<AgentProfileView> {
    return this._client.post('/agent-profiles', { body, ...options });
  }

  /**
   * Get a specific agent profile by its ID.
   *
   * Retrieves the complete details of an agent profile, including all its
   * configuration settings like system prompts, allowed domains, and behavior flags.
   *
   * Args:
   *
   * - profile_id: The unique identifier of the agent profile
   *
   * Returns:
   *
   * - Complete agent profile information
   *
   * Raises:
   *
   * - 404: If the user agent profile doesn't exist
   */
  retrieve(profileID: string, options?: RequestOptions): APIPromise<AgentProfileView> {
    return this._client.get(path`/agent-profiles/${profileID}`, options);
  }

  /**
   * Update an existing agent profile.
   *
   * Modify any aspect of an agent profile, such as its name, description, system
   * prompt, or behavior settings. Only the fields you provide will be updated; other
   * fields remain unchanged.
   *
   * Args:
   *
   * - profile_id: The unique identifier of the agent profile to update
   * - request: The fields to update (only provided fields will be changed)
   *
   * Returns:
   *
   * - The updated agent profile with all its current details
   *
   * Raises:
   *
   * - 404: If the user agent profile doesn't exist
   */
  update(
    profileID: string,
    body: AgentProfileUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AgentProfileView> {
    return this._client.patch(path`/agent-profiles/${profileID}`, { body, ...options });
  }

  /**
   * Get a paginated list of all agent profiles for the authenticated user.
   *
   * Agent profiles define how your AI agents behave, including their personality,
   * capabilities, and limitations. Use this endpoint to see all your configured
   * agent profiles.
   *
   * Returns:
   *
   * - A paginated list of agent profiles
   * - Total count of profiles
   * - Page information for navigation
   */
  list(
    query: AgentProfileListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentProfileListResponse> {
    return this._client.get('/agent-profiles', { query, ...options });
  }

  /**
   * Delete an agent profile.
   *
   * Permanently removes an agent profile and all its configuration. This action
   * cannot be undone. Any tasks that were using this profile will continue to work,
   * but you won't be able to create new tasks with the deleted profile.
   *
   * Args:
   *
   * - profile_id: The unique identifier of the agent profile to delete
   *
   * Returns:
   *
   * - 204 No Content on successful deletion (idempotent)
   */
  delete(profileID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/agent-profiles/${profileID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
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
 * Whether vision capabilities are enabled custom_system_prompt_extension: Optional
 * custom system prompt for the agent created_at: Timestamp when the profile was
 * created updated_at: Timestamp when the profile was last updated
 */
export interface AgentProfileView {
  id: string;

  allowedDomains: Array<string>;

  createdAt: string;

  customSystemPromptExtension: string;

  description: string;

  flashMode: boolean;

  highlightElements: boolean;

  maxAgentSteps: number;

  name: string;

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

export interface AgentProfileCreateParams {
  name: string;

  allowedDomains?: Array<string>;

  customSystemPromptExtension?: string;

  description?: string;

  flashMode?: boolean;

  highlightElements?: boolean;

  maxAgentSteps?: number;

  thinking?: boolean;

  vision?: boolean;
}

export interface AgentProfileUpdateParams {
  allowedDomains?: Array<string> | null;

  customSystemPromptExtension?: string | null;

  description?: string | null;

  flashMode?: boolean | null;

  highlightElements?: boolean | null;

  maxAgentSteps?: number | null;

  name?: string | null;

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
    type AgentProfileCreateParams as AgentProfileCreateParams,
    type AgentProfileUpdateParams as AgentProfileUpdateParams,
    type AgentProfileListParams as AgentProfileListParams,
  };
}
