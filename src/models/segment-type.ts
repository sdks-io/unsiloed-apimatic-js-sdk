import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * All the possible types for a segment. Note: Different configurations will produce different
 * types. Please refer to the documentation for more information.
 */
export const SegmentType = {
  Caption: "Caption",
  Footnote: "Footnote",
  Formula: "Formula",
  KeyValuePair: "KeyValuePair",
  ListItem: "ListItem",
  Page: "Page",
  PageFooter: "PageFooter",
  PageHeader: "PageHeader",
  Picture: "Picture",
  Seal: "Seal",
  SectionHeader: "SectionHeader",
  Signature: "Signature",
  Table: "Table",
  Text: "Text",
  Title: "Title",
} as const;
export type SegmentType = (typeof SegmentType)[keyof typeof SegmentType] | (string & {});

export const segmentTypeSchema: EnumSchema<SegmentType> = s.enumOf<SegmentType>(SegmentType);
