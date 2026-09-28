import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Current job status (queued, processing, completed, failed) */
export const Status1 = {
  Queued: "queued",
  Processing: "processing",
  Completed: "completed",
  Failed: "failed",
} as const;
export type Status1 = (typeof Status1)[keyof typeof Status1] | (string & {});

export const status1Schema: EnumSchema<Status1> = s.enumOf<Status1>(Status1);
