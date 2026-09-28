import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type SplitterResponse = {
  /** Unique identifier for the splitting job */
  jobId?: string;
  /** Current job status (typically 'processing') */
  status?: string;
  /** Remaining API quota after this request */
  quotaRemaining?: number;
};

export const splitterResponseSchema: Schema<SplitterResponse> = s.object<SplitterResponse>({
  jobId: s.optional(s.string()),
  status: s.optional(s.string()),
  quotaRemaining: s.optional(s.number()),
  _keysMap: {
    jobId: "job_id",
    quotaRemaining: "quota_remaining",
  },
});
