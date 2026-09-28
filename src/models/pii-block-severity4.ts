import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Severity threshold that blocks extraction when detect_pii is enabled: 'any', 'low', 'medium', or
 * 'high'.
 */
export const PiiBlockSeverity4 = {
  Any: "any",
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;
export type PiiBlockSeverity4 = (typeof PiiBlockSeverity4)[keyof typeof PiiBlockSeverity4] | (string & {});

export const piiBlockSeverity4Schema: EnumSchema<PiiBlockSeverity4> =
  s.enumOf<PiiBlockSeverity4>(PiiBlockSeverity4);
