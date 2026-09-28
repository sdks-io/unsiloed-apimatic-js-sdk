import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Controls which source is used to populate the `content` field (default: OCR) */
export const ContentSource1 = {
  Ocr: "OCR",
  Html: "HTML",
  Markdown: "Markdown",
  Vlm: "VLM",
  Llm: "LLM",
} as const;
export type ContentSource1 = (typeof ContentSource1)[keyof typeof ContentSource1] | (string & {});

export const contentSource1Schema: EnumSchema<ContentSource1> = s.enumOf<ContentSource1>(ContentSource1);
