import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type ClassifyResponse = {
  /** Unique identifier for the classification job */
  jobId?: string;
  /** Current job status (typically 'processing') */
  status?: string;
  /** Status message about the job */
  message?: string;
  /** Remaining API quota after this request */
  quotaRemaining?: number;
};

export const classifyResponseSchema: Schema<ClassifyResponse> = s.object<ClassifyResponse>({
  jobId: s.optional(s.string()),
  status: s.optional(s.string()),
  message: s.optional(s.string()),
  quotaRemaining: s.optional(s.number()),
  _keysMap: {
    jobId: "job_id",
    quotaRemaining: "quota_remaining",
  },
});
