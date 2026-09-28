import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type RateLimitErrorError = {
  error?: string;
  message?: string;
  /** Seconds to wait before retrying. */
  retryAfter?: number;
};

export const rateLimitErrorErrorSchema: Schema<RateLimitErrorError> = s.object<RateLimitErrorError>({
  error: s.optional(s.string()),
  message: s.optional(s.string()),
  retryAfter: s.optional(s.number()),
  _keysMap: {
    retryAfter: "retry_after",
  },
});
