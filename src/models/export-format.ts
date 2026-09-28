import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * File format for exporting parsed results. When specified in a parse request, the pipeline
 * generates the requested export file after processing completes. The exported file is available
 * via the `exports` field in the task response.
 */
export const ExportFormat = {
  Docx: "docx",
  Markdown: "markdown",
  Json: "json",
} as const;
export type ExportFormat = (typeof ExportFormat)[keyof typeof ExportFormat] | (string & {});

export const exportFormatSchema: EnumSchema<ExportFormat> = s.enumOf<ExportFormat>(ExportFormat);
