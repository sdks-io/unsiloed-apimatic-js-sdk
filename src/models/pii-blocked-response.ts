import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { engineSchema, type Engine } from "./engine.js";
import { severitySchema, type Severity } from "./severity.js";

/**
 * Returned (HTTP 200) when `detect_pii` is on and PII at or above `pii_block_severity` was found.
 * No job is created.
 */
export type PiiBlockedResponse = {
  jobId?: string | null;
  status: "pii_blocked";
  blocked: "True";
  /** `pii_detected` when `pii_block_severity` is `any`, otherwise `pii_detected:<severity>`. */
  reason?: string;
  severity?: Severity;
  engine?: Engine;
  ocrUsed?: boolean;
  totalFindings?: number;
  byCategory?: Record<string, number>;
  byType?: Record<string, number>;
  summary?: string | null;
  spans?: Record<string, unknown>[];
};

export const piiBlockedResponseSchema: Schema<PiiBlockedResponse> = s.object<PiiBlockedResponse>({
  jobId: s.optionalNullable(s.string()),
  status: s.literal("pii_blocked"),
  blocked: s.literal("True"),
  reason: s.optional(s.string()),
  severity: s.optional(s.lazy(() => severitySchema)),
  engine: s.optional(s.lazy(() => engineSchema)),
  ocrUsed: s.optional(s.boolean()),
  totalFindings: s.optional(s.number()),
  byCategory: s.optional(s.record(s.string(), s.number())),
  byType: s.optional(s.record(s.string(), s.number())),
  summary: s.optionalNullable(s.string()),
  spans: s.optional(s.array(s.record(s.string(), s.unknown()))),
  _keysMap: {
    jobId: "job_id",
    ocrUsed: "ocr_used",
    totalFindings: "total_findings",
    byCategory: "by_category",
    byType: "by_type",
  },
});
