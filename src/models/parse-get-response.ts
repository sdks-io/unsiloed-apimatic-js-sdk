import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { chunkSchema, type Chunk } from "./chunk.js";
import { configuration1Schema, type Configuration1 } from "./configuration1.js";
import { resultSchema, type Result } from "./result.js";
import { status3Schema, type Status3 } from "./status3.js";

/**
 * Response body for `GET /parse/{job_id}`.
 *
 * Fields marked as optional appear only when the job has reached the relevant status.
 */
export type ParseGetResponse = {
  /**
   * Array of document chunks with segments and extracted content. Present when status is
   * `Succeeded`.
   */
  chunks?: Chunk[] | null;
  configuration?: Configuration1 | null;
  /** ISO 8601 timestamp when the job was created. */
  createdAt: string;
  /** Credits used for this job. */
  creditUsed?: number | null;
  /**
   * Presigned download URLs for exported file formats. Only present when `export_format` was
   * specified in the parse request and the export has completed. Keys are format names (e.g.
   * `"docx"`), values are presigned S3 URLs valid for 1 hour. Example: `{"docx":
   * "https://s3.amazonaws.com/..."}`. If export failed, contains `{"docx_error": "..."}` instead.
   */
  exports?: Record<string, string> | null;
  /** Original file name from the job record. */
  fileName?: string | null;
  /** MIME type of the uploaded file. */
  fileType?: string | null;
  /** S3 URL of the original uploaded file. */
  fileUrl?: string | null;
  /**
   * ISO 8601 timestamp when processing completed. Present when status is `Succeeded` or `Failed`.
   */
  finishedAt?: string | null;
  /** Job identifier. */
  jobId: string;
  /** Whether the job was parsed with cross-page table merging. */
  mergeTables?: boolean | null;
  /** Error or status detail message. Present when status is `Failed`. */
  message?: string | null;
  /** Citation or job metadata. Populated when `xml_citation` is enabled or from the job record. */
  metadata: Record<string, unknown>;
  /** Number of pages in the document. Present when status is `Succeeded`. */
  pageCount?: number | null;
  /** Presigned S3 URL to the generated PDF. Present when status is `Succeeded`. */
  pdfUrl?: string | null;
  /**
   * Present when `output_file=true`: holds `output_file_url`, a presigned URL to the raw output
   * JSON.
   */
  result?: Result | null;
  /** ISO 8601 timestamp when processing started. Present when status is not `Starting`. */
  startedAt?: string | null;
  /** Current job status. */
  status: Status3;
  /** Total number of document chunks. Present when status is `Succeeded`. */
  totalChunks?: number | null;
};

export const parseGetResponseSchema: Schema<ParseGetResponse> = s.object<ParseGetResponse>({
  chunks: s.optionalNullable(s.array(s.lazy(() => chunkSchema))),
  configuration: s.optionalNullable(s.lazy(() => configuration1Schema)),
  createdAt: s.string(),
  creditUsed: s.optionalNullable(s.number()),
  exports: s.optionalNullable(s.record(s.string(), s.string())),
  fileName: s.optionalNullable(s.string()),
  fileType: s.optionalNullable(s.string()),
  fileUrl: s.optionalNullable(s.string()),
  finishedAt: s.optionalNullable(s.string()),
  jobId: s.string(),
  mergeTables: s.optionalNullable(s.boolean()),
  message: s.optionalNullable(s.string()),
  metadata: s.record(s.string(), s.unknown()),
  pageCount: s.optionalNullable(s.number()),
  pdfUrl: s.optionalNullable(s.string()),
  result: s.optionalNullable(s.lazy(() => resultSchema)),
  startedAt: s.optionalNullable(s.string()),
  status: status3Schema,
  totalChunks: s.optionalNullable(s.number()),
  _keysMap: {
    createdAt: "created_at",
    creditUsed: "credit_used",
    fileName: "file_name",
    fileType: "file_type",
    fileUrl: "file_url",
    finishedAt: "finished_at",
    jobId: "job_id",
    mergeTables: "merge_tables",
    pageCount: "page_count",
    pdfUrl: "pdf_url",
    startedAt: "started_at",
    totalChunks: "total_chunks",
  },
});
