import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Severity threshold at which to block parsing. Ignored if `detect_pii` is false. */
export const PiiBlockSeverity3 = {
  Any: "any",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
export type PiiBlockSeverity3 = (typeof PiiBlockSeverity3)[keyof typeof PiiBlockSeverity3] | (string & {});

export const piiBlockSeverity3Schema: EnumSchema<PiiBlockSeverity3> =
  s.enumOf<PiiBlockSeverity3>(PiiBlockSeverity3);
