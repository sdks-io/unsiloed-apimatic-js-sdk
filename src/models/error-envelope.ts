import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { errorSchema, type Error } from "./error.js";

/** Structured error body. */
export type ErrorEnvelope = {
  error: Error;
};

export const errorEnvelopeSchema: Schema<ErrorEnvelope> = s.object<ErrorEnvelope>({
  error: errorSchema,
});
