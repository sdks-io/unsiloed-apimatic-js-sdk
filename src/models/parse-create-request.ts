import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { agenticOcrSchema, type AgenticOcr } from "./agentic-ocr.js";
import { ErrorHandling, errorHandlingSchema } from "./error-handling.js";
import { exportFormatSchema, type ExportFormat } from "./export-format.js";
import { LayoutAnalysis, layoutAnalysisSchema } from "./layout-analysis.js";
import { OcrStrategy1, ocrStrategy1Schema } from "./ocr-strategy1.js";
import { responseProfile1Schema, type ResponseProfile1 } from "./response-profile1.js";
import { SegmentTypeNaming, segmentTypeNamingSchema } from "./segment-type-naming.js";
import { segmentationVersion1Schema, type SegmentationVersion1 } from "./segmentation-version1.js";

/**
 * Request body for `POST /parse` (multipart/form-data).
 *
 * Provide either `file` (binary upload) or `url` (presigned/public URL) — not both.
 */
export type ParseCreateRequest = {
  /** Enable per-segment agentic OCR for higher accuracy. Pass `"standard"` or `"advanced"`. */
  agenticOcr?: AgenticOcr | null;
  /** JSON object for chunk processing configuration. */
  chunkProcessing?: string | null;
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
   *
   * @default false
   */
  enhanceReadingOrder?: boolean | null;
  /**
   * Error handling strategy for non-critical processing errors. `Continue` (default) — proceed
   * despite errors (e.g., LLM refusals). `Fail` — stop and fail the task on any error.
   *
   * @default ErrorHandling.Continue
   */
  errorHandling?: ErrorHandling | null;
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
   * Transfer text color from the PDF text layer to OCR results. Defaults to `false`.
   *
   * @default false
   */
  extractColors?: boolean | null;
  /**
   * Attach hyperlink URLs from PDF annotations to OCR results. Defaults to `false`.
   *
   * @default false
   */
  extractLinks?: boolean | null;
  /**
   * Preserve strikethrough formatting in HTML/Markdown output. Defaults to `false`.
   *
   * @default false
   */
  extractStrikethrough?: boolean | null;
  /**
   * Layout analysis strategy. `smart_layout_detection` (default) — detects layout elements using
   * bounding boxes. `page_by_page` — treats each page as a single segment; faster for simple
   * documents. `advanced_layout_detection` — higher-accuracy layout detection for complex pages
   * (multi-column layouts, dense tables/figures); slower than `smart_layout_detection`.
   *
   * @default LayoutAnalysis.SmartLayoutDetection
   */
  layoutAnalysis?: LayoutAnalysis | null;
  /**
   * Segmentation model version: `v1` (default) or `v2`. `v2` is form-aware and additionally returns
   * `KeyValuePair`, `Signature`, and `Seal` segments. Unrecognized values fall back to `v1`.
   */
  segmentationVersion?: SegmentationVersion1 | null;
  /** JSON object for LLM processing configuration. */
  llmProcessing?: string | null;
  /**
   * Maximum number of tables per merge group when `merge_tables` is enabled. Groups larger than
   * this are split into separate merges. Defaults to `20`.
   *
   * @default 20
   */
  mergeBatchSize?: number | null;
  /**
   * Merge tables that span multiple pages into a single unified structure. Defaults to `false`.
   *
   * @default false
   */
  mergeTables?: boolean | null;
  /**
   * OCR engine to use for text recognition. `UnsiloedHawk` (default) - higher accuracy, better for
   * complex layouts. `UnsiloedBeta` - handles irregular bounding boxes, rotated/warped text.
   * `UnsiloedStorm` - enterprise-grade accuracy, optimized for 50+ languages.
   *
   * @default "UnsiloedHawk"
   */
  ocrEngine?: string | null;
  /**
   * OCR strategy. `auto_detection` (default) — applies OCR only where needed. `force_ocr` — applies
   * OCR to all content regardless of existing text layer.
   *
   * @default OcrStrategy1.AutoDetection
   */
  ocrStrategy?: OcrStrategy1 | null;
  /**
   * JSON object filtering which fields appear on each segment / chunk. Each key defaults to `true`;
   * set a key to `false` to drop the field. Keys: `bbox`, `chart_data`, `confidence`, `content`,
   * `embed`, `html`, `image`, `markdown`, `ocr`. Example: `{"html": false, "ocr": false}`. Ignored
   * when `response_profile` is `slim` or `full`.
   */
  outputFields?: string | null;
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
   * @default "any"
   */
  piiBlockSeverity?: string | null;
  /**
   * PII detector engine to use when `detect_pii` is `true`. Ignored otherwise.
   * - `standard` (default) — fast pattern-based detector; low latency, well-suited to bulk
   *   pre-screening.
   * - `advanced` — model-based detector; slower but catches contextual cases that pattern matching
   *   misses (e.g. handwritten names, partially redacted IDs, document-style references to a
   *   person).
   *
   * @default "standard"
   */
  piiEngine?: string | null;
  /**
   * Response shape selector: `slim`, `full`, or `custom`.
   * - `slim`: chunk `embed` + bbox + page_number + segment_id + segment_type + HTML for tables /
   *   Markdown for everything else. Drops `content`, `image`, `ocr`, `confidence`, `chart_data`,
   *   `page_height`, `page_width`.
   * - `full`: every field returned (equivalent to omitting this param).
   * - `custom`: honor `output_fields` verbatim.
   *
   * Precedence: when both `response_profile` and `output_fields` are provided, the profile wins
   * (`output_fields` only matters for `custom` or when the profile is omitted).
   *
   * Applies to inline JSON responses only — `GET /parse/{job_id}?output_file=true` returns a
   * presigned URL to the stored full-shape output file.
   */
  responseProfile?: ResponseProfile1 | null;
  /**
   * JSON object controlling HTML/Markdown generation strategy and AI model per segment type.
   * Example: `{"Table": {"html": "VLM", "markdown": "VLM", "model_id": "us_table_v2"}}`.
   */
  segmentAnalysis?: string | null;
  /**
   * Content filter: comma-separated segment types to keep. Example: `"table,picture"`. Use `"all"`
   * to include everything. Defaults to `"all"`.
   *
   * @default "all"
   */
  segmentFilter?: string | null;
  /**
   * Alias for `segment_analysis` (Core Parser name). If both are provided, this takes precedence.
   */
  segmentProcessing?: string | null;
  /**
   * Segment type naming convention. `Unsiloed` (default) — e.g., `PageHeader`, `ListItem`,
   * `Picture`. `Other` — alternative names e.g., `Header`, `List Item`, `Figure`.
   *
   * @default SegmentTypeNaming.Unsiloed
   */
  segmentTypeNaming?: SegmentTypeNaming | null;
  /**
   * Presigned or public URL of the document to fetch and process. JSON and form-urlencoded callers
   * must use `url`.
   */
  url: string;
  /**
   * Use high-resolution images for cropping and post-processing. Latency penalty: ~2–3 s per page.
   * Defaults to `false`.
   *
   * @default false
   */
  useHighResolution?: boolean | null;
  /**
   * JSON array string of segment types to validate with VLM. Example: `["Table", "Formula",
   * "Picture"]`. Defaults to `["Table", "Picture"]`; an empty or unparseable value also falls back
   * to that default.
   */
  validateSegments?: string | null;
  /**
   * Legacy: validate table segment classifications using VLM. Prefer `validate_segments: ["Table"]`
   * instead. Defaults to `false`.
   *
   * @default false
   */
  validateTableSegments?: boolean | null;
  /**
   * Extract and hyperlink bibliography citations in the markdown output. PDFs only. Defaults to
   * `false`.
   *
   * @default false
   */
  xmlCitation?: boolean | null;
};

export const parseCreateRequestSchema: Schema<ParseCreateRequest> = s.object<ParseCreateRequest>({
  agenticOcr: s.optionalNullable(s.lazy(() => agenticOcrSchema)),
  chunkProcessing: s.optionalNullable(s.string()),
  detectPii: s.defaulted(s.nullable(s.boolean()), false),
  enhanceReadingOrder: s.defaulted(s.nullable(s.boolean()), false),
  errorHandling: s.defaulted(s.nullable(s.lazy(() => errorHandlingSchema)), ErrorHandling.Continue),
  expiresIn: s.optionalNullable(s.number()),
  exportFormat: s.optionalNullable(s.array(s.lazy(() => exportFormatSchema))),
  extractColors: s.defaulted(s.nullable(s.boolean()), false),
  extractLinks: s.defaulted(s.nullable(s.boolean()), false),
  extractStrikethrough: s.defaulted(s.nullable(s.boolean()), false),
  layoutAnalysis: s.defaulted(
    s.nullable(s.lazy(() => layoutAnalysisSchema)),
    LayoutAnalysis.SmartLayoutDetection,
  ),
  segmentationVersion: s.optionalNullable(s.lazy(() => segmentationVersion1Schema)),
  llmProcessing: s.optionalNullable(s.string()),
  mergeBatchSize: s.defaulted(s.nullable(s.number()), 20),
  mergeTables: s.defaulted(s.nullable(s.boolean()), false),
  ocrEngine: s.defaulted(s.nullable(s.string()), "UnsiloedHawk"),
  ocrStrategy: s.defaulted(s.nullable(s.lazy(() => ocrStrategy1Schema)), OcrStrategy1.AutoDetection),
  outputFields: s.optionalNullable(s.string()),
  pageRange: s.optionalNullable(s.string()),
  piiBlockSeverity: s.defaulted(s.nullable(s.string()), "any"),
  piiEngine: s.defaulted(s.nullable(s.string()), "standard"),
  responseProfile: s.optionalNullable(s.lazy(() => responseProfile1Schema)),
  segmentAnalysis: s.optionalNullable(s.string()),
  segmentFilter: s.defaulted(s.nullable(s.string()), "all"),
  segmentProcessing: s.optionalNullable(s.string()),
  segmentTypeNaming: s.defaulted(
    s.nullable(s.lazy(() => segmentTypeNamingSchema)),
    SegmentTypeNaming.Unsiloed,
  ),
  url: s.string(),
  useHighResolution: s.defaulted(s.nullable(s.boolean()), false),
  validateSegments: s.optionalNullable(s.string()),
  validateTableSegments: s.defaulted(s.nullable(s.boolean()), false),
  xmlCitation: s.defaulted(s.nullable(s.boolean()), false),
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
    segmentAnalysis: "segment_analysis",
    segmentFilter: "segment_filter",
    segmentProcessing: "segment_processing",
    segmentTypeNaming: "segment_type_naming",
    useHighResolution: "use_high_resolution",
    validateSegments: "validate_segments",
    validateTableSegments: "validate_table_segments",
    xmlCitation: "xml_citation",
  },
});
