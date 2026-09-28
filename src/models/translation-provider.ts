import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const TranslationProvider = {
  Auto: "Auto",
  Vlm: "VLM",
  Llm: "LLM",
} as const;
export type TranslationProvider =
  | (typeof TranslationProvider)[keyof typeof TranslationProvider]
  | (string & {});

export const translationProviderSchema: EnumSchema<TranslationProvider> =
  s.enumOf<TranslationProvider>(TranslationProvider);
