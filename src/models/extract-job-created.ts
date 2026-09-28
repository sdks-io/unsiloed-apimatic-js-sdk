import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Extraction job accepted. */
export type ExtractJobCreated = {
  /** Unique identifier for the extraction job */
  jobId?: string;
  /** Initial job status (typically 'queued') */
  status?: string;
  /** Descriptive message about the job creation */
  message?: string;
  /** Number of Credits remaining in your quota */
  quotaRemaining?: number;
};

export const extractJobCreatedSchema: Schema<ExtractJobCreated> = s.object<ExtractJobCreated>({
  jobId: s.optional(s.string()),
  status: s.optional(s.string()),
  message: s.optional(s.string()),
  quotaRemaining: s.optional(s.number()),
  _keysMap: {
    jobId: "job_id",
    quotaRemaining: "quota_remaining",
  },
});
