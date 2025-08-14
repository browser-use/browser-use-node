// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BrowserUse from 'browser-use-sdk';

const client = new BrowserUse({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource sessions', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.sessions.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sessions.retrieve(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { includeTasks: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BrowserUse.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.sessions.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      action: 'stop',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.sessions.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { action: 'stop' });
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.sessions.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.sessions.list(
        { filterBy: 'active', includeTasks: true, pageNumber: 1, pageSize: 1 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BrowserUse.NotFoundError);
  });
});
