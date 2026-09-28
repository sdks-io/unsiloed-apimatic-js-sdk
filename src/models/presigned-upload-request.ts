import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { agenticOcrSchema, type AgenticOcr } from "./agentic-ocr.js";
import { errorHandling1Schema, type ErrorHandling1 } from "./error-handling1.js";
import { exportFormatSchema, type ExportFormat } from "./export-format.js";
import { layoutAnalysis1Schema, type LayoutAnalysis1 } from "./layout-analysis1.js";
import { ocrEngine1Schema, type OcrEngine1 } from "./ocr-engine1.js";
import { ocrStrategy2Schema, type OcrStrategy2 } from "./ocr-strategy2.js";
import { PiiBlockSeverity2, piiBlockSeverity2Schema } from "./pii-block-severity2.js";
import { PiiEngine2, piiEngine2Schema } from "./pii-engine2.js";
import { responseProfile2Schema, type ResponseProfile2 } from "./response-profile2.js";
import { segmentTypeNaming1Schema, type SegmentTypeNaming1 } from "./segment-type-naming1.js";
import { segmentTypeSchema, type SegmentType } from "./segment-type.js";
import { segmentationVersion1Schema, type SegmentationVersion1 } from "./segmentation-version1.js";

/**
 * Request body for POST /v2/parse/upload. Configuration fields mirror the existing /parse multipart
 * form fields.
 */
export type PresignedUploadRequest = {
  /** Enable per-segment agentic OCR for higher accuracy. Pass `"standard"` or `"advanced"`. */
  agenticOcr?: AgenticOcr | null;
  /** JSON object for chunk processing configuration. */
  chunkProcessing?: Record<string, unknown>;
  /**
   * Run a PII pre-check before parsing. When enabled, the document is scanned for personally
   * identifiable information before any extraction work happens. If PII is found at or above
   * `pii_block_severity`, the task is rejected and no parsing occurs (the job ends in a failed
   * state with a PII reason). Defaults to `false`.
   *
   * @default false
   */
  detectPii?: boolean | null;
  /**
   * Reorder detected segments to follow the document's natural reading order. Useful for
   * multi-column layouts (newspapers, two- or three-column papers). Has no effect when
   * `layout_analysis="page_by_page"`. Defaults to `false`.
   */
  enhanceReadingOrder?: boolean | null;
  /** Error handling strategy: `Continue` (default) or `Fail`. */
  errorHandling?: ErrorHandling1 | null;
  /**
   * Seconds the returned presigned upload URL stays valid. Defaults to the
   * `PRESIGNED_UPLOAD_EXPIRY_SECS` env value (typically 900 / 15 min). Once the client uploads the
   * file, the task's `expires_at` is cleared and the task lifetime is no longer bounded by this
   * value.
   *
   * @default 900
   */
  expiresIn?: number | null;
  /** Export format(s) to generate after processing. Supported: `["docx", "markdown", "json"]`. */
  exportFormat?: ExportFormat[] | null;
  /** Transfer text color from the PDF text layer to OCR results. Defaults to `false`. */
  extractColors?: boolean | null;
  /** Attach hyperlink URLs from PDF annotations to OCR results. Defaults to `false`. */
  extractLinks?: boolean | null;
  /** Preserve strikethrough formatting in HTML/Markdown output. Defaults to `false`. */
  extractStrikethrough?: boolean | null;
  /**
   * File name with extension. Required. Determines content-type. Supported types: PDF, PNG,
   * JPG/JPEG, TIFF/TIF, WebP, DOC, DOCX, PPT, PPTX, XLS, XLSX, HTML/HTM. Documents are limited to
   * 2000 pages by default.
   */
  fileName: string;
  /**
   * Layout analysis strategy: `smart_layout_detection` (default), `page_by_page`, or
   * `advanced_layout_detection` (higher-accuracy layout detection for complex pages — multi-column
   * layouts, dense tables/figures; slower than the default).
   */
  layoutAnalysis?: LayoutAnalysis1 | null;
  /**
   * Segmentation model version: `v1` (default) or `v2`. `v2` is form-aware and additionally returns
   * `KeyValuePair`, `Signature`, and `Seal` segments. Unrecognized values fall back to `v1`.
   */
  segmentationVersion?: SegmentationVersion1 | null;
  /** JSON object for LLM processing configuration. */
  llmProcessing?: Record<string, unknown>;
  /**
   * Maximum number of tables per merge group. Groups larger than this are split. Defaults to 20.
   *
   * @default 20
   */
  mergeBatchSize?: number | null;
  /** Merge tables that span multiple pages into a single unified structure. Defaults to `false`. */
  mergeTables?: boolean | null;
  /** OCR engine: `UnsiloedHawk` (default, recommended), `UnsiloedBeta`, or `UnsiloedStorm`. */
  ocrEngine?: OcrEngine1 | null;
  /** OCR strategy: `auto_detection` (default) or `force_ocr`. */
  ocrStrategy?: OcrStrategy2 | null;
  /**
   * JSON object filtering which fields appear on each segment / chunk. Each key defaults to `true`;
   * set a key to `false` to drop the field. Keys: `bbox`, `chart_data`, `confidence`, `content`,
   * `embed`, `html`, `image`, `markdown`, `ocr`. Ignored when `response_profile` is `slim` or
   * `full`.
   */
  outputFields?: Record<string, unknown>;
  /** Page range to process. Formats: `"1-5"`, `"2,4,6"`, `"[1,3,5]"`. Defaults to all pages. */
  pageRange?: string | null;
  /**
   * Severity threshold at which a detected PII finding blocks the task. Ignored when `detect_pii`
   * is `false`. Findings strictly below the threshold are allowed through; findings at or above it
   * reject the task.
   * - `any` (default) — block on any detection, regardless of severity.
   * - `low` — block on low, medium, or high severity findings.
   * - `medium` — block on medium or high severity findings.
   * - `high` — block only on high severity findings.
   *
   * @default PiiBlockSeverity2.Any
   */
  piiBlockSeverity?: PiiBlockSeverity2 | null;
  /**
   * PII detector engine to use when `detect_pii` is `true`. Ignored otherwise.
   * - `standard` (default) — fast pattern-based detector; low latency, well-suited to bulk
   *   pre-screening.
   * - `advanced` — model-based detector; slower but catches contextual cases that pattern matching
   *   misses (e.g. handwritten names, partially redacted IDs, document-style references to a
   *   person).
   *
   * @default PiiEngine2.Standard
   */
  piiEngine?: PiiEngine2 | null;
  /**
   * Response shape selector: `slim`, `full`, or `custom`.
   * - `slim`: chunk `embed` + bbox + page_number + segment_id + segment_type + HTML for tables /
   *   Markdown otherwise. Drops content/image/ocr/confidence/chart_data/page_height/page_width.
   * - `full`: every field returned (equivalent to omitting this param).
   * - `custom`: honor `output_fields` verbatim.
   *
   * When both `response_profile` and `output_fields` are provided, the profile wins.
   */
  responseProfile?: ResponseProfile2 | null;
  /** Segment filter: comma-separated segment types to keep, or "all". Defaults to `"all"`. */
  segmentFilter?: string | null;
  /** JSON object for segment processing/analysis configuration. */
  segmentProcessing?: Record<string, unknown>;
  /** Segment type naming convention: `Unsiloed` (default) or `Other`. */
  segmentTypeNaming?: SegmentTypeNaming1 | null;
  /**
   * Use high-resolution images for cropping and post-processing. Defaults to `false`.
   *
   * @default false
   */
  useHighResolution?: boolean | null;
  /** Segment types to validate with VLM. Defaults to `["Table", "Picture"]`. */
  validateSegments?: SegmentType[] | null;
  /** Legacy: validate table segments using VLM. Prefer `validate_segments` instead. */
  validateTableSegments?: boolean | null;
  /** Extract and hyperlink bibliography citations in the markdown output. Defaults to `false`. */
  xmlCitation?: boolean | null;
};

export const presignedUploadRequestSchema: Schema<PresignedUploadRequest> = s.object<PresignedUploadRequest>({
  agenticOcr: s.optionalNullable(s.lazy(() => agenticOcrSchema)),
  chunkProcessing: s.optional(s.record(s.string(), s.unknown())),
  detectPii: s.defaulted(s.nullable(s.boolean()), false),
  enhanceReadingOrder: s.optionalNullable(s.boolean()),
  errorHandling: s.optionalNullable(s.lazy(() => errorHandling1Schema)),
  expiresIn: s.defaulted(s.nullable(s.number()), 900),
  exportFormat: s.optionalNullable(s.array(s.lazy(() => exportFormatSchema))),
  extractColors: s.optionalNullable(s.boolean()),
  extractLinks: s.optionalNullable(s.boolean()),
  extractStrikethrough: s.optionalNullable(s.boolean()),
  fileName: s.string(),
  layoutAnalysis: s.optionalNullable(s.lazy(() => layoutAnalysis1Schema)),
  segmentationVersion: s.optionalNullable(s.lazy(() => segmentationVersion1Schema)),
  llmProcessing: s.optional(s.record(s.string(), s.unknown())),
  mergeBatchSize: s.defaulted(s.nullable(s.number()), 20),
  mergeTables: s.optionalNullable(s.boolean()),
  ocrEngine: s.optionalNullable(s.lazy(() => ocrEngine1Schema)),
  ocrStrategy: s.optionalNullable(s.lazy(() => ocrStrategy2Schema)),
  outputFields: s.optional(s.record(s.string(), s.unknown())),
  pageRange: s.optionalNullable(s.string()),
  piiBlockSeverity: s.defaulted(s.nullable(s.lazy(() => piiBlockSeverity2Schema)), PiiBlockSeverity2.Any),
  piiEngine: s.defaulted(s.nullable(s.lazy(() => piiEngine2Schema)), PiiEngine2.Standard),
  responseProfile: s.optionalNullable(s.lazy(() => responseProfile2Schema)),
  segmentFilter: s.optionalNullable(s.string()),
  segmentProcessing: s.optional(s.record(s.string(), s.unknown())),
  segmentTypeNaming: s.optionalNullable(s.lazy(() => segmentTypeNaming1Schema)),
  useHighResolution: s.defaulted(s.nullable(s.boolean()), false),
  validateSegments: s.optionalNullable(s.array(s.lazy(() => segmentTypeSchema))),
  validateTableSegments: s.optionalNullable(s.boolean()),
  xmlCitation: s.optionalNullable(s.boolean()),
  _keysMap: {
    agenticOcr: "agentic_ocr",
    chunkProcessing: "chunk_processing",
    detectPii: "detect_pii",
    enhanceReadingOrder: "enhance_reading_order",
    errorHandling: "error_handling",
    expiresIn: "expires_in",
    exportFormat: "export_format",
    extractColors: "extract_colors",
    extractLinks: "extract_links",
    extractStrikethrough: "extract_strikethrough",
    fileName: "file_name",
    layoutAnalysis: "layout_analysis",
    segmentationVersion: "segmentation_version",
    llmProcessing: "llm_processing",
    mergeBatchSize: "merge_batch_size",
    mergeTables: "merge_tables",
    ocrEngine: "ocr_engine",
    ocrStrategy: "ocr_strategy",
    outputFields: "output_fields",
    pageRange: "page_range",
    piiBlockSeverity: "pii_block_severity",
    piiEngine: "pii_engine",
    responseProfile: "response_profile",
    segmentFilter: "segment_filter",
    segmentProcessing: "segment_processing",
    segmentTypeNaming: "segment_type_naming",
    useHighResolution: "use_high_resolution",
    validateSegments: "validate_segments",
    validateTableSegments: "validate_table_segments",
    xmlCitation: "xml_citation",
  },
});
