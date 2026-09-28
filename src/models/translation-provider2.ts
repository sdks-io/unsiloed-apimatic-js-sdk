import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Translation provider: "Auto" (or legacy "Google") for fast machine translation, "VLM" or "LLM"
 * for LLM/VLM-based translation.
 */
export const TranslationProvider2 = {
  Auto: "Auto",
  Vlm: "VLM",
  Llm: "LLM",
} as const;
export type TranslationProvider2 =
  | (typeof TranslationProvider2)[keyof typeof TranslationProvider2]
  | (string & {});

export const translationProvider2Schema: EnumSchema<TranslationProvider2> =
  s.enumOf<TranslationProvider2>(TranslationProvider2);
