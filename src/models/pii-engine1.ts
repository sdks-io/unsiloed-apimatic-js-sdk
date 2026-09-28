import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * PII detection engine: standard (default) or advanced (higher precision). Any other value falls
 * back to standard. Ignored if detect_pii is false.
 */
export const PiiEngine1 = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type PiiEngine1 = (typeof PiiEngine1)[keyof typeof PiiEngine1] | (string & {});

export const piiEngine1Schema: EnumSchema<PiiEngine1> = s.enumOf<PiiEngine1>(PiiEngine1);
