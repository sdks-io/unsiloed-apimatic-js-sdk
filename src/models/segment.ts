import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { boundingBoxSchema, type BoundingBox } from "./bounding-box.js";
import { ocrResultSchema, type OcrResult } from "./ocr-result.js";
import { pageBBoxSchema, type PageBBox } from "./page-bbox.js";
import { segmentType1Schema, type SegmentType1 } from "./unions/segment-type1.js";

export type Segment = {
  bbox?: BoundingBox | null;
  /**
   * Spreadsheet cell-range references ({ sheet, address, ref }) for Excel segments. Distinct from
   * `references` (GROBID citations) so the two concepts never collide in the output or on the
   * frontend.
   */
  cellReferences?: Record<string, unknown>[] | null;
  /**
   * Extracted chart data for Picture segments identified as charts. Contains structured data
   * including chart_type, data series, labels, and legend.
   */
  chartData?: Record<string, unknown>;
  /** Confidence score of the layout analysis model */
  confidence?: number | null;
  /**
   * Text content of the segment. By default, this contains OCR-extracted text. The source can be
   * configured via the `content_source` field in segment processing configuration to use HTML,
   * Markdown, or LLM representation instead.
   */
  content?: string;
  /** HTML representation of the segment. */
  html?: string;
  /** Presigned URL to the image of the segment. */
  image?: string | null;
  /** Markdown representation of the segment. */
  markdown?: string;
  /**
   * Per-page bbox info for all pages of a merged multi-page table. Only present on merged table
   * segments (segment_id ends with "_merged").
   */
  mergedPageBboxes?: PageBBox[] | null;
  /** OCR results for the segment. */
  ocr?: OcrResult[] | null;
  /** Height of the page containing the segment. */
  pageHeight?: number;
  /** Page number of the segment. */
  pageNumber: number;
  /** Width of the page containing the segment. */
  pageWidth?: number;
  /** GROBID research-paper citations attached to this segment. */
  references?: Record<string, unknown>[] | null;
  /** Unique identifier for the segment. */
  segmentId: string;
  /**
   * Segment type. Uses the `SegmentType` values with the default `Unsiloed` naming; with
   * `segment_type_naming=Other` alternative names such as `Header`, `List Item`, `Figure` are
   * returned.
   */
  segmentType: SegmentType1;
  /** Display name for the segment type (used for serialization based on naming convention) */
  segmentTypeDisplay?: string | null;
};

export const segmentSchema: Schema<Segment> = s.object<Segment>({
  bbox: s.optionalNullable(s.lazy(() => boundingBoxSchema)),
  cellReferences: s.optionalNullable(s.array(s.record(s.string(), s.unknown()))),
  chartData: s.optional(s.record(s.string(), s.unknown())),
  confidence: s.optionalNullable(s.number()),
  content: s.optional(s.string()),
  html: s.optional(s.string()),
  image: s.optionalNullable(s.string()),
  markdown: s.optional(s.string()),
  mergedPageBboxes: s.optionalNullable(s.array(s.lazy(() => pageBBoxSchema))),
  ocr: s.optionalNullable(s.array(s.lazy(() => ocrResultSchema))),
  pageHeight: s.optional(s.number()),
  pageNumber: s.number(),
  pageWidth: s.optional(s.number()),
  references: s.optionalNullable(s.array(s.record(s.string(), s.unknown()))),
  segmentId: s.string(),
  segmentType: segmentType1Schema,
  segmentTypeDisplay: s.optionalNullable(s.string()),
  _keysMap: {
    cellReferences: "cell_references",
    chartData: "chart_data",
    mergedPageBboxes: "merged_page_bboxes",
    pageHeight: "page_height",
    pageNumber: "page_number",
    pageWidth: "page_width",
    segmentId: "segment_id",
    segmentType: "segment_type",
    segmentTypeDisplay: "segment_type_display",
  },
});
