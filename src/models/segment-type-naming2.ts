import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Segment type naming convention. `Unsiloed` (default) — e.g., `PageHeader`, `ListItem`, `Picture`.
 * `Other` — alternative names e.g., `Header`, `List Item`, `Figure`.
 */
export const SegmentTypeNaming2 = {
  Unsiloed: "Unsiloed",
  Other: "Other",
} as const;
export type SegmentTypeNaming2 = (typeof SegmentTypeNaming2)[keyof typeof SegmentTypeNaming2] | (string & {});

export const segmentTypeNaming2Schema: EnumSchema<SegmentTypeNaming2> =
  s.enumOf<SegmentTypeNaming2>(SegmentTypeNaming2);
