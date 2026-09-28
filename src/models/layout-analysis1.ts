import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Layout analysis strategy: `smart_layout_detection` (default), `page_by_page`, or
 * `advanced_layout_detection` (higher-accuracy layout detection for complex pages — multi-column
 * layouts, dense tables/figures; slower than the default).
 */
export const LayoutAnalysis1 = {
  SmartLayoutDetection: "smart_layout_detection",
  PageByPage: "page_by_page",
  AdvancedLayoutDetection: "advanced_layout_detection",
} as const;
export type LayoutAnalysis1 = (typeof LayoutAnalysis1)[keyof typeof LayoutAnalysis1] | (string & {});

export const layoutAnalysis1Schema: EnumSchema<LayoutAnalysis1> = s.enumOf<LayoutAnalysis1>(LayoutAnalysis1);
