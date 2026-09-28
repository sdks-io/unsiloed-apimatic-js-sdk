import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * Per-field include/exclude filter for the response. Each field defaults to `true`; set a field to
 * `false` to drop it. Honored when `response_profile` is omitted or set to `custom`. Ignored when
 * `response_profile` is `slim` or `full` (the profile wins).
 */
export type OutputFieldsConfig = {
  /** Include bounding box information in segment responses */
  bbox?: boolean;
  /** Include extracted chart data for Picture segments identified as charts */
  chartData?: boolean;
  /** Include confidence scores in segment responses */
  confidence?: boolean;
  /** Include text content in segment responses */
  content?: boolean;
  /** Include embed text in chunk responses */
  embed?: boolean;
  /** Include HTML representation in segment responses */
  html?: boolean;
  /** Include images (cropped segment images) in segment responses */
  image?: boolean;
  /** Include Markdown representation in segment responses */
  markdown?: boolean;
  /** Include OCR results in segment responses */
  ocr?: boolean;
};

export const outputFieldsConfigSchema: Schema<OutputFieldsConfig> = s.object<OutputFieldsConfig>({
  bbox: s.optional(s.boolean()),
  chartData: s.optional(s.boolean()),
  confidence: s.optional(s.boolean()),
  content: s.optional(s.boolean()),
  embed: s.optional(s.boolean()),
  html: s.optional(s.boolean()),
  image: s.optional(s.boolean()),
  markdown: s.optional(s.boolean()),
  ocr: s.optional(s.boolean()),
  _keysMap: {
    chartData: "chart_data",
  },
});
