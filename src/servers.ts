import type { ClientOptions } from "./client-options.js";
import type { UrlTemplate } from "./core/api-request.js";
import { SdkError } from "./core/errors.js";
import * as s from "./core/validation/index.js";

export const ServerEnvironment = {
  Production: "production",
  Environment2: "environment2",
} as const;
export type ServerEnvironment = (typeof ServerEnvironment)[keyof typeof ServerEnvironment];

export type Servers = {
  default: (subPath: string) => UrlTemplate;
};

const productionSchemas = {
  baseUrl: s.of(s.defaulted(s.string(), "https://prod.visionapi.unsiloed.ai")),
};

const environment2Schemas = {
  baseUrl: s.of(s.defaulted(s.string(), "https://platformbackend.unsiloed.ai/api/v1")),
};

export function buildServers(options: ClientOptions): Servers {
  return {
    default: (s) => defaultServer(options, s),
  };
}

function defaultServer(options: ClientOptions, subPath: string): UrlTemplate {
  const environment = options.serverEnvironment;
  switch (environment) {
    case ServerEnvironment.Production:
    case undefined:
      return { baseUrl: productionSchemas.baseUrl.decode(options.serverOptions?.baseUrl), subPath };
    case ServerEnvironment.Environment2:
      return { baseUrl: environment2Schemas.baseUrl.decode(options.serverOptions?.baseUrl), subPath };
    default:
      unknownEnvironment(environment);
  }
}

function unknownEnvironment(environment: never): never {
  throw new SdkError({ message: `Unknown server environment: ${String(environment)}` });
}
