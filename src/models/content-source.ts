import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Controls which source is used to populate the `content` field in the segment output */
export const ContentSource = {
  Ocr: "OCR",
  Html: "HTML",
  Markdown: "Markdown",
  Vlm: "VLM",
  Llm: "LLM",
} as const;
export type ContentSource = (typeof ContentSource)[keyof typeof ContentSource] | (string & {});

export const contentSourceSchema: EnumSchema<ContentSource> = s.enumOf<ContentSource>(ContentSource);
