import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Error handling strategy: `Continue` (default) or `Fail`. */
export const ErrorHandling1 = {
  Continue: "Continue",
  Fail: "Fail",
} as const;
export type ErrorHandling1 = (typeof ErrorHandling1)[keyof typeof ErrorHandling1] | (string & {});

export const errorHandling1Schema: EnumSchema<ErrorHandling1> = s.enumOf<ErrorHandling1>(ErrorHandling1);
