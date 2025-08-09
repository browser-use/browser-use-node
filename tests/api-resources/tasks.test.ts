// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BrowserUse from 'browser-use-sdk';

const client = new BrowserUse({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tasks', () => {
  // skipped: tests are disabled for the time being
  test.skip('create: only required params', async () => {
    const responsePromise = client.tasks.create({ task: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('create: required and optional params', async () => {
    const response = await client.tasks.create({
      task: 'x',
      agentSettings: { llm: 'gpt-4o', profileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
      browserSettings: {
        profileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        saveBrowserData: true,
        sessionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
      includedFileNames: ['string'],
      metadata: { foo: 'string' },
      secrets: { foo: 'string' },
      structuredOutputJson: 'structuredOutputJson',
    });
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve', async () => {
    const responsePromise = client.tasks.retrieve('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tasks.retrieve(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        { statusOnly: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BrowserUse.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('update: only required params', async () => {
    const responsePromise = client.tasks.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { action: 'stop' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('update: required and optional params', async () => {
    const response = await client.tasks.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { action: 'stop' });
  });

  // skipped: tests are disabled for the time being
  test.skip('list', async () => {
    const responsePromise = client.tasks.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tasks.list(
        {
          includeOutputFiles: true,
          includeSteps: true,
          includeUserUploadedFiles: true,
          pageNumber: 1,
          pageSize: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BrowserUse.NotFoundError);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveLogs', async () => {
    const responsePromise = client.tasks.retrieveLogs('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveOutputFile: only required params', async () => {
    const responsePromise = client.tasks.retrieveOutputFile('file_name', {
      task_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('retrieveOutputFile: required and optional params', async () => {
    const response = await client.tasks.retrieveOutputFile('file_name', {
      task_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
