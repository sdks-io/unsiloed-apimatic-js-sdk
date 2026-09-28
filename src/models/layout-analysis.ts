import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Layout analysis strategy. `smart_layout_detection` (default) — detects layout elements using
 * bounding boxes. `page_by_page` — treats each page as a single segment; faster for simple
 * documents. `advanced_layout_detection` — higher-accuracy layout detection for complex pages
 * (multi-column layouts, dense tables/figures); slower than `smart_layout_detection`.
 */
export const LayoutAnalysis = {
  SmartLayoutDetection: "smart_layout_detection",
  PageByPage: "page_by_page",
  AdvancedLayoutDetection: "advanced_layout_detection",
} as const;
export type LayoutAnalysis = (typeof LayoutAnalysis)[keyof typeof LayoutAnalysis] | (string & {});

export const layoutAnalysisSchema: EnumSchema<LayoutAnalysis> = s.enumOf<LayoutAnalysis>(LayoutAnalysis);
