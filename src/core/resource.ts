// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { BrowserUse } from '../client';

export abstract class APIResource {
  protected _client: BrowserUse;

  constructor(client: BrowserUse) {
    this._client = client;
  }
}
