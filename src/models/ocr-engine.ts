import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Controls which OCR engine to use for text recognition:
 * - `UnsiloedStorm`: Enterprise-grade accuracy, optimized for 50+ languages
 * - `UnsiloedHawk`: Higher accuracy, better for complex layouts [DEFAULT]
 * - `UnsiloedBeta`: Handles irregular bounding boxes, rotated/warped text
 */
export const OcrEngine = {
  UnsiloedStorm: "UnsiloedStorm",
  UnsiloedHawk: "UnsiloedHawk",
  UnsiloedBeta: "UnsiloedBeta",
} as const;
export type OcrEngine = (typeof OcrEngine)[keyof typeof OcrEngine] | (string & {});

export const ocrEngineSchema: EnumSchema<OcrEngine> = s.enumOf<OcrEngine>(OcrEngine);
