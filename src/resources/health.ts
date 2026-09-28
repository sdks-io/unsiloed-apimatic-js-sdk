import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import { noneAuth } from "../core/auth/schemes.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError } from "../core/response-error.js";
import { healthResponseSchema, type HealthResponse } from "../models/health-response.js";
import type { Servers } from "../servers.js";

/**
 * Endpoint for checking the health of the service.
 */
export class Health {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;

  constructor(rawClient: RawClient, servers: Servers) {
    this.#rawClient = rawClient;
    this.#servers = servers;
  }

  /**
   * Health Check
   *
   * @remarks
   * Confirmation that the service can respond to requests. Also surfaces lifetime telemetry-drop
   * counters so silent loss is visible without grepping pod logs.
   *
   * @returns The API is reachable. No API key needed.
   *
   * @throws {@link ResponseError} when the API answers with an error status
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  healthCheck(options?: RequestOptions): ApiPromise<HealthResponse, ResponseError> {
    return this.#rawClient.execute<HealthResponse, ResponseError>(
      {
        method: "GET",
        url: this.#servers.default("/health"),
        auth: noneAuth,
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: healthResponseSchema },
        errorFactory: ResponseError,
      },
      options,
    );
  }
}
