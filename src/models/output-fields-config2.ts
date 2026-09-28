import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * Configuration for controlling which output fields are included in responses. Allows selective
 * inclusion/exclusion of HTML, Markdown, OCR, images, etc. Skipped from the echo when it's the
 * all-true default so a Slim response doesn't carry a misleading "everything on" block.
 */
export type OutputFieldsConfig2 = {
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

export const outputFieldsConfig2Schema: Schema<OutputFieldsConfig2> = s.object<OutputFieldsConfig2>({
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
