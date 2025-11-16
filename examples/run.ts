#!/usr/bin/env -S npm run tsn -T

import { z } from "zod";

import { BrowserUseClient } from "..";
import { env } from "./utils";

env();

// gets API Key from environment variable BROWSER_USE_API_KEY
const browseruse = new BrowserUseClient({
    apiKey: process.env.BROWSER_USE_API_KEY!,
});

// Basic ---------------------------------------------------------------------

async function basic() {
    console.log(`Basic: Running Task...`);

    // Create Task
    const rsp = await browseruse.tasks.createTask({
        task: "What's the weather in SF and what's the temperature?",
    });


    for await (const msg of rsp.watch()) {
        console.log(msg);
    }

    const result = await rsp.complete();

    console.log(`Basic: ${result.output}`);

    console.log(`Basic: DONE`);
}

// Structured ----------------------------------------------------------------

const HackerNewsResponse = z.object({
    title: z.string(),
    url: z.string(),
});

const TaskOutput = z.object({
    posts: z.array(HackerNewsResponse),
});

async function structured() {
    console.log(`Structured: Running Task...`);

    // Create Task
    const rsp = await browseruse.tasks.createTask({
        task: "Search for the top 10 Hacker News posts and return the title and url!",
        schema: TaskOutput,
        llm: "gpt-4.1",
    });

    const result = await rsp.complete();

    const posts = result.parsed?.posts;

    if (posts == null) {
        throw new Error("Structured: No posts found");
    }

    console.log(`Structured: Top Hacker News posts:`);

    for (const post of posts) {
        console.log(` - ${post.title} - ${post.url}`);
    }

    console.log(`\nStructured: DONE`);
}

basic()
    .then(() => structured())
    .catch(console.error);
