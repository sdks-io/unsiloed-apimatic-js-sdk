import type { AuthSchemes } from "../auth-schemes.js";
import type { ApiPromise } from "../core/api-promise.js";
import type { RequestOptions } from "../core/api-request.js";
import type { RawClient } from "../core/raw-client.js";
import { ResponseError, type Declared, type ErrorDecoders } from "../core/response-error.js";
import { orgGetUsageResponseSchema, type OrgGetUsageResponse } from "../models/org-get-usage-response.js";
import { orgGetUsage401Error1Schema, type OrgGetUsage401Error1 } from "../models/org-get-usage401-error1.js";
import { orgGetUsage404Error1Schema, type OrgGetUsage404Error1 } from "../models/org-get-usage404-error1.js";
import type { Servers } from "../servers.js";

export class Organization {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;

  constructor(rawClient: RawClient, servers: Servers, auth: AuthSchemes) {
    this.#rawClient = rawClient;
    this.#servers = servers;
    this.#auth = auth;
  }

  /**
   * Get Organization Usage
   *
   * @remarks
   * Get organization usage information including current usage, monthly limit, and remaining quota
   *
   * @returns Usage information retrieved successfully
   *
   * @throws {@link Organization.GetOrganizationUsageError} when the API answers with an error
   * status — narrow on `err.payload.kind`
   *
   * @throws {@link UnsiloedAiDocumentProcessingApiError} when no usable response was produced: a
   * connection failure, a timeout, an abort, a schema violation, or a credential that could not be
   * obtained
   */
  getOrganizationUsage(
    options?: RequestOptions,
  ): ApiPromise<OrgGetUsageResponse, Organization.GetOrganizationUsageError> {
    return this.#rawClient.execute(
      {
        method: "GET",
        url: this.#servers.default("/org/get_usage"),
        auth: this.#auth.apiKeyAuth,
        body: { kind: "empty" },
      },
      {
        success: { kind: "json", schema: orgGetUsageResponseSchema },
        errorFactory: Organization.GetOrganizationUsageError,
      },
      options,
    );
  }
}

export namespace Organization {
  export class GetOrganizationUsageError extends ResponseError<
    | Declared<"orgGetUsage401Error1", OrgGetUsage401Error1>
    | Declared<"orgGetUsage404Error1", OrgGetUsage404Error1>
  > {
    static readonly errors: ErrorDecoders<GetOrganizationUsageError> = [
      { on: 401, kind: "orgGetUsage401Error1", decode: { kind: "json", schema: orgGetUsage401Error1Schema } },
      { on: 404, kind: "orgGetUsage404Error1", decode: { kind: "json", schema: orgGetUsage404Error1Schema } },
    ];
  }
}
