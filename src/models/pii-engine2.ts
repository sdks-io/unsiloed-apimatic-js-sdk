import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * PII detector engine to use when `detect_pii` is `true`. Ignored otherwise.
 * - `standard` (default) — fast pattern-based detector; low latency, well-suited to bulk
 *   pre-screening.
 * - `advanced` — model-based detector; slower but catches contextual cases that pattern matching
 *   misses (e.g. handwritten names, partially redacted IDs, document-style references to a person).
 */
export const PiiEngine2 = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type PiiEngine2 = (typeof PiiEngine2)[keyof typeof PiiEngine2] | (string & {});

export const piiEngine2Schema: EnumSchema<PiiEngine2> = s.enumOf<PiiEngine2>(PiiEngine2);
