<img src="https://raw.githubusercontent.com/browser-use/browser-use-node/refs/heads/main/assets/cloud-banner-js.png" alt="Browser Use JS" width="full"/>

# BrowserUse TypeScript Library

[![fern shield](https://img.shields.io/badge/%F0%9F%8C%BF-Built%20with%20Fern-brightgreen)](https://buildwithfern.com?utm_source=github&utm_medium=github&utm_campaign=readme&utm_source=https%3A%2F%2Fgithub.com%2Fbrowser-use%2Fbrowser-use-node)
[![npm shield](https://img.shields.io/npm/v/browser-use-sdk)](https://www.npmjs.com/package/browser-use-sdk)

The BrowserUse TypeScript library provides convenient access to the BrowserUse APIs from TypeScript.

## Three-Step QuickStart

1.  📦 Install BrowserUse SDK.

    ```sh
    # NPM
    npm i -s browser-use-sdk

    # Yarn
    yarn add browser-use-sdk

    # PNPM
    pnpm add browser-use-sdk
    ```

1.  🔑 Get your API Key at [Browser Use Cloud](https://cloud.browser-use.com)!

1.  🦄 Automate the Internet!

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

---

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

> You can use the `stream` method to get the latest step taken on every change.

```ts
const task = await browseruse.tasks.createTask({
    task: "Search for the top 10 Hacker News posts and return the title and url.",
    schema: TaskOutput,
});

for await (const step of task.stream()) {
    console.log(step);
}

const result = await task.complete();

for (const post of result.parsed.posts) {
    console.log(`${post.title} - ${post.url}`);
}
```

### Watching Agent Updates

> You can use the `watch` method to get the latest update on every change.

```ts
const task = await browseruse.tasks.createTask({
    task: "Search for the top 10 Hacker News posts and return the title and url.",
    schema: TaskOutput,
});

for await (const update of task.watch()) {
    console.log(update);

    if (update.data.status === "finished") {
        for (const post of update.data.parsed.posts) {
            console.log(`${post.title} - ${post.url}`);
        }
    }
}
```

## Webhook Verification

> We encourage you to use the SDK functions that verify and parse webhook events.

```ts
import { verifyWebhookEventSignature, type WebhookAgentTaskStatusUpdatePayload } from "browser-use-sdk";

export async function POST(req: Request) {
    const signature = req.headers["x-browser-use-signature"] as string;
    const timestamp = req.headers["x-browser-use-timestamp"] as string;

    const event = await verifyWebhookEventSignature(
        {
            body,
            signature,
            timestamp,
        },
        {
            secret: SECRET_KEY,
        },
    );

    if (!event.ok) {
        return;
    }

    switch (event.event.type) {
        case "agent.task.status_update":
            break;
        case "test":
            break;
        default:
            break;
    }
}
```

## Contributing

While we value open-source contributions to this SDK, this library is generated programmatically.
Additions made directly to this library would have to be moved over to our generation code,
otherwise they would be overwritten upon the next generated release. Feel free to open a PR as
a proof of concept, but know that we will not be able to merge it as-is. We suggest opening
an issue first to discuss with us!

On the other hand, contributions to the README are always very welcome!

## Installation

```sh
npm i -s browser-use-sdk
```

## Reference

A full reference for this library is available [here](https://github.com/browser-use/browser-use-node/blob/HEAD/./reference.md).

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
import { BrowserUseClient } from "browser-use-sdk";

const client = new BrowserUseClient({
    ...
    fetcher: // provide your implementation here
});
```
