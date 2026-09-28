import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import { extractJobCreatedSchema, type ExtractJobCreated } from "../extract-job-created.js";
import { piiBlockedResponseSchema, type PiiBlockedResponse } from "../pii-blocked-response.js";

export type V2ExtractResponse = ExtractJobCreated | PiiBlockedResponse;

export const v2ExtractResponseSchema: Schema<V2ExtractResponse> = s.of<V2ExtractResponse>(
  s.union([s.lazy(() => extractJobCreatedSchema), s.lazy(() => piiBlockedResponseSchema)]),
);
