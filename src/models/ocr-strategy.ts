import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Controls the Optical Character Recognition (OCR) strategy.
 * - `All`: Processes all pages with OCR. (Latency penalty: ~0.5 seconds per page)
 * - `Auto`: Selectively applies OCR only to pages with missing or low-quality text. When text layer
 *   is present the bounding boxes from the text layer are used.
 */
export const OcrStrategy = {
  ForceOcr: "force_ocr",
  AutoDetection: "auto_detection",
} as const;
export type OcrStrategy = (typeof OcrStrategy)[keyof typeof OcrStrategy] | (string & {});

export const ocrStrategySchema: EnumSchema<OcrStrategy> = s.enumOf<OcrStrategy>(OcrStrategy);
