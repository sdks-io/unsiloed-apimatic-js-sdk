import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** `result` is populated when status is `completed` or `review`. */
export const Status2 = {
  Queued: "queued",
  Processing: "processing",
  Completed: "completed",
  Review: "review",
  Failed: "failed",
} as const;
export type Status2 = (typeof Status2)[keyof typeof Status2] | (string & {});

export const status2Schema: EnumSchema<Status2> = s.enumOf<Status2>(Status2);
