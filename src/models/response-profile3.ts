import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Response shape selector: `slim`, `full`, or `custom`.
 * - `slim`: chunk `embed` + bbox + page_number + segment_id + segment_type + HTML for tables /
 *   Markdown for everything else. Drops `content`, `image`, `ocr`, `confidence`, `chart_data`,
 *   `page_height`, `page_width`.
 * - `full`: every field returned (equivalent to omitting this param).
 * - `custom`: honor `output_fields` verbatim.
 *
 * Precedence: when both `response_profile` and `output_fields` are provided, the profile wins
 * (`output_fields` only matters for `custom` or when the profile is omitted).
 *
 * Applies to inline JSON responses only — `GET /parse/{job_id}?output_file=true` returns a
 * presigned URL to the stored full-shape output file.
 */
export const ResponseProfile3 = {
  Slim: "slim",
  Full: "full",
  Custom: "custom",
} as const;
export type ResponseProfile3 = (typeof ResponseProfile3)[keyof typeof ResponseProfile3] | (string & {});

export const responseProfile3Schema: EnumSchema<ResponseProfile3> =
  s.enumOf<ResponseProfile3>(ResponseProfile3);
