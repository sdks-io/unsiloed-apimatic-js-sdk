import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Response shape selector: `slim`, `full`, or `custom`.
 * - `slim`: chunk `embed` + bbox + page_number + segment_id + segment_type + HTML for tables /
 *   Markdown otherwise. Drops content/image/ocr/confidence/chart_data/page_height/page_width.
 * - `full`: every field returned (equivalent to omitting this param).
 * - `custom`: honor `output_fields` verbatim.
 *
 * When both `response_profile` and `output_fields` are provided, the profile wins.
 */
export const ResponseProfile2 = {
  Slim: "slim",
  Full: "full",
  Custom: "custom",
} as const;
export type ResponseProfile2 = (typeof ResponseProfile2)[keyof typeof ResponseProfile2] | (string & {});

export const responseProfile2Schema: EnumSchema<ResponseProfile2> =
  s.enumOf<ResponseProfile2>(ResponseProfile2);
