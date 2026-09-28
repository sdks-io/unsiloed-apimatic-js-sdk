import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * OCR strategy. `auto_detection` (default) — applies OCR only where needed. `force_ocr` — applies
 * OCR to all content regardless of existing text layer.
 */
export const OcrStrategy1 = {
  AutoDetection: "auto_detection",
  ForceOcr: "force_ocr",
} as const;
export type OcrStrategy1 = (typeof OcrStrategy1)[keyof typeof OcrStrategy1] | (string & {});

export const ocrStrategy1Schema: EnumSchema<OcrStrategy1> = s.enumOf<OcrStrategy1>(OcrStrategy1);
