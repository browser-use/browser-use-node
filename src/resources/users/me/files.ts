// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';

export class Files extends APIResource {
  /**
   * Get a presigned URL for uploading files that AI agents can use during tasks.
   *
   * This endpoint generates a secure, time-limited upload URL that allows you to
   * upload files directly to our storage system. These files can then be referenced
   * in AI agent tasks for the agent to work with.
   *
   * Supported use cases:
   *
   * - Uploading documents for data extraction tasks
   * - Providing reference materials for agents
   * - Sharing files that agents need to process
   * - Including images or PDFs for analysis
   *
   * The upload URL expires after 2 minutes for security. Files are automatically
   * organized by user ID and can be referenced in task creation using the returned
   * file name.
   *
   * Args:
   *
   * - request: File upload details including name, content type, and size
   *
   * Returns:
   *
   * - Presigned upload URL and form fields for direct file upload
   *
   * Raises:
   *
   * - 400: If the content type is unsupported
   * - 500: If the upload URL generation fails (should not happen)
   */
  createPresignedURL(
    body: FileCreatePresignedURLParams,
    options?: RequestOptions,
  ): APIPromise<FileCreatePresignedURLResponse> {
    return this._client.post('/users/me/files/presigned-url', { body, ...options });
  }
}

/**
 * Response model for a presigned upload URL
 *
 * Attributes: url: The URL to upload the file to method: The HTTP method to use
 * for the upload fields: The form fields to include in the upload request
 * file_name: The name of the file to upload (should be referenced when user wants
 * to use the file in a task) expires_in: The number of seconds until the presigned
 * URL expires
 */
export interface FileCreatePresignedURLResponse {
  expiresIn: number;

  fields: { [key: string]: string };

  fileName: string;

  method: 'POST';

  url: string;
}

export interface FileCreatePresignedURLParams {
  contentType:
    | 'image/jpg'
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/webp'
    | 'image/svg+xml'
    | 'application/pdf'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'text/plain'
    | 'text/csv'
    | 'text/markdown';

  fileName: string;

  sizeBytes: number;
}

export declare namespace Files {
  export {
    type FileCreatePresignedURLResponse as FileCreatePresignedURLResponse,
    type FileCreatePresignedURLParams as FileCreatePresignedURLParams,
  };
}
