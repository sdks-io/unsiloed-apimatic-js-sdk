import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { FileInput } from "../core/binary.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { agenticOcr2Schema, type AgenticOcr2 } from "../models/agentic-ocr2.js";
import { errorEnvelopeSchema, type ErrorEnvelope } from "../models/error-envelope.js";
import { ErrorHandling2, errorHandling2Schema } from "../models/error-handling2.js";
import { fileTooLargeErrorSchema, type FileTooLargeError } from "../models/file-too-large-error.js";
import {
  insufficientQuotaErrorSchema,
  type InsufficientQuotaError,
} from "../models/insufficient-quota-error.js";
import { LayoutAnalysis2, layoutAnalysis2Schema } from "../models/layout-analysis2.js";
import { OcrStrategy3, ocrStrategy3Schema } from "../models/ocr-strategy3.js";
import { parseCreateResponseSchema, type ParseCreateResponse } from "../models/parse-create-response.js";
import { parseGetResponseSchema, type ParseGetResponse } from "../models/parse-get-response.js";
import { PiiBlockSeverity1, piiBlockSeverity1Schema } from "../models/pii-block-severity1.js";
import { PiiEngine1, piiEngine1Schema } from "../models/pii-engine1.js";
import { rateLimitErrorSchema, type RateLimitError } from "../models/rate-limit-error.js";
import { responseProfile3Schema, type ResponseProfile3 } from "../models/response-profile3.js";
import { SegmentTypeNaming2, segmentTypeNaming2Schema } from "../models/segment-type-naming2.js";
import { SegmentationVersion3, segmentationVersion3Schema } from "../models/segmentation-version3.js";
import { TableClustering, tableClusteringSchema } from "../models/table-clustering.js";
import type { Servers } from "../servers.js";

/**
 * Vision-API compatible endpoints for parsing - accepts multipart form data with Vision-API
 * parameter names
 */
export class ParseVisionApiCompatible {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Create Parse Task
   *
   * @remarks
   * Create a document processing task. Accepts two request shapes at the same path, chosen by
   * `Content-Type`:
   * - `multipart/form-data` — binary file upload (`file` field) or a `url` field.
   * - `application/json` (or `application/x-www-form-urlencoded`) — JSON body with a required `url`
   *   field; the `file` field is not applicable.
   *
   * Every other configuration field is accepted under both content types and behaves identically.
   *
   * @returns Job created — poll with GET /parse/{job_id} to retrieve results.
   *
   * @throws {@link ParseVisionApiCompatible.CreateParseTaskError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  createParseTask(
    request: ParseVisionApiCompatible.CreateParseTaskRequest,
    options?: RequestOptions,
  ): ApiPromise<ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/parse"),
        auth: this.#auth.apiKeyAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "multipart",
          value: [
            {
              kind: "text",
              name: "agentic_ocr",
              value: request.agenticOcr,
              schema: s.optionalNullable(s.lazy(() => agenticOcr2Schema)),
            },
            {
              kind: "text",
              name: "chunk_processing",
              value: request.chunkProcessing,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "enhance_reading_order",
              value: request.enhanceReadingOrder,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "error_handling",
              value: request.errorHandling,
              schema: s.defaulted(s.nullable(s.lazy(() => errorHandling2Schema)), ErrorHandling2.Continue),
            },
            {
              kind: "text",
              name: "expires_in",
              value: request.expiresIn,
              schema: s.optionalNullable(s.number()),
            },
            {
              kind: "text",
              name: "export_format",
              value: request.exportFormat,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "extract_colors",
              value: request.extractColors,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "extract_links",
              value: request.extractLinks,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "extract_strikethrough",
              value: request.extractStrikethrough,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            { kind: "file", name: "file", value: request.file },
            {
              kind: "text",
              name: "layout_analysis",
              value: request.layoutAnalysis,
              schema: s.defaulted(
                s.nullable(s.lazy(() => layoutAnalysis2Schema)),
                LayoutAnalysis2.SmartLayoutDetection,
              ),
            },
            {
              kind: "text",
              name: "segmentation_version",
              value: request.segmentationVersion,
              schema: s.defaulted(segmentationVersion3Schema, SegmentationVersion3.V1),
            },
            {
              kind: "text",
              name: "llm_processing",
              value: request.llmProcessing,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "merge_tables",
              value: request.mergeTables,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "ocr_engine",
              value: request.ocrEngine,
              schema: s.defaulted(s.nullable(s.string()), "UnsiloedHawk"),
            },
            {
              kind: "text",
              name: "ocr_strategy",
              value: request.ocrStrategy,
              schema: s.defaulted(s.nullable(s.lazy(() => ocrStrategy3Schema)), OcrStrategy3.AutoDetection),
            },
            {
              kind: "text",
              name: "output_fields",
              value: request.outputFields,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "page_range",
              value: request.pageRange,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "segment_analysis",
              value: request.segmentAnalysis,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "segment_filter",
              value: request.segmentFilter,
              schema: s.defaulted(s.nullable(s.string()), "all"),
            },
            {
              kind: "text",
              name: "segment_processing",
              value: request.segmentProcessing,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "segment_type_naming",
              value: request.segmentTypeNaming,
              schema: s.defaulted(
                s.nullable(s.lazy(() => segmentTypeNaming2Schema)),
                SegmentTypeNaming2.Unsiloed,
              ),
            },
            { kind: "text", name: "url", value: request.url, schema: s.optionalNullable(s.string()) },
            {
              kind: "text",
              name: "use_high_resolution",
              value: request.useHighResolution,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "validate_segments",
              value: request.validateSegments,
              schema: s.optionalNullable(s.string()),
            },
            {
              kind: "text",
              name: "validate_table_segments",
              value: request.validateTableSegments,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "xml_citation",
              value: request.xmlCitation,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "merge_batch_size",
              value: request.mergeBatchSize,
              schema: s.defaulted(s.nullable(s.number()), 20),
            },
            {
              kind: "text",
              name: "detect_pii",
              value: request.detectPii,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "pii_block_severity",
              value: request.piiBlockSeverity,
              schema: s.defaulted(s.nullable(s.lazy(() => piiBlockSeverity1Schema)), PiiBlockSeverity1.Any),
            },
            {
              kind: "text",
              name: "pii_engine",
              value: request.piiEngine,
              schema: s.defaulted(s.nullable(s.lazy(() => piiEngine1Schema)), PiiEngine1.Standard),
            },
            {
              kind: "text",
              name: "response_profile",
              value: request.responseProfile,
              schema: s.optionalNullable(s.lazy(() => responseProfile3Schema)),
            },
          ],
        },
      },
      {
        success: { kind: "json", schema: parseCreateResponseSchema },
        errorFactory: ParseVisionApiCompatible.CreateParseTaskError,
      },
      options,
    );
  }

  /**
   * Create Excel Parse Task
   *
   * @remarks
   * Dedicated Excel (.xls/.xlsx) ingestion endpoint. Shares all auth, billing, quota, and
   * rate-limit infrastructure with `POST /parse`, and is polled via the same `GET /parse/{job_id}`.
   * Non-Excel uploads are rejected with a 400; submit those to `POST /parse` instead.
   *
   * Accepts two request shapes at the same path, chosen by `Content-Type`:
   * - `multipart/form-data` — binary `.xls`/`.xlsx` upload (`file` field) or a `url` field.
   * - `application/json` (or `application/x-www-form-urlencoded`) — JSON body with a required `url`
   *   field; the `file` field is not applicable.
   *
   * @returns Job created — poll with GET /parse/{job_id} to retrieve results.
   *
   * @throws {@link ParseVisionApiCompatible.CreateParseTaskExcelError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  createParseTaskExcel(
    request: ParseVisionApiCompatible.CreateParseTaskExcelRequest,
    options?: RequestOptions,
  ): ApiPromise<ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskExcelError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/parse/excel"),
        auth: this.#auth.apiKeyAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "multipart",
          value: [
            {
              kind: "text",
              name: "exclude_hidden",
              value: request.excludeHidden,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "exclude_hidden_cols",
              value: request.excludeHiddenCols,
              schema: s.defaulted(s.nullable(s.boolean()), true),
            },
            {
              kind: "text",
              name: "exclude_hidden_rows",
              value: request.excludeHiddenRows,
              schema: s.defaulted(s.nullable(s.boolean()), true),
            },
            {
              kind: "text",
              name: "exclude_hidden_sheets",
              value: request.excludeHiddenSheets,
              schema: s.defaulted(s.nullable(s.boolean()), true),
            },
            {
              kind: "text",
              name: "exclude_images",
              value: request.excludeImages,
              schema: s.defaulted(s.nullable(s.boolean()), false),
            },
            {
              kind: "text",
              name: "exclude_styling",
              value: request.excludeStyling,
              schema: s.defaulted(s.nullable(s.boolean()), true),
            },
            {
              kind: "text",
              name: "expires_in",
              value: request.expiresIn,
              schema: s.optionalNullable(s.number()),
            },
            { kind: "file", name: "file", value: request.file },
            {
              kind: "text",
              name: "max_rows_per_segment",
              value: request.maxRowsPerSegment,
              schema: s.defaulted(s.nullable(s.number()), 50),
            },
            {
              kind: "text",
              name: "split_large_tables",
              value: request.splitLargeTables,
              schema: s.defaulted(s.nullable(s.boolean()), true),
            },
            {
              kind: "text",
              name: "table_clustering",
              value: request.tableClustering,
              schema: s.defaulted(s.nullable(s.lazy(() => tableClusteringSchema)), TableClustering.Accurate),
            },
            { kind: "text", name: "url", value: request.url, schema: s.optionalNullable(s.string()) },
          ],
        },
      },
      {
        success: { kind: "json", schema: parseCreateResponseSchema },
        errorFactory: ParseVisionApiCompatible.CreateParseTaskExcelError,
      },
      options,
    );
  }

  /**
   * Get Parse Task
   *
   * @remarks
   * Get the status and results of a processing task. Returns task information in Vision-API
   * compatible format.
   *
   * @returns Job status and results. `total_chunks` is `0` and `chunks` is empty until the job
   * succeeds; `page_count` is populated once the job reaches `Processing`.
   *
   * @throws {@link ParseVisionApiCompatible.GetParseTaskError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  getParseTask(
    request: ParseVisionApiCompatible.GetParseTaskRequest,
    options?: RequestOptions,
  ): ApiPromise<ParseGetResponse, ParseVisionApiCompatible.GetParseTaskError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/parse/{job_id}"),
        auth: this.#auth.apiKeyAuth,
        pathParams: [{ name: "job_id", value: request.jobId, schema: s.string() }],
        query: [
          { name: "include_chunks", value: request.includeChunks, schema: s.optional(s.boolean()) },
          { name: "base64_urls", value: request.base64Urls, schema: s.optional(s.boolean()) },
          { name: "output_file", value: request.outputFile, schema: s.optional(s.boolean()) },
          { name: "enhanced_table", value: request.enhancedTable, schema: s.optional(s.boolean()) },
          { name: "merge_tables", value: request.mergeTables, schema: s.optional(s.boolean()) },
          { name: "include_url", value: request.includeUrl, schema: s.optional(s.boolean()) },
          { name: "segment_filter", value: request.segmentFilter, schema: s.optional(s.string()) },
        ],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: parseGetResponseSchema },
        errorFactory: ParseVisionApiCompatible.GetParseTaskError,
      },
      options,
    );
  }
}

export namespace ParseVisionApiCompatible {
  export type CreateParseTaskRequest = {
    /** Enable per-segment agentic OCR for higher accuracy. Pass `"standard"` or `"advanced"`. */
    agenticOcr?: AgenticOcr2 | null;
    /** JSON object for chunk processing configuration. */
    chunkProcessing?: string | null;
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
     * @default ErrorHandling2.Continue
     */
    errorHandling?: ErrorHandling2 | null;
    /**
     * Reserved field. Persisted in the task configuration but currently has no effect on retention
     * for this endpoint — `POST /parse` (multipart and JSON/Form) does not set the task's
     * `expires_at` column, and the cleanup job only deletes `AwaitingUpload` rows past their
     * `expires_at`. To get a presigned-upload TTL, use `POST /v2/parse/upload` instead, where
     * `expires_in` controls the upload URL's validity.
     */
    expiresIn?: number | null;
    /**
     * Export format(s) to generate after parsing: `docx`, `markdown`, `json`. The files are
     * returned as presigned URLs in the `exports` field of `GET /parse/{job_id}`. In multipart/form
     * requests send a JSON-encoded array string such as `["docx"]`, not a repeated field.
     */
    exportFormat?: string | null;
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
     * Document file to process (multipart only). Required if `url` is not provided. Supported
     * formats: PDF, PNG, JPEG, TIFF, PPT, PPTX, DOC, DOCX. Use `POST /parse/excel` for XLS and
     * XLSX; Excel files sent here return 400 `excel_not_supported_here`. Maximum upload size: 500
     * MB by default.
     */
    file?: FileInput;
    /**
     * Layout analysis strategy. `smart_layout_detection` (default) — detects layout elements using
     * bounding boxes. `page_by_page` — treats each page as a single segment; faster for simple
     * documents, or `advanced_layout_detection` (VLM-based exhaustive segmentation with 14 element
     * types).
     *
     * @default LayoutAnalysis2.SmartLayoutDetection
     */
    layoutAnalysis?: LayoutAnalysis2 | null;
    /**
     * Segmentation model version: `v1` (default) or `v2`. `v2` is form-aware and additionally
     * returns `KeyValuePair`, `Signature`, and `Seal` segments. Unrecognized values fall back to
     * `v1`.
     *
     * @default SegmentationVersion3.V1
     */
    segmentationVersion?: SegmentationVersion3;
    /** JSON object for LLM processing configuration. */
    llmProcessing?: string | null;
    /**
     * Merge tables that span multiple pages into a single unified structure. Defaults to `false`.
     *
     * @default false
     */
    mergeTables?: boolean | null;
    /**
     * OCR engine to use for text recognition. `UnsiloedHawk` (default) - higher accuracy, better
     * for complex layouts. `UnsiloedBeta` - handles irregular bounding boxes, rotated/warped text.
     * `UnsiloedStorm` - enterprise-grade accuracy, optimized for 50+ languages.
     *
     * @default "UnsiloedHawk"
     */
    ocrEngine?: string | null;
    /**
     * OCR strategy. `auto_detection` (default) — applies OCR only where needed. `force_ocr` —
     * applies OCR to all content regardless of existing text layer.
     *
     * @default OcrStrategy3.AutoDetection
     */
    ocrStrategy?: OcrStrategy3 | null;
    /**
     * JSON object controlling which output fields are included in the response. Example: `{"html":
     * false, "markdown": true, "ocr": false}`. All fields default to `true`.
     */
    outputFields?: string | null;
    /** Page range to process. Formats: `"1-5"`, `"2,4,6"`, `"[1,3,5]"`. Defaults to all pages. */
    pageRange?: string | null;
    /**
     * JSON object controlling HTML/Markdown generation strategy and AI model per segment type.
     * Example: `{"Table": {"html": "VLM", "markdown": "VLM", "model_id": "us_table_v2"}}`.
     */
    segmentAnalysis?: string | null;
    /**
     * Content filter: comma-separated segment types to keep. Example: `"table,picture"`. Use
     * `"all"` to include everything. Defaults to `"all"`.
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
     * @default SegmentTypeNaming2.Unsiloed
     */
    segmentTypeNaming?: SegmentTypeNaming2 | null;
    /**
     * Presigned or public URL of the document to fetch and process. Required if `file` is not
     * provided.
     */
    url?: string | null;
    /**
     * Use high-resolution images for cropping and post-processing. Latency penalty: ~2–3 s per
     * page. Defaults to `false`.
     *
     * @default false
     */
    useHighResolution?: boolean | null;
    /**
     * JSON array string of segment types to validate with VLM. Example: `["Table", "Formula",
     * "Picture"]`. Defaults to `["Table", "Picture"]`; an empty or unparseable value also falls
     * back to that default.
     */
    validateSegments?: string | null;
    /**
     * Legacy: validate table segment classifications using VLM. Prefer `validate_segments:
     * ["Table"]` instead. Defaults to `false`.
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
    /**
     * Maximum number of tables per merge group when merge_tables is enabled. Groups larger than
     * this are split. Defaults to 20.
     *
     * @default 20
     */
    mergeBatchSize?: number | null;
    /**
     * Run a PII detection pass before parsing. If PII is found at or above pii_block_severity, the
     * task is rejected and no parsing occurs. Defaults to false.
     *
     * @default false
     */
    detectPii?: boolean | null;
    /**
     * Severity threshold at which the task is rejected when detect_pii is enabled: any (default),
     * low, medium, or high. Ignored if detect_pii is false.
     *
     * @default PiiBlockSeverity1.Any
     */
    piiBlockSeverity?: PiiBlockSeverity1 | null;
    /**
     * PII detection engine: standard (default) or advanced (higher precision). Any other value
     * falls back to standard. Ignored if detect_pii is false.
     *
     * @default PiiEngine1.Standard
     */
    piiEngine?: PiiEngine1 | null;
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
    responseProfile?: ResponseProfile3 | null;
  };

  export class CreateParseTaskError extends ResponseError<
    | Declared<"error400", string>
    | Declared<"error401", undefined>
    | Declared<"insufficientQuotaError", InsufficientQuotaError>
    | Declared<"error403", undefined>
    | Declared<"fileTooLargeError", FileTooLargeError>
    | Declared<"rateLimitError", RateLimitError>
    | Declared<"error500", string>
    | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<CreateParseTaskError> = [
      { on: 400, kind: "error400", decode: { kind: "text", schema: s.string() } },
      { on: 401, kind: "error401", decode: { kind: "empty" } },
      {
        on: 402,
        kind: "insufficientQuotaError",
        decode: { kind: "json", schema: insufficientQuotaErrorSchema },
      },
      { on: 403, kind: "error403", decode: { kind: "empty" } },
      { on: 413, kind: "fileTooLargeError", decode: { kind: "json", schema: fileTooLargeErrorSchema } },
      { on: 429, kind: "rateLimitError", decode: { kind: "json", schema: rateLimitErrorSchema } },
      { on: 500, kind: "error500", decode: { kind: "text", schema: s.string() } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }

  export type CreateParseTaskExcelRequest = {
    /** Drop hidden sheets/rows/cols/styling from the output. Defaults to `false`. @default false */
    excludeHidden?: boolean | null;
    /**
     * When excluding hidden content, also drop hidden columns. Defaults to `true`.
     *
     * @default true
     */
    excludeHiddenCols?: boolean | null;
    /** When excluding hidden content, also drop hidden rows. Defaults to `true`. @default true */
    excludeHiddenRows?: boolean | null;
    /** When excluding hidden content, also drop hidden sheets. Defaults to `true`. @default true */
    excludeHiddenSheets?: boolean | null;
    /**
     * When excluding hidden content, also drop embedded/pasted images. Defaults to `false`.
     *
     * @default false
     */
    excludeImages?: boolean | null;
    /** When excluding hidden content, also drop styling. Defaults to `true`. @default true */
    excludeStyling?: boolean | null;
    /**
     * Reserved field. Persisted in the task configuration but currently has no effect on retention
     * — Excel tasks use the same `Task::new_fast` creation path as `POST /parse`, which does not
     * set the task's `expires_at` column. See the same note on `ParseCreateRequest.expires_in`.
     */
    expiresIn?: number | null;
    /** Excel workbook to process. Required if `url` is not provided. Supported: XLS, XLSX. */
    file?: FileInput;
    /** Max rows per split segment when `split_large_tables`. Defaults to `50`. @default 50 */
    maxRowsPerSegment?: number | null;
    /** Split large tables into smaller segments. Defaults to `true`. @default true */
    splitLargeTables?: boolean | null;
    /**
     * Table clustering effort: `accurate` (default), `fast`, or `off`.
     *
     * @default TableClustering.Accurate
     */
    tableClustering?: TableClustering | null;
    /** Presigned or public URL of the workbook to fetch. Required if `file` is not provided. */
    url?: string | null;
  };

  export class CreateParseTaskExcelError extends ResponseError<
    | Declared<"error400", string>
    | Declared<"error401", undefined>
    | Declared<"insufficientQuotaError", InsufficientQuotaError>
    | Declared<"error403", undefined>
    | Declared<"fileTooLargeError", FileTooLargeError>
    | Declared<"rateLimitError", RateLimitError>
    | Declared<"error500", string>
    | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<CreateParseTaskExcelError> = [
      { on: 400, kind: "error400", decode: { kind: "text", schema: s.string() } },
      { on: 401, kind: "error401", decode: { kind: "empty" } },
      {
        on: 402,
        kind: "insufficientQuotaError",
        decode: { kind: "json", schema: insufficientQuotaErrorSchema },
      },
      { on: 403, kind: "error403", decode: { kind: "empty" } },
      { on: 413, kind: "fileTooLargeError", decode: { kind: "json", schema: fileTooLargeErrorSchema } },
      { on: 429, kind: "rateLimitError", decode: { kind: "json", schema: rateLimitErrorSchema } },
      { on: 500, kind: "error500", decode: { kind: "text", schema: s.string() } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }

  export type GetParseTaskRequest = {
    /** Job ID returned by `POST /parse`. */
    jobId: string;
    /** Include the `chunks` array in the response. Defaults to `true`. */
    includeChunks?: boolean;
    /**
     * Return segment images as base64-encoded data URIs instead of S3 presigned URLs. Defaults to
     * `false`.
     */
    base64Urls?: boolean;
    /**
     * Return a presigned S3 URL to the raw output JSON file instead of inlining the full response
     * body. Also accepted as the `output-file` request header. Defaults to `false`.
     */
    outputFile?: boolean;
    /**
     * Apply enhanced table post-processing when assembling the response — improves cell-merge
     * accuracy and structure recovery for complex tables, at the cost of extra latency. Also
     * accepted as the `enhanced-table` request header. Defaults to `false`.
     */
    enhancedTable?: boolean;
    /**
     * Return the cached cross-page merged-table result, if the job was parsed with
     * `merge_tables=true`. No merging happens at read time; the job's own setting takes precedence.
     * Defaults to `false`.
     */
    mergeTables?: boolean;
    /**
     * Include file URLs (`pdf_url`, `file_url`, segment images, `configuration.input_file_url`) in
     * the response. When `false` (default) these fields are nulled. `exports` URLs are always
     * returned regardless of this setting.
     */
    includeUrl?: boolean;
    /**
     * Comma-separated segment types to keep in the response, e.g. `Table,Picture` (alias:
     * `keep_segment_types`).
     */
    segmentFilter?: string;
  };

  export class GetParseTaskError extends ResponseError<
    | Declared<"error401", string>
    | Declared<"error403", string>
    | Declared<"errorEnvelope", ErrorEnvelope>
    | Declared<"errorEnvelope2", ErrorEnvelope>
    | Declared<"errorEnvelope3", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<GetParseTaskError> = [
      { on: 401, kind: "error401", decode: { kind: "json", schema: s.string() } },
      { on: 403, kind: "error403", decode: { kind: "text", schema: s.string() } },
      { on: 404, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
      { on: 500, kind: "errorEnvelope2", decode: { kind: "json", schema: errorEnvelopeSchema } },
      { on: 503, kind: "errorEnvelope3", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }
}
