// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as FilesAPI from './files';
import { FileCreatePresignedURLParams, FileCreatePresignedURLResponse, Files } from './files';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Me extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);

  /**
   * Get information about the currently authenticated user.
   *
   * Retrieves your user profile information including:
   *
   * - Credit balances (monthly and additional credits in USD)
   * - Account details (email, name, signup date)
   *
   * This endpoint is useful for:
   *
   * - Checking your remaining credits before running tasks
   * - Displaying user information in your application
   *
   * Returns:
   *
   * - Complete user profile information including credits and account details
   *
   * Raises:
   *
   * - 404: If the user profile cannot be found
   */
  retrieve(options?: RequestOptions): APIPromise<MeRetrieveResponse> {
    return this._client.get('/users/me', options);
  }
}

/**
 * View model for user information
 *
 * Attributes: monthly_credits_balance_usd: The monthly credits balance in USD
 * additional_credits_balance_usd: The additional credits balance in USD email: The
 * email address of the user name: The name of the user signed_up_at: The date and
 * time the user signed up
 */
export interface MeRetrieveResponse {
  additionalCreditsBalanceUsd: number;

  monthlyCreditsBalanceUsd: number;

  signedUpAt: string;

  email?: string | null;

  name?: string | null;
}

Me.Files = Files;

export declare namespace Me {
  export { type MeRetrieveResponse as MeRetrieveResponse };

  export {
    Files as Files,
    type FileCreatePresignedURLResponse as FileCreatePresignedURLResponse,
    type FileCreatePresignedURLParams as FileCreatePresignedURLParams,
  };
}
