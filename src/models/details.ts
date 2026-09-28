import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * Extra context. For a queue-full 503: `reason` (`queue_full`) and `retry_after` (seconds). For
 * `task_not_found`: `task_id`.
 */
export type Details = {
  reason?: string;
  retryAfter?: number;
  taskId?: string;
};

export const detailsSchema: Schema<Details> = s.object<Details>({
  reason: s.optional(s.string()),
  retryAfter: s.optional(s.number()),
  taskId: s.optional(s.string()),
  _keysMap: {
    retryAfter: "retry_after",
    taskId: "task_id",
  },
});
