import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Bounding box for an item. It is used for chunks, segments and OCR results. */
export type BoundingBox = {
  /** The height of the bounding box. */
  height: number;
  /** The left coordinate of the bounding box. */
  left: number;
  /** The top coordinate of the bounding box. */
  top: number;
  /** The width of the bounding box. */
  width: number;
};

export const boundingBoxSchema: Schema<BoundingBox> = s.object<BoundingBox>({
  height: s.number(),
  left: s.number(),
  top: s.number(),
  width: s.number(),
});
