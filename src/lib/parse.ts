import z, { type ZodType } from 'zod';
import { toJSONSchema } from 'zod/v4';
import type { TaskCreateParams, TaskView } from '../resources/tasks';

// RUN

export type TaskCreateParamsWithSchema<T extends ZodType> = Omit<TaskCreateParams, 'structuredOutputJson'> & {
  schema: T;
};

export function stringifyStructuredOutput<T extends ZodType>(schema: T): string {
  return JSON.stringify(toJSONSchema(schema));
}

// RETRIEVE

export type TaskViewWithSchema<T extends ZodType> = TaskView & {
  parsedOutput: z.output<T> | null;
};

export function parseStructuredTaskOutput<T extends ZodType>(
  res: TaskView,
  schema: T,
): TaskViewWithSchema<T> {
  if (res.doneOutput == null) {
    return { ...res, parsedOutput: null };
  }

  try {
    const parsed = JSON.parse(res.doneOutput);

    const response = schema.safeParse(parsed);
    if (!response.success) {
      throw new Error(`Invalid structured output: ${response.error.message}`);
    }

    return { ...res, parsedOutput: response.data };
  } catch (e) {
    if (e instanceof SyntaxError) {
      return {
        ...res,
        parsedOutput: null,
      };
    }
    throw e;
  }
}
