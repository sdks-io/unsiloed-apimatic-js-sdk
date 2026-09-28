import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * OCR strategy. `auto_detection` (default) — applies OCR only where needed. `force_ocr` — applies
 * OCR to all content regardless of existing text layer.
 */
export const OcrStrategy3 = {
  AutoDetection: "auto_detection",
  ForceOcr: "force_ocr",
} as const;
export type OcrStrategy3 = (typeof OcrStrategy3)[keyof typeof OcrStrategy3] | (string & {});

export const ocrStrategy3Schema: EnumSchema<OcrStrategy3> = s.enumOf<OcrStrategy3>(OcrStrategy3);
