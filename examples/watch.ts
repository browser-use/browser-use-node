#!/usr/bin/env -S npm run tsn -T

import z from "zod";

import { BrowserUseClient } from "..";
import { env } from "./utils";

env();

// gets API Key from environment variable BROWSER_USE_API_KEY
const browseruse = new BrowserUseClient({
    apiKey: process.env.BROWSER_USE_API_KEY!,
});

// Basic ---------------------------------------------------------------------

async function basic() {
    console.log("Basic: Creating task and starting watch...");

    const task = await browseruse.tasks.createTask({
        task: "What's the weather in SF and what's the temperature?",
        llm: "gemini-2.5-flash",
    });

    for await (const msg of task.watch()) {
        console.log(msg);

        if (msg.data.status === "finished") {
            console.log(`OUTPUT: ${msg.data.output}`);
        }
    }

    console.log("Watch completed");
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
    console.log("Structured: Creating task and starting watch...\n");

    const task = await browseruse.tasks.createTask({
        task: "Extract top 10 Hacker News posts and return the title, url, and score",
        schema: TaskOutput,
        llm: "gpt-4.1",
    });

    for await (const msg of task.watch()) {
        console.log(msg);

        // Output
        if (msg.data.status === "finished") {
            console.log(`OUTPUT:`);

            for (const post of msg.data.parsed!.posts) {
                console.log(` - ${post.title} (${post.score}) ${post.url}`);
            }
        }
    }

    console.log("\nStructured: Watch completed");
}

basic()
    .then(() => structured())
    .catch(console.error);
