import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Severity threshold at which the task is rejected for PII.
 * - `Any`: block on any PII found (strictest).
 * - `Low`: block on quasi-identifiers (names, dates, locations) or higher.
 * - `Medium`: block on contact PII (email, phone) or higher.
 * - `High`: block only on direct identifiers (SSN, passport, credit card, etc.).
 */
export const PiiBlockSeverity = {
  Any: "any",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
export type PiiBlockSeverity = (typeof PiiBlockSeverity)[keyof typeof PiiBlockSeverity] | (string & {});

export const piiBlockSeveritySchema: EnumSchema<PiiBlockSeverity> =
  s.enumOf<PiiBlockSeverity>(PiiBlockSeverity);
