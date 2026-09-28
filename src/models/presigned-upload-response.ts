import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Response from POST /v2/parse/upload. */
export type PresignedUploadResponse = {
  /** Number of page credits deducted (initial reservation, reconciled on upload). */
  creditUsed: number;
  /** RFC 3339 timestamp when upload_url expires. */
  expiresAt: Date;
  /** Use this ID to poll GET /parse/{job_id} for status. */
  jobId: string;
  /** Remaining page credits after deduction. */
  quotaRemaining: number;
  /**
   * Headers the client MUST include in the PUT request. Always includes `Content-Type`; send every
   * header exactly as given.
   */
  uploadHeaders: Record<string, string>;
  /** Always "PUT". */
  uploadMethod: "PUT";
  /**
   * Presigned URL. `PUT` the raw file bytes here with `upload_headers`. The PUT does not use the
   * `api-key` header; it returns 403 if headers are missing/wrong or the URL has expired.
   */
  uploadUrl: string;
};

export const presignedUploadResponseSchema: Schema<PresignedUploadResponse> =
  s.object<PresignedUploadResponse>({
    creditUsed: s.number(),
    expiresAt: s.dateTime(),
    jobId: s.string(),
    quotaRemaining: s.number(),
    uploadHeaders: s.record(s.string(), s.string()),
    uploadMethod: s.literal("PUT"),
    uploadUrl: s.string(),
    _keysMap: {
      creditUsed: "credit_used",
      expiresAt: "expires_at",
      jobId: "job_id",
      quotaRemaining: "quota_remaining",
      uploadHeaders: "upload_headers",
      uploadMethod: "upload_method",
      uploadUrl: "upload_url",
    },
  });
