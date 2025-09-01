# BrowserUse TypeScript Library

[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fbrowser-use%2Fbrowser-use-node)
[![npm shield](https://img.shields.io/npm/v/)](https://www.npmjs.com/package/)

The BrowserUse TypeScript library provides convenient access to the BrowserUse APIs from TypeScript.

## Two-Step QuickStart

1. ☝️ Get your API Key at [Browser Use Cloud](https://cloud.browser-use.com)...

1. ✌️ Automate the web!

```ts
import { BrowserUseClient } from "browser-use-sdk";

const client = new BrowserUseClient({
    apiKey: "bu_...",
});

const task = await client.tasks.createTask({
    task: "Search for the top 10 Hacker News posts and return the title and url.",
});

const result = await task.complete();

console.log(result.output);
```

> The full API of this library can be found in [api.md](api.md).

### Structured Output with Zod

```ts
import z from "zod";

const TaskOutput = z.object({
    posts: z.array(
        z.object({
            title: z.string(),
            url: z.string(),
        }),
    ),
});

const task = await client.tasks.createTask({
    task: "Search for the top 10 Hacker News posts and return the title and url.",
    schema: TaskOutput,
});

const result = await task.complete();

for (const post of result.parsed.posts) {
    console.log(`${post.title} - ${post.url}`);
}
```

### Streaming Agent Updates

```ts
const task = await browseruse.tasks.createTask({
    task: "Search for the top 10 Hacker News posts and return the title and url.",
    schema: TaskOutput,
});

for await (const msg of task.stream()) {
    switch (msg.status) {
        case "started":
        case "paused":
        case "stopped":
            console.log(`running: ${msg}`);
            break;

        case "finished":
            console.log(`done:`);

            for (const post of msg.parsed.posts) {
                console.log(`${post.title} - ${post.url}`);
            }
            break;
    }
}
```

## Advanced Usage

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
const task = await client.tasks
  .create({ task: 'Search for the top 10 Hacker News posts and return the title and url.' })
  .catch(async (err) => {
    if (err instanceof BrowserUse.APIError) {
      console.log(err.status); // 400
      console.log(err.name); // BadRequestError
      console.log(err.headers); // {server: 'nginx', ...}
    } else {
      throw err;
    }
  });
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new BrowserUse({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.tasks.create({ task: 'Search for the top 10 Hacker News posts and return the title and url.' }, {
  maxRetries: 5,
});
```

### Timeouts

Requests time out after 1 minute by default. You can configure this with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new BrowserUse({
  timeout: 20 * 1000, // 20 seconds (default is 1 minute)
});

// Override per-request:
await client.tasks.create({ task: 'Search for the top 10 Hacker News posts and return the title and url.' }, {
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.
This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
Unlike `.asResponse()` this method consumes the body, returning once it is parsed.

<!-- prettier-ignore -->
```ts
const client = new BrowserUse();

const response = await client.tasks
  .create({ task: 'Search for the top 10 Hacker News posts and return the title and url.' })
  .asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: task, response: raw } = await client.tasks
  .create({ task: 'Search for the top 10 Hacker News posts and return the title and url.' })
  .withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(task.id);
```

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages
> may change between releases.

#### Log levels

The log level can be configured in two ways:

1. Via the `BROWSER_USE_LOG` environment variable
2. Using the `logLevel` client option (overrides the environment variable if set)

```ts
import BrowserUse from "browser-use-sdk";

const client = new BrowserUse({
    logLevel: "debug", // Show all log messages
});
```

Available log levels, from most to least verbose:

- `'debug'` - Show debug messages, info, warnings, and errors
- `'info'` - Show info messages, warnings, and errors
- `'warn'` - Show warnings and errors (default)
- `'error'` - Show only errors
- `'off'` - Disable all logging

At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
Some authentication-related headers are redacted, but sensitive data in request and response bodies
may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger.
Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.

When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
below the configured level will not be sent to your logger.

```ts
import BrowserUse from "browser-use-sdk";
import pino from "pino";

const logger = pino();

const client = new BrowserUse({
    logger: logger.child({ name: "BrowserUse" }),
    logLevel: "debug", // Send all messages to pino, allowing it to filter
});
```

### Customizing the fetch client

By default, this library expects a global `fetch` function is defined.

If you want to use a different `fetch` function, you can either polyfill the global:

```ts
import fetch from "my-fetch";

globalThis.fetch = fetch;
```

Or pass it to the client:

```ts
import BrowserUse from "browser-use-sdk";
import fetch from "my-fetch";

const client = new BrowserUse({ fetch });
```

### Fetch options

If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)

```ts
import BrowserUse from "browser-use-sdk";

const client = new BrowserUse({
    fetchOptions: {
        // `RequestInit` options
    },
});
```

#### Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
options to requests:

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>

```ts
import BrowserUse from "browser-use-sdk";
import * as undici from "undici";

const proxyAgent = new undici.ProxyAgent("http://localhost:8888");
const client = new BrowserUse({
    fetchOptions: {
        dispatcher: proxyAgent,
    },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>

```ts
import BrowserUse from "browser-use-sdk";

const client = new BrowserUse({
    fetchOptions: {
        proxy: "http://localhost:8888",
    },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>

```ts
import BrowserUse from "npm:browser-use-sdk";

const httpClient = Deno.createHttpClient({ proxy: { url: "http://localhost:8888" } });
const client = new BrowserUse({
    fetchOptions: {
        client: httpClient,
    },
});
```

## Frequently Asked Questions

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically.
Additions made directly to this library would have to be moved over to our generation code,
otherwise they would be overwritten upon the next generated release. Feel free to open a PR as
a proof of concept, but know that we will not be able to merge it as-is. We suggest opening
an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!

## Installation

```sh
npm i -s
```

## Reference

A full reference for this library is available [here](https://github.com/browser-use/browser-use-node/blob/HEAD/./reference.md).

## Usage

Instantiate and use the client with the following:

```typescript
import { BrowserUseEnvironment, BrowserUseClient } from "";

const client = new BrowserUseClient({ environment: BrowserUseEnvironment.Production, apiKey: "YOUR_API_KEY" });
await client.tasks.createTask({
    task: "task",
});
```

## Request And Response Types

The SDK exports all request and response types as TypeScript interfaces. Simply import them with the
following namespace:

```typescript
import { BrowserUse } from "BrowserUse";

const request: BrowserUse.ListTasksTasksGetRequest = {
    ...
};
```

## Exception Handling

When the API returns a non-success status code (4xx or 5xx response), a subclass of the following error
will be thrown.

```typescript
import { BrowserUseError } from "BrowserUse";

try {
    await client.tasks.createTask(...);
} catch (err) {
    if (err instanceof BrowserUseError) {
        console.log(err.statusCode);
        console.log(err.message);
        console.log(err.body);
        console.log(err.rawResponse);
    }
}
```

## Advanced

### Additional Headers

If you would like to send additional headers as part of the request, use the `headers` request option.

```typescript
const response = await client.tasks.createTask(..., {
    headers: {
        'X-Custom-Header': 'custom value'
    }
});
```

### Additional Query String Parameters

If you would like to send additional query string parameters as part of the request, use the `queryParams` request option.

```typescript
const response = await client.tasks.createTask(..., {
    queryParams: {
        'customQueryParamKey': 'custom query param value'
    }
});
```

### Retries

The SDK is instrumented with automatic retries with exponential backoff. A request will be retried as long
as the request is deemed retryable and the number of retry attempts has not grown larger than the configured
retry limit (default: 2).

A request is deemed retryable when any of the following HTTP status codes is returned:

- [408](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408) (Timeout)
- [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) (Too Many Requests)
- [5XX](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) (Internal Server Errors)

Use the `maxRetries` request option to configure this behavior.

```typescript
const response = await client.tasks.createTask(..., {
    maxRetries: 0 // override maxRetries at the request level
});
```

### Timeouts

The SDK defaults to a 60 second timeout. Use the `timeoutInSeconds` option to configure this behavior.

```typescript
const response = await client.tasks.createTask(..., {
    timeoutInSeconds: 30 // override timeout to 30s
});
```

### Aborting Requests

The SDK allows users to abort requests at any point by passing in an abort signal.

```typescript
const controller = new AbortController();
const response = await client.tasks.createTask(..., {
    abortSignal: controller.signal
});
controller.abort(); // aborts the request
```

### Access Raw Response Data

The SDK provides access to raw response data, including headers, through the `.withRawResponse()` method.
The `.withRawResponse()` method returns a promise that results to an object with a `data` and a `rawResponse` property.

```typescript
const { data, rawResponse } = await client.tasks.createTask(...).withRawResponse();

console.log(data);
console.log(rawResponse.headers['X-My-Header']);
```

### Runtime Compatibility

The SDK works in the following runtimes:

- Node.js 18+
- Vercel
- Cloudflare Workers
- Deno v1.25+
- Bun 1.0+
- React Native

### Customizing Fetch Client

The SDK provides a way for you to customize the underlying HTTP client / Fetch function. If you're running in an
unsupported environment, this provides a way for you to break glass and ensure the SDK works.

```typescript
import { BrowserUseClient } from "BrowserUse";

const client = new BrowserUseClient({
    ...
    fetcher: // provide your implementation here
});
```
