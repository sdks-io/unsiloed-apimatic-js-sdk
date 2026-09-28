import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Controls the naming convention for segment types in the output */
export const SegmentTypeNamingConvention2 = {
  Unsiloed: "Unsiloed",
  Other: "Other",
} as const;
export type SegmentTypeNamingConvention2 =
  | (typeof SegmentTypeNamingConvention2)[keyof typeof SegmentTypeNamingConvention2]
  | (string & {});

export const segmentTypeNamingConvention2Schema: EnumSchema<SegmentTypeNamingConvention2> =
  s.enumOf<SegmentTypeNamingConvention2>(SegmentTypeNamingConvention2);
