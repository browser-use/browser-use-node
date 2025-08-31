#!/usr/bin/env -S npm run tsn -T

import { BrowserUseClient, type WrappedTaskFnsWithoutSchema } from "browser-use-sdk";

import { env } from "./utils";
import z from "zod";

env();

// Basic ---------------------------------------------------------------------

async function basic() {
    // gets API Key from environment variable BROWSER_USE_API_KEY
    const browseruse = new BrowserUseClient({
        apiKey: process.env.BROWSER_USE_API_KEY!,
        environment: "production",
    });

    console.log("Basic: Creating task and starting stream...");

    // Create a task and get the stream
    const task: WrappedTaskFnsWithoutSchema = {} as unknown as WrappedTaskFnsWithoutSchema;

    const gen = task.stream();

    for await (const msg of gen) {
        console.log(
            `Basic: ${msg.data.status} ${msg.data.session.liveUrl} ${msg.data.steps[msg.data.steps.length - 1]?.nextGoal}`,
        );

        if (msg.data.status === "finished") {
            console.log(`Basic: ${msg.data.doneOutput}`);
        }
    }

    console.log("\nBasic: Stream completed");
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
    // gets API Key from environment variable BROWSER_USE_API_KEY
    const browseruse = new BrowserUseClient({
        apiKey: process.env.BROWSER_USE_API_KEY!,
        environment: "production",
    });

    console.log("Structured: Creating task and starting stream...\n");

    // Create a task and get the stream
    const task = await browseruse.tasks.createTask({
        task: "Extract top 10 Hacker News posts and return the title, url, and score",
        schema: TaskOutput,
        agent: { llm: "gpt-4.1" },
    });

    const stream = task.stream();

    for await (const msg of stream) {
        // Regular
        process.stdout.write(`Structured: ${msg.data.status}`);
        if (msg.data.session.liveUrl) {
            process.stdout.write(` | Live URL: ${msg.data.session.liveUrl}`);
        }

        if (msg.data.steps.length > 0) {
            const latestStep = msg.data.steps[msg.data.steps.length - 1];
            process.stdout.write(` | ${latestStep!.nextGoal}`);
        }

        process.stdout.write("\n");

        // Output
        if (msg.data.status === "finished") {
            process.stdout.write(`\n\nOUTPUT:`);

            for (const post of msg.data.parsedOutput!.posts) {
                process.stdout.write(`\n - ${post.title} (${post.score}) ${post.url}`);
            }
        }
    }

    console.log("\nStructured: Stream completed");
}

basic()
    .then(() => structured())
    .catch(console.error);
