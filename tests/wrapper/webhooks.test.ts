import {
    createWebhookSignature,
    verifyWebhookEventSignature,
    zWebhookSchema,
    zWebhookTimestamp,
} from "../../src/wrapper/lib/webhooks";

describe("webhooks", () => {
    describe("parse", () => {
        test("timestamp", () => {
            expect(zWebhookTimestamp.parse("2025-05-25T09:22:22.269116+00:00")).toBeDefined();
            expect(zWebhookTimestamp.parse("2025-08-15T18:09:11.881540")).toBeDefined();
        });

        test("agent.task.status_update", () => {
            const MOCK: unknown = {
                type: "agent.task.status_update",
                timestamp: "2025-05-25T09:22:22.269116+00:00",
                payload: {
                    session_id: "cd9cc7bf-e3af-4181-80a2-73f083bc94b4",
                    task_id: "5b73fb3f-a3cb-4912-be40-17ce9e9e1a45",
                    status: "finished",
                    metadata: {
                        campaign: "q4-automation",
                        team: "marketing",
                    },
                },
            };

            const response = zWebhookSchema.parse(MOCK);

            expect(response).toBeDefined();
        });

        test("test", () => {
            const MOCK: unknown = {
                type: "test",
                timestamp: "2025-05-25T09:22:22.269116+00:00",
                payload: { test: "ok" },
            };

            const response = zWebhookSchema.parse(MOCK);

            expect(response).toBeDefined();
        });

        test("invalid", () => {
            const MOCK: unknown = {
                type: "invalid",
                timestamp: "2025-05-25T09:22:22.269116+00:00",
                payload: { test: "ok" },
            };

            expect(() => zWebhookSchema.parse(MOCK)).toThrow();
        });
    });

    describe("verify", () => {
        test("correctly calculates signature", async () => {
            const timestamp = "2025-05-26:22:22.269116+00:00";

            const MOCK = {
                type: "agent.task.status_update",
                timestamp: "2025-05-25T09:22:22.269116+00:00",
                payload: {
                    session_id: "cd9cc7bf-e3af-4181-80a2-73f083bc94b4",
                    task_id: "5b73fb3f-a3cb-4912-be40-17ce9e9e1a45",
                    status: "finished",
                    metadata: {
                        campaign: "q4-automation",
                        team: "marketing",
                    },
                },
            };

            const signature = createWebhookSignature({
                body: MOCK,
                secret: "secret",
                timestamp,
            });

            const validJSON = await verifyWebhookEventSignature(
                {
                    body: MOCK,
                    signature: signature,
                    timestamp,
                },
                { secret: "secret" },
            );

            const validString = await verifyWebhookEventSignature(
                {
                    body: JSON.stringify(MOCK),
                    signature: signature,
                    timestamp,
                },
                { secret: "secret" },
            );

            const invalid = await verifyWebhookEventSignature(
                {
                    body: JSON.stringify(MOCK),
                    signature: "invalid",
                    timestamp,
                },
                { secret: "secret" },
            );

            expect(validJSON.ok).toBe(true);
            expect(validString.ok).toBe(true);
            expect(invalid.ok).toBe(false);
        });
    });
});
