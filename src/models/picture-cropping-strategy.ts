import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Controls the cropping strategy for an item (e.g. segment, chunk, etc.)
 * - `All` crops all images and includes URLs in response
 * - `Auto` crops images if needed for VLM processing and includes URLs in response
 * - `None` crops images if needed for VLM processing but does NOT include URLs in response
 */
export const PictureCroppingStrategy = {
  All: "All",
  Auto: "Auto",
  None: "None",
} as const;
export type PictureCroppingStrategy =
  | (typeof PictureCroppingStrategy)[keyof typeof PictureCroppingStrategy]
  | (string & {});

export const pictureCroppingStrategySchema: EnumSchema<PictureCroppingStrategy> =
  s.enumOf<PictureCroppingStrategy>(PictureCroppingStrategy);
