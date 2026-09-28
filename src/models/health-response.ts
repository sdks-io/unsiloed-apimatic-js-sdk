import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type HealthResponse = {
  status?: string;
};

export const healthResponseSchema: Schema<HealthResponse> = s.object<HealthResponse>({
  status: s.optional(s.string()),
});
