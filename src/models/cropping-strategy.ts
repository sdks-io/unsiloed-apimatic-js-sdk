import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * - `All` crops all images and includes URLs in response
 * - `Auto` crops images if needed for VLM processing and includes URLs in response
 * - `None` crops images if needed for VLM processing but does NOT include URLs in response
 */
export const CroppingStrategy = {
  All: "All",
  Auto: "Auto",
  None: "None",
} as const;
export type CroppingStrategy = (typeof CroppingStrategy)[keyof typeof CroppingStrategy] | (string & {});

export const croppingStrategySchema: EnumSchema<CroppingStrategy> =
  s.enumOf<CroppingStrategy>(CroppingStrategy);
