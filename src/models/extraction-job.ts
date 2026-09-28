import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { metadataSchema, type Metadata } from "./metadata.js";
import { status2Schema, type Status2 } from "./status2.js";
import { extractedFieldSchema, type ExtractedField } from "./unions/extracted-field.js";

export type ExtractionJob = {
  jobId?: string;
  /** `result` is populated when status is `completed` or `review`. */
  status?: Status2;
  fileName?: string | null;
  /** Presigned download URL; expires about an hour after the response. */
  fileUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  metadata?: Metadata;
  /** Extracted data keyed by schema field name. */
  result?: Record<string, ExtractedField> | null;
  error?: string | null;
};

export const extractionJobSchema: Schema<ExtractionJob> = s.object<ExtractionJob>({
  jobId: s.optional(s.string()),
  status: s.optional(s.lazy(() => status2Schema)),
  fileName: s.optionalNullable(s.string()),
  fileUrl: s.optionalNullable(s.string()),
  createdAt: s.optional(s.dateTime()),
  updatedAt: s.optional(s.dateTime()),
  metadata: s.optional(s.lazy(() => metadataSchema)),
  result: s.optionalNullable(
    s.record(
      s.string(),
      s.lazy(() => extractedFieldSchema),
    ),
  ),
  error: s.optionalNullable(s.string()),
  _keysMap: {
    jobId: "job_id",
    fileName: "file_name",
    fileUrl: "file_url",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});
