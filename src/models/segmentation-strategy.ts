import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Controls the segmentation strategy:
 * - `LayoutAnalysis` (wire value `smart_layout_detection`): Analyzes pages for layout elements
 *   (e.g., `Table`, `Picture`, `Formula`, etc.) using bounding boxes. Provides fine-grained
 *   segmentation and better chunking. (Latency penalty: ~TBD seconds per page).
 * - `Page` (wire value `page_by_page`): Treats each page as a single segment. Faster processing,
 *   but without layout element detection and only simple chunking.
 * - `AdvancedLayoutAnalysis` (wire value `advanced_layout_detection`): Higher-accuracy layout
 *   detection for complex pages (multi-column layouts, dense tables/figures); slower than
 *   `LayoutAnalysis`.
 */
export const SegmentationStrategy = {
  SmartLayoutDetection: "smart_layout_detection",
  PageByPage: "page_by_page",
  AdvancedLayoutDetection: "advanced_layout_detection",
} as const;
export type SegmentationStrategy =
  | (typeof SegmentationStrategy)[keyof typeof SegmentationStrategy]
  | (string & {});

export const segmentationStrategySchema: EnumSchema<SegmentationStrategy> =
  s.enumOf<SegmentationStrategy>(SegmentationStrategy);
