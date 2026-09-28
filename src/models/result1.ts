import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { categorySchema, type Category } from "./category.js";
import { pageResultSchema, type PageResult } from "./page-result.js";

/** Classification results (only present when status is completed) */
export type Result1 = {
  /** Whether classification succeeded */
  success?: boolean;
  /** The classified category */
  classification?: string;
  /** Confidence score (0-1) */
  confidence?: number;
  /** Number of pages classified (at most 4). */
  totalPages?: number;
  /** Number of pages processed */
  processedPages?: number;
  /** Per-page classification results */
  pageResults?: PageResult[];
  /** Categories found in the document, sorted by prominence. */
  categories?: Category[];
  /** Raw model output; present at the top level for image inputs only. */
  rawResult?: string;
};

export const result1Schema: Schema<Result1> = s.object<Result1>({
  success: s.optional(s.boolean()),
  classification: s.optional(s.string()),
  confidence: s.optional(s.number()),
  totalPages: s.optional(s.number()),
  processedPages: s.optional(s.number()),
  pageResults: s.optional(s.array(s.lazy(() => pageResultSchema))),
  categories: s.optional(s.array(s.lazy(() => categorySchema))),
  rawResult: s.optional(s.string()),
  _keysMap: {
    totalPages: "total_pages",
    processedPages: "processed_pages",
    pageResults: "page_results",
    rawResult: "raw_result",
  },
});
