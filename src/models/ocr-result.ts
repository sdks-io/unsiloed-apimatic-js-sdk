import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { boundingBoxSchema, type BoundingBox } from "./bounding-box.js";
import { textColor2Schema, type TextColor2 } from "./text-color2.js";

/** OCR results for a segment */
export type OcrResult = {
  /** Bounding box for an item. It is used for chunks, segments and OCR results. */
  bbox: BoundingBox;
  color?: TextColor2 | null;
  /** The confidence score of the recognized text. */
  confidence?: number | null;
  /** Optional link URL associated with this OCR result (from PDF annotations) */
  link?: string | null;
  /** The recognized text of the OCR result. */
  text: string;
};

export const ocrResultSchema: Schema<OcrResult> = s.object<OcrResult>({
  bbox: boundingBoxSchema,
  color: s.optionalNullable(s.lazy(() => textColor2Schema)),
  confidence: s.optionalNullable(s.number()),
  link: s.optionalNullable(s.string()),
  text: s.string(),
});
