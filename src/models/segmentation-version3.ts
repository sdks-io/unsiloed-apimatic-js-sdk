import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Segmentation model version: `v1` (default) or `v2`. `v2` is form-aware and additionally returns
 * `KeyValuePair`, `Signature`, and `Seal` segments. Unrecognized values fall back to `v1`.
 */
export const SegmentationVersion3 = {
  V1: "v1",
  V2: "v2",
} as const;
export type SegmentationVersion3 =
  | (typeof SegmentationVersion3)[keyof typeof SegmentationVersion3]
  | (string & {});

export const segmentationVersion3Schema: EnumSchema<SegmentationVersion3> =
  s.enumOf<SegmentationVersion3>(SegmentationVersion3);
