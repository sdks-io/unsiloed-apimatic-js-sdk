import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * High-level response shape selector. Optional. When set, it overrides `OutputFieldsConfig` (the
 * profile wins).
 *
 * - `Slim`: chunk `embed` + bbox + `segment_id` + `segment_type` + `page_number` + one
 *   representation per segment (HTML for `Table`, Markdown otherwise). Drops `content`, `image`,
 *   `ocr`, `confidence`, `chart_data`, `page_height`, `page_width`, and null `references`.
 * - `Full`: every field returned. `output_fields` is ignored.
 * - `Custom`: honor the caller's `OutputFieldsConfig` verbatim.
 */
export const ResponseProfile = {
  Slim: "slim",
  Full: "full",
  Custom: "custom",
} as const;
export type ResponseProfile = (typeof ResponseProfile)[keyof typeof ResponseProfile] | (string & {});

export const responseProfileSchema: EnumSchema<ResponseProfile> = s.enumOf<ResponseProfile>(ResponseProfile);
