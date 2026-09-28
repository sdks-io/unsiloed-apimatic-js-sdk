import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { errorSchema, type Error } from "./error.js";

/** Structured error body. */
export type ErrorEnvelopeError = {
  error: Error;
};

export const errorEnvelopeErrorSchema: Schema<ErrorEnvelopeError> = s.object<ErrorEnvelopeError>({
  error: errorSchema,
});
