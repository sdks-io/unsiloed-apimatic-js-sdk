import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Engine used by the PII detector service.
 * - `Standard`: regex + spaCy NER.
 * - `Advanced`: VLM-based judgment via OpenAI-compatible API. Higher precision, costs per call.
 */
export const PiiEngine = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type PiiEngine = (typeof PiiEngine)[keyof typeof PiiEngine] | (string & {});

export const piiEngineSchema: EnumSchema<PiiEngine> = s.enumOf<PiiEngine>(PiiEngine);
