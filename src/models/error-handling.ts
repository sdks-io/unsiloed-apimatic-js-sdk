import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Error handling strategy for non-critical processing errors. `Continue` (default) — proceed
 * despite errors (e.g., LLM refusals). `Fail` — stop and fail the task on any error.
 */
export const ErrorHandling = {
  Continue: "Continue",
  Fail: "Fail",
} as const;
export type ErrorHandling = (typeof ErrorHandling)[keyof typeof ErrorHandling] | (string & {});

export const errorHandlingSchema: EnumSchema<ErrorHandling> = s.enumOf<ErrorHandling>(ErrorHandling);
