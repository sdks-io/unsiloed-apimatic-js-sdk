import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Segmentation model version: `v1` (default) or `v2`. `v2` is form-aware and additionally returns
 * `KeyValuePair`, `Signature`, and `Seal` segments. Unrecognized values fall back to `v1`.
 */
export const SegmentationVersion1 = {
  V1: "v1",
  V2: "v2",
} as const;
export type SegmentationVersion1 =
  | (typeof SegmentationVersion1)[keyof typeof SegmentationVersion1]
  | (string & {});

export const segmentationVersion1Schema: EnumSchema<SegmentationVersion1> =
  s.enumOf<SegmentationVersion1>(SegmentationVersion1);
