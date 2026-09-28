import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** OCR engine: `UnsiloedHawk` (default, recommended), `UnsiloedBeta`, or `UnsiloedStorm`. */
export const OcrEngine1 = {
  UnsiloedHawk: "UnsiloedHawk",
  UnsiloedBeta: "UnsiloedBeta",
  UnsiloedStorm: "UnsiloedStorm",
} as const;
export type OcrEngine1 = (typeof OcrEngine1)[keyof typeof OcrEngine1] | (string & {});

export const ocrEngine1Schema: EnumSchema<OcrEngine1> = s.enumOf<OcrEngine1>(OcrEngine1);
