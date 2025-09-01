#!/usr/bin/env -S npm run tsn -T

import z from "zod";

import { BrowserUseClient } from "..";

import { env, spinner } from "./utils";

env();

// gets API Key from environment variable BROWSER_USE_API_KEY
const browseruse = new BrowserUseClient({
    apiKey: process.env.BROWSER_USE_API_KEY!,
    environment: "https://api.browser-use.com/api/v2",
});

// Basic ---------------------------------------------------------------------

async function basic() {
    let log = "starting";
    const stop = spinner(() => log);

    // Create Task
    const rsp = await browseruse.tasks.createTask({
        task: "What's the weather in SF and what's the temperature?",
        agent: { llm: "gemini-2.5-flash" },
    });

    poll: do {
        // Wait for Task to Finish
        const status = await browseruse.tasks.getTask(rsp.id);

        switch (status.status) {
            case "started":
            case "paused":
            case "stopped":
                log = `agent ${status.status} ${status.sessionId} ${status.steps.length} steps`;

                await new Promise((resolve) => setTimeout(resolve, 2000));
                break;

            case "finished":
                stop();

                console.log(status);

                console.log(status.output);
                break poll;
        }
    } while (true);
}

// Structured ----------------------------------------------------------------

const TaskOutput = z.object({
    degreesFahrenheit: z.number(),
    degreesCelsius: z.number(),

    description: z.string(),
});

async function structured() {
    let log = "starting";
    const stop = spinner(() => log);

    // Create Task
    const rsp = await browseruse.tasks.createTask({
        task: "What's the weather in SF and what's the temperature?",
        schema: TaskOutput,
        agent: { llm: "gpt-4.1" },
    });

    poll: do {
        // Wait for Task to Finish
        const status = await browseruse.tasks.getTask({
            taskId: rsp.id,
            schema: TaskOutput,
        });

        switch (status.status) {
            case "started":
            case "paused":
            case "stopped": {
                log = `agent ${status.status} ${status.sessionId} | ${status.steps.length} steps`;

                await new Promise((resolve) => setTimeout(resolve, 2000));

                break;
            }

            case "finished":
                if (status.parsed == null) {
                    throw new Error("No output");
                }

                stop();

                // Print Structured Output
                console.log("Weather in SF:");
                console.log("--------------------------------");
                console.log(status.parsed.description);

                console.log(` - ${status.parsed.degreesFahrenheit} degrees Fahrenheit`);
                console.log(` - ${status.parsed.degreesCelsius} degrees Celsius`);

                console.log("--------------------------------");

                break poll;
        }
    } while (true);
}

basic()
    .then(() => structured())
    .catch(console.error);
