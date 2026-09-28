import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ExtractionCitation = {
  /** `[left, top, right, bottom]` in PDF points, origin top-left. */
  bbox?: number[];
  /** 1-indexed page number. */
  page?: number;
  pageWidth?: number;
  pageHeight?: number;
};

export const extractionCitationSchema: Schema<ExtractionCitation> = s.object<ExtractionCitation>({
  bbox: s.optional(s.array(s.number())),
  page: s.optional(s.number()),
  pageWidth: s.optional(s.number()),
  pageHeight: s.optional(s.number()),
  _keysMap: {
    pageWidth: "page_width",
    pageHeight: "page_height",
  },
});
