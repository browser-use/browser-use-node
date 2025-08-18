// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import BrowserUse from 'browser-use-sdk';

const client = new BrowserUse({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tasks', () => {
  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('create: required and optional params', async () => {
    const response = await client.tasks.create({
      task: 'x',
      agentSettings: {
        llm: 'gpt-4o',
        profileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        startUrl: 'startUrl',
      },
      browserSettings: {
        profileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        sessionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      },
      includedFileNames: ['string'],
      metadata: { foo: 'string' },
      secrets: { foo: 'string' },
      structuredOutputJson: 'structuredOutputJson',
    });
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('update: required and optional params', async () => {
    const response = await client.tasks.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', { action: 'stop' });
  });

  // Prism tests are disabled
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

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.tasks.list(
        {
          filterBy: 'started',
          pageNumber: 1,
          pageSize: 1,
          sessionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(BrowserUse.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('getLogs', async () => {
    const responsePromise = client.tasks.getLogs('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getOutputFile: only required params', async () => {
    const responsePromise = client.tasks.getOutputFile('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  // Prism tests are disabled
  test.skip('getOutputFile: required and optional params', async () => {
    const response = await client.tasks.getOutputFile('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      task_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  // Prism tests are disabled
  test.skip('getUserUploadedFile: only required params', async () => {
    const responsePromise = client.tasks.getUserUploadedFile('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
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

  // Prism tests are disabled
  test.skip('getUserUploadedFile: required and optional params', async () => {
    const response = await client.tasks.getUserUploadedFile('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      task_id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
