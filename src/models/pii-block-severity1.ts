import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Severity threshold at which the task is rejected when detect_pii is enabled: any (default), low,
 * medium, or high. Ignored if detect_pii is false.
 */
export const PiiBlockSeverity1 = {
  Any: "any",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
export type PiiBlockSeverity1 = (typeof PiiBlockSeverity1)[keyof typeof PiiBlockSeverity1] | (string & {});

export const piiBlockSeverity1Schema: EnumSchema<PiiBlockSeverity1> =
  s.enumOf<PiiBlockSeverity1>(PiiBlockSeverity1);
