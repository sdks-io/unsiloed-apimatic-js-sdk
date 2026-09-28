import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Controls the naming convention for segment types in the output:
 * - `Unsiloed`: Uses Unsiloed naming convention (e.g., `PageHeader`, `PageFooter`, `SectionHeader`,
 *   `ListItem`, `Picture`)
 * - `Other`: Uses alternative naming convention (e.g., `Header`, `Footer`, `Section Header`, `List
 *   Item`, `Figure`)
 */
export const SegmentTypeNamingConvention = {
  Unsiloed: "Unsiloed",
  Other: "Other",
} as const;
export type SegmentTypeNamingConvention =
  | (typeof SegmentTypeNamingConvention)[keyof typeof SegmentTypeNamingConvention]
  | (string & {});

export const segmentTypeNamingConventionSchema: EnumSchema<SegmentTypeNamingConvention> =
  s.enumOf<SegmentTypeNamingConvention>(SegmentTypeNamingConvention);
