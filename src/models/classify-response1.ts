import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { result1Schema, type Result1 } from "./result1.js";
import { status1Schema, type Status1 } from "./status1.js";

export type ClassifyResponse1 = {
  /** Unique identifier for the classification job */
  jobId?: string;
  /** Current job status (queued, processing, completed, failed) */
  status?: Status1;
  /** Progress message */
  progress?: string;
  /** Error message if job failed */
  error?: string | null;
  /** Classification results (only present when status is completed) */
  result?: Result1 | null;
};

export const classifyResponse1Schema: Schema<ClassifyResponse1> = s.object<ClassifyResponse1>({
  jobId: s.optional(s.string()),
  status: s.optional(s.lazy(() => status1Schema)),
  progress: s.optional(s.string()),
  error: s.optionalNullable(s.string()),
  result: s.optionalNullable(s.lazy(() => result1Schema)),
  _keysMap: {
    jobId: "job_id",
  },
});
