import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Response body for a successful `POST /parse` call. */
export type ParseCreateResponse = {
  /** ISO 8601 timestamp when the job was created. */
  createdAt: string;
  /** Number of pages deducted from your quota for this job. */
  creditUsed: number;
  /**
   * Original file name. For URL submissions this is the last path segment of the URL, or
   * `"unknown"` when no usable segment exists.
   */
  fileName: string;
  /** Job identifier — pass this to `GET /parse/{job_id}` to poll for results. */
  jobId: string;
  /**
   * Whether table merging is enabled for this job (reflects the submitted `merge_tables` value).
   */
  mergeTables: boolean;
  /** Human-readable status message with a polling hint. */
  message: string;
  /** Remaining page quota after this job was deducted. */
  quotaRemaining: number;
  /** Initial job status. Always `"Starting"` on creation. */
  status: string;
};

export const parseCreateResponseSchema: Schema<ParseCreateResponse> = s.object<ParseCreateResponse>({
  createdAt: s.string(),
  creditUsed: s.number(),
  fileName: s.string(),
  jobId: s.string(),
  mergeTables: s.boolean(),
  message: s.string(),
  quotaRemaining: s.number(),
  status: s.string(),
  _keysMap: {
    createdAt: "created_at",
    creditUsed: "credit_used",
    fileName: "file_name",
    jobId: "job_id",
    mergeTables: "merge_tables",
    quotaRemaining: "quota_remaining",
  },
});
