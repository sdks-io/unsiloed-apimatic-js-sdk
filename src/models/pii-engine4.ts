import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** PII detection engine: 'standard' (default) or 'advanced' (higher precision). */
export const PiiEngine4 = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type PiiEngine4 = (typeof PiiEngine4)[keyof typeof PiiEngine4] | (string & {});

export const piiEngine4Schema: EnumSchema<PiiEngine4> = s.enumOf<PiiEngine4>(PiiEngine4);
