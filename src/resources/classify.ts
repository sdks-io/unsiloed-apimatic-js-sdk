import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { FileInput } from "../core/binary.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { classifyResponseSchema, type ClassifyResponse } from "../models/classify-response.js";
import { classifyResponse1Schema, type ClassifyResponse1 } from "../models/classify-response1.js";
import { classify402Error1Schema, type Classify402Error1 } from "../models/classify402-error1.js";
import { detailErrorSchema, type DetailError } from "../models/detail-error.js";
import { errorEnvelopeSchema, type ErrorEnvelope } from "../models/error-envelope.js";
import type { Servers } from "../servers.js";

export class Classify {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Classify Document
   *
   * @remarks
   * Classify PDF and image documents into predefined categories
   *
   * @returns Accepted - classification job started
   *
   * @throws {@link Classify.ClassifyDocumentError} when the API answers with an error status —
   * narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  classifyDocument(
    request: Classify.ClassifyDocumentRequest,
    options?: RequestOptions,
  ): ApiPromise<ClassifyResponse, Classify.ClassifyDocumentError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/classify"),
        auth: this.#auth.apiKeyAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: {
          kind: "multipart",
          value: [
            { kind: "text", name: "categories", value: request.categories, schema: s.string() },
            { kind: "file", name: "pdf_file", value: request.pdfFile },
            { kind: "text", name: "file_url", value: request.fileUrl, schema: s.optional(s.string()) },
          ],
        },
      },
      {
        success: { kind: "json", schema: classifyResponseSchema },
        errorFactory: Classify.ClassifyDocumentError,
      },
      options,
    );
  }

  /**
   * Get Classification Job Status
   *
   * @remarks
   * Check the status and progress of classification jobs and retrieve results
   *
   * @returns Classification job status retrieved successfully
   *
   * @throws {@link Classify.GetClassificationJobStatusError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  getClassificationJobStatus(
    request: Classify.GetClassificationJobStatusRequest,
    options?: RequestOptions,
  ): ApiPromise<ClassifyResponse1, Classify.GetClassificationJobStatusError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/classify/{job_id}"),
        auth: this.#auth.apiKeyAuth,
        pathParams: [{ name: "job_id", value: request.jobId, schema: s.string() }],
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: classifyResponse1Schema },
        errorFactory: Classify.GetClassificationJobStatusError,
      },
      options,
    );
  }
}

export namespace Classify {
  export type ClassifyDocumentRequest = {
    /**
     * JSON string containing an array of category objects with a required name. Example:
     * [{"name":"invoice"},{"name":"contract"},{"name":"receipt"}]. A "description" key is accepted
     * for compatibility but is not used by classification.
     */
    categories: string;
    /**
     * The document to classify: a PDF or an image (JPG, PNG, GIF, WebP, BMP, TIFF). Provide either
     * pdf_file or file_url, not both. Maximum file size: 500MB.
     */
    pdfFile?: FileInput;
    /**
     * URL to a document to classify (PDF or image). Provide either pdf_file or file_url, not both.
     */
    fileUrl?: string;
  };

  export class ClassifyDocumentError extends ResponseError<
    | Declared<"detailError", DetailError>
    | Declared<"detailError2", DetailError>
    | Declared<"classify402Error1", Classify402Error1>
    | Declared<"detailError3", DetailError>
    | Declared<"detailError4", DetailError>
    | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<ClassifyDocumentError> = [
      { on: 400, kind: "detailError", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 401, kind: "detailError2", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 402, kind: "classify402Error1", decode: { kind: "json", schema: classify402Error1Schema } },
      { on: 422, kind: "detailError3", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 429, kind: "detailError4", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }

  export type GetClassificationJobStatusRequest = {
    /** The unique identifier of the classification job */
    jobId: string;
  };

  export class GetClassificationJobStatusError extends ResponseError<
    Declared<"detailError", DetailError> | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<GetClassificationJobStatusError> = [
      { on: 404, kind: "detailError", decode: { kind: "json", schema: detailErrorSchema } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }
}
