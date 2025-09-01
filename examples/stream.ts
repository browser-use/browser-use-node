#!/usr/bin/env -S npm run tsn -T

import z from "zod";

import { BrowserUseClient } from "..";

import { env } from "./utils";

env();

const browseruse = new BrowserUseClient({
    apiKey: process.env.BROWSER_USE_API_KEY!,
});

// Basic ---------------------------------------------------------------------

async function basic() {
    console.log("Basic: Creating task and starting stream...");

    const task = await browseruse.tasks.createTask({
        task: "What's the weather and temperature in SF, NY, and LA?",
        llm: "gemini-2.5-flash",
    });

    console.log(`task.id: ${task.id}`);

    const counter = { current: 0 };

    for await (const step of task.stream()) {
        console.log(`STREAM 1: ${step.number}`);

        counter.current++;

        if (counter.current === 2) {
            break;
        }
    }

    for await (const step of task.stream()) {
        counter.current++;

        console.log(`STREAM 2: ${step.number}`);
    }

    const result = await task.complete();

    if (counter.current <= result.steps.length || counter.current !== result.steps.length + 2) {
        console.log(`counter.current: ${counter.current}, result.steps.length: ${result.steps.length}`);
        throw new Error(
            "Basic: Stream does not run as expected! Each step should be relogged whenever stream restarts!",
        );
    }

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
        llm: "gpt-4.1",
        schema: TaskOutput,
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
