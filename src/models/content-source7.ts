import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Controls which source is used to populate the `content` field */
export const ContentSource7 = {
  Ocr: "OCR",
  Html: "HTML",
  Markdown: "Markdown",
  Vlm: "VLM",
  Llm: "LLM",
} as const;
export type ContentSource7 = (typeof ContentSource7)[keyof typeof ContentSource7] | (string & {});

export const contentSource7Schema: EnumSchema<ContentSource7> = s.enumOf<ContentSource7>(ContentSource7);
