import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Controls how errors are handled during processing:
 * - `Fail`: Stops processing and fails the task when any error occurs
 * - `Continue`: Attempts to continue processing despite non-critical errors (eg. LLM refusals etc.)
 */
export const ErrorHandlingStrategy = {
  Fail: "Fail",
  Continue: "Continue",
} as const;
export type ErrorHandlingStrategy =
  | (typeof ErrorHandlingStrategy)[keyof typeof ErrorHandlingStrategy]
  | (string & {});

export const errorHandlingStrategySchema: EnumSchema<ErrorHandlingStrategy> =
  s.enumOf<ErrorHandlingStrategy>(ErrorHandlingStrategy);
