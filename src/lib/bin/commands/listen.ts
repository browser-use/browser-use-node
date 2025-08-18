import { Command } from 'commander';

import { APIUserAbortError, BrowserUse } from '../../../';
import { createWebhookSignature, Webhook } from '../../webhooks';
import { createBrowserUseClient, getBrowserUseWebhookSecret } from '../auth';

// NOTE: We perform task list refresh to get all running tasks and then
const tickRef: {
  timeout: NodeJS.Timeout | null;
  abort: AbortController | null;
} = { timeout: null, abort: null };

export const listen = new Command('listen')
  .description(`Open a local webhook to receive Cloud API updates from the CLI on your local machine.`)
  .argument('<endpoint>', 'The endpoint to forward updates to.')
  .action(async (endpoint) => {
    // Auth

    const client = createBrowserUseClient();
    const secret = getBrowserUseWebhookSecret();

    // Proxy

    const localTargetEndpoint = endpoint;

    if (typeof localTargetEndpoint !== 'string') {
      // NOTE: This should never happen because the command is validated by commander.
      throw new Error(
        'Something unexpected happened. Please report this issue. https://github.com/browser-use/browser-use-node/issues',
      );
    }

    const localTargetURL = new URL(localTargetEndpoint);

    //

    const startTimeDate = new Date();
    const queue: { current: Webhook[] } = { current: [] };
    const runs: Map<string, BrowserUse.TaskStatus> = new Map();

    tickRef.timeout = setInterval(async () => {
      // NOTE: On next tick, we abort the current abort controller.
      if (tickRef.abort != null) {
        tickRef.abort.abort();
      }

      const controller = new AbortController();

      tickRef.abort = controller;

      console.log(`[polling] ${new Date().toISOString()} `.padEnd(100, '='));

      const tasks: BrowserUse.Tasks.TaskItemView[] = await client.tasks
        .list(
          {
            pageSize: 10,
            // NOTE: There's a bug in the API where the datetime needs to be provided in naive format.cur
            after: startTimeDate.toISOString().replace('Z', ''),
          },
          {
            signal: tickRef.abort.signal,
          },
        )
        .then((res) => res.items)
        .catch((err) => {
          if (err instanceof APIUserAbortError) {
            return [];
          }

          console.log(`[polling] ${new Date().toISOString()} failed`);
          console.error(err);

          return [];
        });

      for (const task of tasks) {
        const currentTaskStatus = runs.get(task.id);

        const timestamp = task.finishedAt ? task.finishedAt : task.startedAt;

        if (currentTaskStatus == null) {
          // NOTE: The task is new and the CLI hasn't yet captured it in the current run.
          queue.current.push({
            type: 'agent.task.status_update',
            timestamp,
            payload: {
              session_id: task.sessionId,
              task_id: task.id,
              status: task.status,
              metadata: task.metadata,
            },
          });

          runs.set(task.id, task.status);

          continue;
        } else {
          // NOTE: CLI has registered the task in the registry and we need to compare.
          if (task.status !== currentTaskStatus) {
            queue.current.push({
              type: 'agent.task.status_update',
              timestamp,
              payload: {
                session_id: task.sessionId,
                task_id: task.id,
                status: task.status,
                metadata: task.metadata,
              },
            });

            runs.set(task.id, task.status);

            continue;
          }
        }
      }

      if (queue.current.length === 0) {
        return;
      }

      const promises = queue.current.map(async (update) => {
        const body = JSON.stringify(update);

        const signature = createWebhookSignature({
          payload: update.payload,
          timestamp: update.timestamp,
          secret,
        });

        try {
          const res = await fetch(localTargetURL, {
            method: 'POST',
            body,
            headers: {
              'Content-Type': 'application/json',
              // https://docs.browser-use.com/cloud/webhooks#implementing-webhook-verification
              'X-Browser-Use-Timestamp': update.timestamp,
              'X-Browser-Use-Signature': signature,
            },

            signal: controller.signal,
          });

          console.log(`[update] ${update.timestamp} ${update.type} ${res.status}`);

          return { delivery: 'fulfilled', update, status: res.status };
        } catch (err) {
          console.log(`[update] ${update.timestamp} ${update.type} failed`);

          return { delivery: 'rejected', update, error: err };
        }
      });

      const delivery = await Promise.all(promises);

      // NOTE: We preserve the rejected updates so we can retry them.
      queue.current = delivery.filter((d) => d.delivery === 'rejected').map((d) => d.update);
    }, 1_000);

    console.log(`Forwarding updates to: ${localTargetEndpoint}!`);
  });

process.on('SIGINT', () => {
  if (tickRef.abort != null) {
    tickRef.abort.abort();
  }

  if (tickRef.timeout) {
    clearInterval(tickRef.timeout);
  }
});
