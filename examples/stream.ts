#!/usr/bin/env -S npm run tsn -T

import z from "zod";

import { BrowserUseClient } from "..";

import { env } from "./utils";

env();

const browseruse = new BrowserUseClient({
    apiKey: process.env.BROWSER_USE_API_KEY!,
    environment: "https://api.browser-use.com/api/v2",
});

// Basic ---------------------------------------------------------------------

async function basic() {
    console.log("Basic: Creating task and starting stream...");

    const task = await browseruse.tasks.createTask({
        task: "What's the weather in SF and what's the temperature?",
        agent: { llm: "gemini-2.5-flash" },
    });

    for await (const msg of task.stream()) {
        console.log(msg);
    }

    const result = await task.complete();

    console.log("Basic: Stream completed");
    console.log(result.output);
}

// Structured ----------------------------------------------------------------

// Define Structured Output Schema
const HackerNewsResponse = z.object({
    title: z.string(),
    url: z.string(),
    score: z.number(),
});

const TaskOutput = z.object({
    posts: z.array(HackerNewsResponse),
});

async function structured() {
    console.log("Structured: Creating task and starting stream...");

    const task = await browseruse.tasks.createTask({
        task: "Extract top 10 Hacker News posts and return the title, url, and score",
        schema: TaskOutput,
        agent: { llm: "gpt-4.1" },
    });

    for await (const msg of task.stream()) {
        console.log(msg);
    }

    const result = await task.complete();

    console.log("Structured: Stream completed");

    for (const post of result.parsed!.posts) {
        console.log(` - ${post.title} (${post.score}) ${post.url}`);
    }
}

basic()
    .then(() => structured())
    .catch(console.error);
