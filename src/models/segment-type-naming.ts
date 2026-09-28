import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Segment type naming convention. `Unsiloed` (default) — e.g., `PageHeader`, `ListItem`, `Picture`.
 * `Other` — alternative names e.g., `Header`, `List Item`, `Figure`.
 */
export const SegmentTypeNaming = {
  Unsiloed: "Unsiloed",
  Other: "Other",
} as const;
export type SegmentTypeNaming = (typeof SegmentTypeNaming)[keyof typeof SegmentTypeNaming] | (string & {});

export const segmentTypeNamingSchema: EnumSchema<SegmentTypeNaming> =
  s.enumOf<SegmentTypeNaming>(SegmentTypeNaming);
