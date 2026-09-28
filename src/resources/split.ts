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
import { splitterResponseSchema, type SplitterResponse } from "../models/splitter-response.js";
import { splitterResponse1Schema, type SplitterResponse1 } from "../models/splitter-response1.js";
import { enableReorderingSchema, type EnableReordering } from "../models/unions/enable-reordering.js";
import type { Servers } from "../servers.js";

export class Split {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Get Split Status
   *
   * @remarks
   * Check the status and retrieve results of document splitting jobs
   *
   * @returns Split job status and results retrieved successfully
   *
   * @throws {@link Split.GetSplitStatusError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  getSplitStatus(
    request: Split.GetSplitStatusRequest,
    options?: RequestOptions,
  ): ApiPromise<SplitterResponse1, Split.GetSplitStatusError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/splitter/{job_id}"),
        auth: this.#auth.apiKeyAuth,
        pathParams: [{ name: "job_id", value: request.jobId, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: splitterResponse1Schema },
        errorFactory: Split.GetSplitStatusError,
      },
      options,
    );
  }

  /**
   * Split Document
   *
   * @remarks
   * Split PDF documents by classifying pages into categories
   *
   * @returns Split job created
   *
   * @throws {@link Split.SplitDocumentError} when the API answers with an error status — narrow on
   * `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  splitDocument(
    request: Split.SplitDocumentRequest,
    options?: RequestOptions,
  ): ApiPromise<SplitterResponse, Split.SplitDocumentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/splitter"),
        auth: this.#auth.apiKeyAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "multipart",
          value: [
            { kind: "text", name: "categories", value: request.categories, schema: s.string() },
            { kind: "file", name: "file", value: request.file },
            { kind: "text", name: "file_url", value: request.fileUrl, schema: s.optional(s.string()) },
            {
              kind: "text",
              name: "enable_reordering",
              value: request.enableReordering,
              schema: s.optional(s.lazy(() => enableReorderingSchema)),
            },
          ],
        },
      },
      {
        success: { kind: "json", schema: splitterResponseSchema },
        errorFactory: Split.SplitDocumentError,
      },
      options,
    );
  }
}

export namespace Split {
  export type GetSplitStatusRequest = {
    /** The unique identifier of the splitting job */
    jobId: string;
  };

  export class GetSplitStatusError extends ResponseError<
    Declared<"detailError", DetailError> | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<GetSplitStatusError> = [
      { on: 404, kind: "detailError", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }

  export type SplitDocumentRequest = {
    /**
     * JSON string containing array of category objects with name and optional description. Example:
     * [{"name":"invoice","description":"Business invoices with itemized
     * charges"},{"name":"contract","description":"Legal agreements and binding
     * documents"},{"name":"report"}]
     */
    categories: string;
    /**
     * PDF file to split. Either file or file_url must be provided. Provide either `file` or
     * `file_url`; sending both returns 400.
     */
    file?: FileInput;
    /**
     * URL to a PDF file to split. Either file or file_url must be provided. Example:
     * https://example.com/mixed_documents.pdf
     */
    fileUrl?: string;
    /**
     * Reorder pages within each category after classification, using content and page numbers to
     * infer the logical order. Only applied to categories that match more than one page.
     */
    enableReordering?: EnableReordering;
  };

  export class SplitDocumentError extends ResponseError<
    | Declared<"detailError", DetailError>
    | Declared<"detailError2", DetailError>
    | Declared<"detailError3", DetailError>
    | Declared<"detailError4", DetailError>
    | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<SplitDocumentError> = [
      { on: 400, kind: "detailError", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 401, kind: "detailError2", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 422, kind: "detailError3", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 429, kind: "detailError4", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }
}
