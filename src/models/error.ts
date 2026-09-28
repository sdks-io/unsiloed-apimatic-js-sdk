import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { detailsSchema, type Details } from "./details.js";

export type Error = {
  /** Machine-readable code, e.g. `service_unavailable`, `task_not_found`, `internal_error`. */
  code: string;
  message: string;
  /**
   * Extra context. For a queue-full 503: `reason` (`queue_full`) and `retry_after` (seconds). For
   * `task_not_found`: `task_id`.
   */
  details?: Details;
};

export const errorSchema: Schema<Error> = s.object<Error>({
  code: s.string(),
  message: s.string(),
  details: s.optional(s.lazy(() => detailsSchema)),
});
