import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { parametersSchema, type Parameters } from "./parameters.js";
import { result2Schema, type Result2 } from "./result2.js";
import { status1Schema, type Status1 } from "./status1.js";

export type SplitterResponse1 = {
  /** Unique identifier for the splitting job */
  jobId?: string;
  /** Current job status (queued, processing, completed, failed) */
  status?: Status1;
  /** Progress message */
  progress?: string;
  /**
   * Presigned download URL for the original uploaded file. Expires roughly an hour after the
   * response is generated; re-issue this request for a fresh URL.
   */
  fileUrl?: string;
  /** Name of the original file */
  fileName?: string;
  /** Job parameters */
  parameters?: Parameters;
  /**
   * Always present; `null` until status is `completed`. Split results (only present when status is
   * completed)
   */
  result?: Result2 | null;
  /** Error message if job failed */
  error?: string | null;
};

export const splitterResponse1Schema: Schema<SplitterResponse1> = s.object<SplitterResponse1>({
  jobId: s.optional(s.string()),
  status: s.optional(s.lazy(() => status1Schema)),
  progress: s.optional(s.string()),
  fileUrl: s.optional(s.string()),
  fileName: s.optional(s.string()),
  parameters: s.optional(s.lazy(() => parametersSchema)),
  result: s.optionalNullable(s.lazy(() => result2Schema)),
  error: s.optionalNullable(s.string()),
  _keysMap: {
    jobId: "job_id",
    fileUrl: "file_url",
    fileName: "file_name",
  },
});
