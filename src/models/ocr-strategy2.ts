import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** OCR strategy: `auto_detection` (default) or `force_ocr`. */
export const OcrStrategy2 = {
  AutoDetection: "auto_detection",
  ForceOcr: "force_ocr",
} as const;
export type OcrStrategy2 = (typeof OcrStrategy2)[keyof typeof OcrStrategy2] | (string & {});

export const ocrStrategy2Schema: EnumSchema<OcrStrategy2> = s.enumOf<OcrStrategy2>(OcrStrategy2);
