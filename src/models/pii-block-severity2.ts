import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Severity threshold at which a detected PII finding blocks the task. Ignored when `detect_pii` is
 * `false`. Findings strictly below the threshold are allowed through; findings at or above it
 * reject the task.
 * - `any` (default) — block on any detection, regardless of severity.
 * - `low` — block on low, medium, or high severity findings.
 * - `medium` — block on medium or high severity findings.
 * - `high` — block only on high severity findings.
 */
export const PiiBlockSeverity2 = {
  Any: "any",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
export type PiiBlockSeverity2 = (typeof PiiBlockSeverity2)[keyof typeof PiiBlockSeverity2] | (string & {});

export const piiBlockSeverity2Schema: EnumSchema<PiiBlockSeverity2> =
  s.enumOf<PiiBlockSeverity2>(PiiBlockSeverity2);
