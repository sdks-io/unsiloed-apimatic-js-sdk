import { buildAuthSchemes, type AuthSchemes } from "./auth-schemes.js";
import type { ClientOptions } from "./client-options.js";
import { buildCoreClientOptions } from "./core/client-options.js";
import { RawClient } from "./core/raw-client.js";
import * as host from "./core/runtime-environment.js";
import * as s from "./core/validation/index.js";
import { Classify } from "./resources/classify.js";
import { Extract } from "./resources/extract.js";
import { Health } from "./resources/health.js";
import { Organization } from "./resources/organization.js";
import { ParseV2PresignedUpload } from "./resources/parse-v2-presigned-upload.js";
import { ParseVisionApiCompatible } from "./resources/parse-vision-api-compatible.js";
import { Split } from "./resources/split.js";
import { buildServers, type Servers } from "./servers.js";

/**
 * Document parsing, extraction, classification and splitting. Merged from the Unsiloed aggregate
 * spec, the v1 Parser API and the v2 Parser API (presigned large-file upload), and aligned with the
 * official docs at https://docs.unsiloed.ai/docs/. Poll large-file uploads with `GET
 * /parse/{job_id}`.
 */
export class UnsiloedAiDocumentProcessingApiClient {
  readonly #rawClient: RawClient;
  readonly #servers: Servers;
  readonly #auth: AuthSchemes;
  #health?: Health;
  #parseVisionApiCompatible?: ParseVisionApiCompatible;
  #parseV2PresignedUpload?: ParseV2PresignedUpload;
  #extract?: Extract;
  #classify?: Classify;
  #split?: Split;
  #organization?: Organization;

  constructor(options: ClientOptions = {}) {
    this.#rawClient = new RawClient({
      ...buildCoreClientOptions(options),
      defaultHeaders: [
        {
          name: "User-Agent",
          value: "UnsiloedAiDocumentProcessingApiClient/1.0.0 TypeScript",
          schema: s.string(),
        },
        { name: "X-APIMatic-Lang", value: "TypeScript", schema: s.string() },
        { name: "X-APIMatic-Package-Version", value: "1.0.0", schema: s.string() },
        { name: "X-APIMatic-Gen-Version", value: "4.0.0", schema: s.string() },
        { name: "X-APIMatic-OS", value: host.operatingSystem(), schema: s.optional(s.string()) },
        { name: "X-APIMatic-Runtime", value: host.runtimeDescription(), schema: s.optional(s.string()) },
      ],
      defaultQuery: [],
      defaultPathParams: [],
    });

    this.#servers = buildServers(options);

    this.#auth = buildAuthSchemes(options);
  }

  /**
   * Endpoint for checking the health of the service.
   */
  get health(): Health {
    return (this.#health ??= new Health(this.#rawClient, this.#servers));
  }

  /**
   * Vision-API compatible endpoints for parsing - accepts multipart form data with Vision-API
   * parameter names
   */
  get parseVisionApiCompatible(): ParseVisionApiCompatible {
    return (this.#parseVisionApiCompatible ??= new ParseVisionApiCompatible(
      this.#rawClient,
      this.#servers,
      this.#auth,
    ));
  }

  /**
   * Direct upload — no server buffering
   */
  get parseV2PresignedUpload(): ParseV2PresignedUpload {
    return (this.#parseV2PresignedUpload ??= new ParseV2PresignedUpload(
      this.#rawClient,
      this.#servers,
      this.#auth,
    ));
  }

  get extract(): Extract {
    return (this.#extract ??= new Extract(this.#rawClient, this.#servers, this.#auth));
  }

  get classify(): Classify {
    return (this.#classify ??= new Classify(this.#rawClient, this.#servers, this.#auth));
  }

  get split(): Split {
    return (this.#split ??= new Split(this.#rawClient, this.#servers, this.#auth));
  }

  get organization(): Organization {
    return (this.#organization ??= new Organization(this.#rawClient, this.#servers, this.#auth));
  }
}
