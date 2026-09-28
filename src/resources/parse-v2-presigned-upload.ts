import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import { uuid } from "../core/uuid.js";
import * as s from "../core/validation/index.js";
import { errorEnvelopeSchema, type ErrorEnvelope } from "../models/error-envelope.js";
import {
  presignedUploadRequestSchema,
  type PresignedUploadRequest,
} from "../models/presigned-upload-request.js";
import {
  presignedUploadResponseSchema,
  type PresignedUploadResponse,
} from "../models/presigned-upload-response.js";
import { rateLimitErrorSchema, type RateLimitError } from "../models/rate-limit-error.js";
import {
  v2ParseUpload400Error1Schema,
  type V2ParseUpload400Error1,
} from "../models/v2-parse-upload400-error1.js";
import type { Servers } from "../servers.js";

/**
 * Direct upload — no server buffering
 */
export class ParseV2PresignedUpload {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Create Presigned Upload
   *
   * @remarks
   * Creates a parse job and returns a presigned S3 PUT URL. The client uploads the file directly to
   * S3 (server not involved in the transfer). Once the upload completes, the system enqueues the
   * job automatically via S3 event notification. Poll GET /parse/{job_id} to track progress.
   *
   * @returns Upload URL created
   *
   * @throws {@link ParseV2PresignedUpload.CreatePresignedUploadError} when the API answers with an
   * error status — narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  createPresignedUpload(
    request: ParseV2PresignedUpload.CreatePresignedUploadRequest,
    options?: RequestOptions,
  ): ApiPromise<PresignedUploadResponse, ParseV2PresignedUpload.CreatePresignedUploadError> {
    return this.#rawClient.execute(
      {
        method: "POST",
        url: this.#servers.default("/v2/parse/upload"),
        auth: this.#auth.apiKeyAuth,
        headers: [{ name: "Idempotency-Key", value: uuid(), schema: s.string() }],
        body: { kind: "json", value: request.body, schema: presignedUploadRequestSchema },
      },
      {
        success: { kind: "json", schema: presignedUploadResponseSchema },
        errorFactory: ParseV2PresignedUpload.CreatePresignedUploadError,
      },
      options,
    );
  }
}

export namespace ParseV2PresignedUpload {
  export type CreatePresignedUploadRequest = {
    body: PresignedUploadRequest;
  };

  export class CreatePresignedUploadError extends ResponseError<
    | Declared<"v2ParseUpload400Error1", V2ParseUpload400Error1>
    | Declared<"error401", undefined>
    | Declared<"error402", undefined>
    | Declared<"error403", undefined>
    | Declared<"rateLimitError", RateLimitError>
    | Declared<"error500", undefined>
    | Declared<"errorEnvelope", ErrorEnvelope>
  > {
    static readonly errors: ErrorDecoders<CreatePresignedUploadError> = [
      {
        on: 400,
        kind: "v2ParseUpload400Error1",
        decode: { kind: "json", schema: v2ParseUpload400Error1Schema },
      },
      { on: 401, kind: "error401", decode: { kind: "empty" } },
      { on: 402, kind: "error402", decode: { kind: "empty" } },
      { on: 403, kind: "error403", decode: { kind: "empty" } },
      { on: 429, kind: "rateLimitError", decode: { kind: "json", schema: rateLimitErrorSchema } },
      { on: 500, kind: "error500", decode: { kind: "empty" } },
      { on: 503, kind: "errorEnvelope", decode: { kind: "json", schema: errorEnvelopeSchema } },
    ];
  }
}
