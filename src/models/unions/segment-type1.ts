import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import { segmentTypeSchema } from "../segment-type.js";

/**
 * Segment type. Uses the `SegmentType` values with the default `Unsiloed` naming; with
 * `segment_type_naming=Other` alternative names such as `Header`, `List Item`, `Figure` are
 * returned.
 */
export type SegmentType1 = string;

export const segmentType1Schema: Schema<SegmentType1> = s.of<SegmentType1>(
  s.union([s.lazy(() => segmentTypeSchema), s.string()]),
);
