import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { FileInput } from "../core/binary.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { detailErrorSchema, type DetailError } from "../models/detail-error.js";
import { errorEnvelopeSchema, type ErrorEnvelope } from "../models/error-envelope.js";
import { extractionJobSchema, type ExtractionJob } from "../models/extraction-job.js";
import { Model1, model1Schema } from "../models/model1.js";
import { PiiBlockSeverity4, piiBlockSeverity4Schema } from "../models/pii-block-severity4.js";
import { PiiEngine4, piiEngine4Schema } from "../models/pii-engine4.js";
import { schemaNameSchema, type SchemaName } from "../models/unions/schema-name.js";
import { v2ExtractResponseSchema, type V2ExtractResponse } from "../models/unions/v2-extract-response.js";
import type { Servers } from "../servers.js";

export class Extract {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Extract Data
   *
   * @remarks
   * Extract structured data from PDF documents using custom schemas with vision-language models.
   * Supports multiple model tiers, optional bounding box citations, and intelligent page selection
   * for large documents.
   *
   * @returns Job accepted, or PII-blocked (check `status` / `blocked` before polling).
   *
   * @throws {@link Extract.ExtractDataError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  extractData(
    request: Extract.ExtractDataRequest,
    options?: RequestOptions,
  ): ApiPromise<V2ExtractResponse, Extract.ExtractDataError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/extract"),
        auth: this.#auth.apiKeyAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "multipart",
          value: [
            { kind: "text", name: "schema_data", value: request.schemaData, schema: s.string() },
            { kind: "file", name: "pdf_file", value: request.pdfFile },
            { kind: "text", name: "file_url", value: request.fileUrl, schema: s.optional(s.string()) },
            {
              kind: "text",
              name: "model",
              value: request.model,
              schema: s.defaulted(model1Schema, Model1.Gamma),
            },
            {
              kind: "text",
              name: "enable_citations",
              value: request.enableCitations,
              schema: s.defaulted(s.boolean(), false),
            },
            {
              kind: "text",
              name: "high_accuracy_mode",
              value: request.highAccuracyMode,
              schema: s.defaulted(s.boolean(), false),
            },
            {
              kind: "text",
              name: "schema_name",
              value: request.schemaName,
              schema: s.optional(s.lazy(() => schemaNameSchema)),
            },
            {
              kind: "text",
              name: "detect_pii",
              value: request.detectPii,
              schema: s.defaulted(s.boolean(), false),
            },
            {
              kind: "text",
              name: "pii_engine",
              value: request.piiEngine,
              schema: s.defaulted(piiEngine4Schema, PiiEngine4.Standard),
            },
            {
              kind: "text",
              name: "pii_block_severity",
              value: request.piiBlockSeverity,
              schema: s.defaulted(piiBlockSeverity4Schema, PiiBlockSeverity4.High),
            },
          ],
        },
      },
      {
        success: { kind: "json", schema: v2ExtractResponseSchema },
        errorFactory: Extract.ExtractDataError,
      },
      options,
    );
  }

  /**
   * Get Extraction Job Status
   *
   * @remarks
   * Check the status and retrieve results of extraction jobs
   *
   * @returns Extraction job status and results retrieved successfully
   *
   * @throws {@link Extract.GetExtractionJobStatusError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  getExtractionJobStatus(
    request: Extract.GetExtractionJobStatusRequest,
    options?: RequestOptions,
  ): ApiPromise<ExtractionJob, Extract.GetExtractionJobStatusError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/extract/{job_id}"),
        auth: this.#auth.apiKeyAuth,
        pathParams: [{ name: "job_id", value: request.jobId, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: extractionJobSchema },
        errorFactory: Extract.GetExtractionJobStatusError,
      },
      options,
    );
  }
}

export namespace Extract {
  export type ExtractDataRequest = {
    /**
     * JSON schema defining the structure and fields to extract from the document. Example:
     * {"type":"object","properties":{"invoice_number":{"type":"string","description":"The invoice
     * number"}},"required":["invoice_number"],"additionalProperties":false}
     */
    schemaData: string;
    /**
     * The PDF file to process for data extraction. Maximum file size: 500MB. Either pdf_file or
     * file_url must be provided.
     */
    pdfFile?: FileInput;
    /** URL to a PDF file to process. Either pdf_file or file_url must be provided. */
    fileUrl?: string;
    /**
     * Model tier to use for extraction. Options: alpha, beta, gamma (default, recommended), delta
     *
     * @default Model1.Gamma
     */
    model?: Model1;
    /** Return bounding box coordinates for extracted values @default false */
    enableCitations?: boolean;
    /**
     * Enable an agentic verification and validation layer for higher accuracy/consistency.
     * Extracted values are independently cross-checked against the document and uncertain fields
     * are re-verified and reconciled before the result is returned. Slower. Off by default; set
     * true to enable per request.
     *
     * @default false
     */
    highAccuracyMode?: boolean;
    /** Optional name identifying the schema, stored with the job for traceability. */
    schemaName?: SchemaName;
    /**
     * Run a pre-flight PII check before extraction. If PII is found at or above pii_block_severity,
     * no extraction job is created and the endpoint returns HTTP 200 with "status": "pii_blocked"
     * and "blocked": true in the body.
     *
     * @default false
     */
    detectPii?: boolean;
    /**
     * PII detection engine: 'standard' (default) or 'advanced' (higher precision).
     *
     * @default PiiEngine4.Standard
     */
    piiEngine?: PiiEngine4;
    /**
     * Severity threshold that blocks extraction when detect_pii is enabled: 'any', 'low', 'medium',
     * or 'high'.
     *
     * @default PiiBlockSeverity4.High
     */
    piiBlockSeverity?: PiiBlockSeverity4;
  };

  export class ExtractDataError extends ResponseError<
    | Declared<"detailError", DetailError>
    | Declared<"detailError2", DetailError>
    | Declared<"detailError3", DetailError>
    | Declared<"detailError4", DetailError>
    | Declared<"detailError5", DetailError>
    | Declared<"detailError6", DetailError>
    | Declared<"detailError7", DetailError>
    | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<ExtractDataError> = [
      { on: 400, kind: "detailError", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 401, kind: "detailError2", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 402, kind: "detailError3", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 413, kind: "detailError4", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 422, kind: "detailError5", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 429, kind: "detailError6", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 500, kind: "detailError7", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }

  export type GetExtractionJobStatusRequest = {
    /** The unique identifier of the extraction job */
    jobId: string;
  };

  export class GetExtractionJobStatusError extends ResponseError<
    Declared<"detailError", DetailError> | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<GetExtractionJobStatusError> = [
      { on: 404, kind: "detailError", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }
}
