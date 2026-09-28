import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Error handling strategy for non-critical processing errors. `Continue` (default) — proceed
 * despite errors (e.g., LLM refusals). `Fail` — stop and fail the task on any error.
 */
export const ErrorHandling2 = {
  Continue: "Continue",
  Fail: "Fail",
} as const;
export type ErrorHandling2 = (typeof ErrorHandling2)[keyof typeof ErrorHandling2] | (string & {});

export const errorHandling2Schema: EnumSchema<ErrorHandling2> = s.enumOf<ErrorHandling2>(ErrorHandling2);
