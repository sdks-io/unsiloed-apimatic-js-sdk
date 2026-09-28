import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Segmentation model version selected per request.
 * - `v1` (default): the standard layout model (11 core element types).
 * - `v2`: a form-aware layout model that additionally returns `KeyValuePair`, `Signature`, and
 *   `Seal` segments.
 *
 * Unrecognized values fall back to `v1`.
 */
export const SegmentationVersion = {
  V1: "v1",
  V2: "v2",
} as const;
export type SegmentationVersion =
  | (typeof SegmentationVersion)[keyof typeof SegmentationVersion]
  | (string & {});

export const segmentationVersionSchema: EnumSchema<SegmentationVersion> =
  s.enumOf<SegmentationVersion>(SegmentationVersion);
