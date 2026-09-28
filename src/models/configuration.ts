import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { chunkProcessingSchema, type ChunkProcessing } from "./chunk-processing.js";
import { errorHandlingStrategySchema, type ErrorHandlingStrategy } from "./error-handling-strategy.js";
import { excelConfiguration2Schema, type ExcelConfiguration2 } from "./excel-configuration2.js";
import { exportFormatSchema, type ExportFormat } from "./export-format.js";
import { modelSchema, type Model } from "./model.js";
import { ocrEngineSchema, type OcrEngine } from "./ocr-engine.js";
import { ocrStrategySchema, type OcrStrategy } from "./ocr-strategy.js";
import { outputFieldsConfig2Schema, type OutputFieldsConfig2 } from "./output-fields-config2.js";
import { piiBlockSeverity3Schema, type PiiBlockSeverity3 } from "./pii-block-severity3.js";
import { piiEngine3Schema, type PiiEngine3 } from "./pii-engine3.js";
import { responseProfile4Schema, type ResponseProfile4 } from "./response-profile4.js";
import { segmentProcessingSchema, type SegmentProcessing } from "./segment-processing.js";
import {
  segmentTypeNamingConvention2Schema,
  type SegmentTypeNamingConvention2,
} from "./segment-type-naming-convention2.js";
import { segmentTypeSchema, type SegmentType } from "./segment-type.js";
import { segmentationStrategySchema, type SegmentationStrategy } from "./segmentation-strategy.js";
import { SegmentationVersion, segmentationVersionSchema } from "./segmentation-version.js";

export type Configuration = {
  /** Agentic OCR engine to use. None = disabled. Some("standard") or Some("advanced"). */
  agenticOcr?: string | null;
  /** Controls the setting for the chunking and post-processing of each chunk. */
  chunkProcessing: ChunkProcessing;
  /**
   * When true, run a PII detection pass before parsing. If PII is found at or above
   * `pii_block_severity`, the task is rejected and no parsing occurs.
   */
  detectPii?: boolean;
  /**
   * Reorder detected segments to follow the document's natural reading order. Useful for
   * multi-column layouts (newspapers, two- or three-column papers). Has no effect when
   * `layout_analysis="page_by_page"`. Defaults to `false`.
   */
  enhanceReadingOrder?: boolean;
  /**
   * Controls how errors are handled during processing:
   * - `Fail`: Stops processing and fails the task when any error occurs
   * - `Continue`: Attempts to continue processing despite non-critical errors (eg. LLM refusals
   *   etc.)
   */
  errorHandling: ErrorHandlingStrategy;
  excelConfig?: ExcelConfiguration2 | null;
  /**
   * Reserved field. Persisted in the task configuration but currently has no effect on retention
   * for this endpoint — `POST /parse` (multipart and JSON/Form) does not set the task's
   * `expires_at` column, and the cleanup job only deletes `AwaitingUpload` rows past their
   * `expires_at`. To get a presigned-upload TTL, use `POST /v2/parse/upload` instead, where
   * `expires_in` controls the upload URL's validity.
   */
  expiresIn?: number | null;
  /**
   * Export format(s) to generate after parsing: `docx`, `markdown`, `json`. The files are returned
   * as presigned URLs in the `exports` field of `GET /parse/{job_id}`.
   */
  exportFormat?: ExportFormat[] | null;
  /**
   * Whether to extract and apply color information from PDF text layer to OCR results. When
   * enabled, text color (RGB/hex) from the PDF is transferred to matching OCR words. Default: false
   */
  extractColors?: boolean;
  /**
   * Whether to extract and apply hyperlink annotations from PDF to OCR results. When enabled, link
   * URLs from PDF annotations are attached to matching OCR words. Default: false
   */
  extractLinks?: boolean;
  /** Preserve strikethrough formatting in HTML/Markdown output. Default: false. */
  extractStrikethrough?: boolean;
  /** Whether to use high-resolution images for cropping and post-processing. */
  highResolution: boolean;
  /** The presigned URL of the input file. */
  inputFileUrl?: string | null;
  /**
   * @deprecated
   */
  jsonSchema?: Record<string, unknown>;
  /**
   * Controls the segmentation strategy:
   * - `LayoutAnalysis` (wire value `smart_layout_detection`): Analyzes pages for layout elements
   *   (e.g., `Table`, `Picture`, `Formula`, etc.) using bounding boxes. Provides fine-grained
   *   segmentation and better chunking. (Latency penalty: ~TBD seconds per page).
   * - `Page` (wire value `page_by_page`): Treats each page as a single segment. Faster processing,
   *   but without layout element detection and only simple chunking.
   * - `AdvancedLayoutAnalysis` (wire value `advanced_layout_detection`): Higher-accuracy layout
   *   detection for complex pages (multi-column layouts, dense tables/figures); slower than
   *   `LayoutAnalysis`.
   */
  layoutAnalysis: SegmentationStrategy;
  /**
   * Segmentation model version selected per request.
   * - `v1` (default): the standard layout model (11 core element types).
   * - `v2`: a form-aware layout model that additionally returns `KeyValuePair`, `Signature`, and
   *   `Seal` segments.
   *
   * Unrecognized values fall back to `v1`.
   *
   * @default SegmentationVersion.V1
   */
  segmentationVersion?: SegmentationVersion;
  /**
   * Maximum number of tables allowed in a single merge group. Groups larger than this are split
   * into sub-groups of this size. Defaults to 20. Helps avoid Gemini rate limits on very large
   * documents.
   */
  mergeBatchSize?: number;
  /** Whether to merge adjacent tables using VLM */
  mergeTables?: boolean;
  model?: Model | null;
  /**
   * Controls which OCR engine to use for text recognition:
   * - `UnsiloedStorm`: Enterprise-grade accuracy, optimized for 50+ languages
   * - `UnsiloedHawk`: Higher accuracy, better for complex layouts [DEFAULT]
   * - `UnsiloedBeta`: Handles irregular bounding boxes, rotated/warped text
   */
  ocrEngine: OcrEngine;
  /**
   * Controls the Optical Character Recognition (OCR) strategy.
   * - `All`: Processes all pages with OCR. (Latency penalty: ~0.5 seconds per page)
   * - `Auto`: Selectively applies OCR only to pages with missing or low-quality text. When text
   *   layer is present the bounding boxes from the text layer are used.
   */
  ocrStrategy: OcrStrategy;
  /**
   * Configuration for controlling which output fields are included in responses. Allows selective
   * inclusion/exclusion of HTML, Markdown, OCR, images, etc. Skipped from the echo when it's the
   * all-true default so a Slim response doesn't carry a misleading "everything on" block.
   */
  outputFields?: OutputFieldsConfig2;
  /**
   * Explicit mapping of array indices to actual page numbers (1-based). Used when parsing selective
   * pages (e.g., [4, 5, 8, 9, 10, 11, 12]). Populated from the page_range parameter.
   */
  pageNumbers?: number[] | null;
  /** Optional page range to process (e.g., "1-5,8,10-12"). If None, all pages are processed. */
  pageRange?: string | null;
  /** Severity threshold at which to block parsing. Ignored if `detect_pii` is false. */
  piiBlockSeverity?: PiiBlockSeverity3;
  /** Which PII detector engine to use. Ignored if `detect_pii` is false. */
  piiEngine?: PiiEngine3;
  responseProfile?: ResponseProfile4 | null;
  segmentAnalysis: SegmentProcessing;
  /**
   * Segment filter: comma-separated segment types to keep, or "all". Replaces the old
   * metadata-based keep_segment_types storage.
   */
  segmentFilter?: string;
  /** Controls the naming convention for segment types in the output */
  segmentTypeNaming: SegmentTypeNamingConvention2;
  /**
   * The target number of words in each chunk. If 0, each chunk will contain a single segment.
   *
   * @deprecated
   */
  targetChunkLength?: number | null;
  validateSegments?: SegmentType[];
  /** Whether to extract structured citation data */
  xmlCitation?: boolean;
};

export const configurationSchema: Schema<Configuration> = s.object<Configuration>({
  agenticOcr: s.optionalNullable(s.string()),
  chunkProcessing: chunkProcessingSchema,
  detectPii: s.optional(s.boolean()),
  enhanceReadingOrder: s.optional(s.boolean()),
  errorHandling: errorHandlingStrategySchema,
  excelConfig: s.optionalNullable(s.lazy(() => excelConfiguration2Schema)),
  expiresIn: s.optionalNullable(s.number()),
  exportFormat: s.optionalNullable(s.array(s.lazy(() => exportFormatSchema))),
  extractColors: s.optional(s.boolean()),
  extractLinks: s.optional(s.boolean()),
  extractStrikethrough: s.optional(s.boolean()),
  highResolution: s.boolean(),
  inputFileUrl: s.optionalNullable(s.string()),
  jsonSchema: s.optional(s.record(s.string(), s.unknown())),
  layoutAnalysis: segmentationStrategySchema,
  segmentationVersion: s.defaulted(segmentationVersionSchema, SegmentationVersion.V1),
  mergeBatchSize: s.optional(s.number()),
  mergeTables: s.optional(s.boolean()),
  model: s.optionalNullable(s.lazy(() => modelSchema)),
  ocrEngine: ocrEngineSchema,
  ocrStrategy: ocrStrategySchema,
  outputFields: s.optional(s.lazy(() => outputFieldsConfig2Schema)),
  pageNumbers: s.optionalNullable(s.array(s.number())),
  pageRange: s.optionalNullable(s.string()),
  piiBlockSeverity: s.optional(s.lazy(() => piiBlockSeverity3Schema)),
  piiEngine: s.optional(s.lazy(() => piiEngine3Schema)),
  responseProfile: s.optionalNullable(s.lazy(() => responseProfile4Schema)),
  segmentAnalysis: segmentProcessingSchema,
  segmentFilter: s.optional(s.string()),
  segmentTypeNaming: segmentTypeNamingConvention2Schema,
  targetChunkLength: s.optionalNullable(s.number()),
  validateSegments: s.optional(s.array(s.lazy(() => segmentTypeSchema))),
  xmlCitation: s.optional(s.boolean()),
  _keysMap: {
    agenticOcr: "agentic_ocr",
    chunkProcessing: "chunk_processing",
    detectPii: "detect_pii",
    enhanceReadingOrder: "enhance_reading_order",
    errorHandling: "error_handling",
    excelConfig: "excel_config",
    expiresIn: "expires_in",
    exportFormat: "export_format",
    extractColors: "extract_colors",
    extractLinks: "extract_links",
    extractStrikethrough: "extract_strikethrough",
    highResolution: "high_resolution",
    inputFileUrl: "input_file_url",
    jsonSchema: "json_schema",
    layoutAnalysis: "layout_analysis",
    segmentationVersion: "segmentation_version",
    mergeBatchSize: "merge_batch_size",
    mergeTables: "merge_tables",
    ocrEngine: "ocr_engine",
    ocrStrategy: "ocr_strategy",
    outputFields: "output_fields",
    pageNumbers: "page_numbers",
    pageRange: "page_range",
    piiBlockSeverity: "pii_block_severity",
    piiEngine: "pii_engine",
    responseProfile: "response_profile",
    segmentAnalysis: "segment_analysis",
    segmentFilter: "segment_filter",
    segmentTypeNaming: "segment_type_naming",
    targetChunkLength: "target_chunk_length",
    validateSegments: "validate_segments",
    xmlCitation: "xml_citation",
  },
});
