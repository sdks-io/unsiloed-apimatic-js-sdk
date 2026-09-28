import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type RateLimitError = {
  error?: string;
  message?: string;
  /** Seconds to wait before retrying. */
  retryAfter?: number;
};

export const rateLimitErrorSchema: Schema<RateLimitError> = s.object<RateLimitError>({
  error: s.optional(s.string()),
  message: s.optional(s.string()),
  retryAfter: s.optional(s.number()),
  _keysMap: {
    retryAfter: "retry_after",
  },
});
