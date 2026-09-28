import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { boundingBoxSchema, type BoundingBox } from "./bounding-box.js";

/** Bbox and page info for one page of a merged multi-page table. */
export type PageBBox = {
  /** Bounding box for an item. It is used for chunks, segments and OCR results. */
  bbox: BoundingBox;
  pageHeight: number;
  pageNumber: number;
  pageWidth: number;
};

export const pageBBoxSchema: Schema<PageBBox> = s.object<PageBBox>({
  bbox: boundingBoxSchema,
  pageHeight: s.number(),
  pageNumber: s.number(),
  pageWidth: s.number(),
  _keysMap: {
    pageHeight: "page_height",
    pageNumber: "page_number",
    pageWidth: "page_width",
  },
});
