import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { translationProvider2Schema, type TranslationProvider2 } from "./translation-provider2.js";

/** Optional translation configuration for this segment type */
export type TranslationConfig1 = {
  /** Optional model ID for VLM/LLM provider. If not specified, uses the default model. */
  modelId?: string | null;
  /**
   * Optional custom prompt for VLM/LLM provider. Appended to the system prompt to give the model
   * additional translation instructions.
   */
  prompt?: string | null;
  /**
   * Translation provider: "Auto" (or legacy "Google") for fast machine translation, "VLM" or "LLM"
   * for LLM/VLM-based translation.
   */
  provider: TranslationProvider2;
  /**
   * Target language code (ISO 639-1, e.g. "en", "es", "fr", "ko"). Use "auto" to auto-detect source
   * language and translate to English.
   */
  targetLanguage: string;
};

export const translationConfig1Schema: Schema<TranslationConfig1> = s.object<TranslationConfig1>({
  modelId: s.optionalNullable(s.string()),
  prompt: s.optionalNullable(s.string()),
  provider: translationProvider2Schema,
  targetLanguage: s.string(),
  _keysMap: {
    modelId: "model_id",
    targetLanguage: "target_language",
  },
});
