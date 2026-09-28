import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Which PII detector engine to use. Ignored if `detect_pii` is false. */
export const PiiEngine3 = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type PiiEngine3 = (typeof PiiEngine3)[keyof typeof PiiEngine3] | (string & {});

export const piiEngine3Schema: EnumSchema<PiiEngine3> = s.enumOf<PiiEngine3>(PiiEngine3);
