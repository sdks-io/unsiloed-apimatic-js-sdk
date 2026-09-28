import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Segment type naming convention: `Unsiloed` (default) or `Other`. */
export const SegmentTypeNaming1 = {
  Unsiloed: "Unsiloed",
  Other: "Other",
} as const;
export type SegmentTypeNaming1 = (typeof SegmentTypeNaming1)[keyof typeof SegmentTypeNaming1] | (string & {});

export const segmentTypeNaming1Schema: EnumSchema<SegmentTypeNaming1> =
  s.enumOf<SegmentTypeNaming1>(SegmentTypeNaming1);
