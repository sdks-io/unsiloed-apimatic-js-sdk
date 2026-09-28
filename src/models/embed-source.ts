import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const EmbedSource = {
  Html: "HTML",
  Markdown: "Markdown",
  Vlm: "VLM",
  Content: "Content",
} as const;
export type EmbedSource = (typeof EmbedSource)[keyof typeof EmbedSource] | (string & {});

export const embedSourceSchema: EnumSchema<EmbedSource> = s.enumOf<EmbedSource>(EmbedSource);
