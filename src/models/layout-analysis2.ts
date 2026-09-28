import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Layout analysis strategy. `smart_layout_detection` (default) — detects layout elements using
 * bounding boxes. `page_by_page` — treats each page as a single segment; faster for simple
 * documents, or `advanced_layout_detection` (VLM-based exhaustive segmentation with 14 element
 * types).
 */
export const LayoutAnalysis2 = {
  SmartLayoutDetection: "smart_layout_detection",
  PageByPage: "page_by_page",
  AdvancedLayoutDetection: "advanced_layout_detection",
} as const;
export type LayoutAnalysis2 = (typeof LayoutAnalysis2)[keyof typeof LayoutAnalysis2] | (string & {});

export const layoutAnalysis2Schema: EnumSchema<LayoutAnalysis2> = s.enumOf<LayoutAnalysis2>(LayoutAnalysis2);
