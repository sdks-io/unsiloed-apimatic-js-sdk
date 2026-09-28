import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Job parameters */
export type Parameters = {
  /** List of category names */
  classes?: string[];
  /** Category descriptions map */
  categoryDescriptions?: Record<string, unknown>;
  /** Whether pages were reordered within each category after classification */
  enableReordering?: boolean;
  /** Number of pages in the uploaded document */
  pageCount?: number;
};

export const parametersSchema: Schema<Parameters> = s.object<Parameters>({
  classes: s.optional(s.array(s.string())),
  categoryDescriptions: s.optional(s.record(s.string(), s.unknown())),
  enableReordering: s.optional(s.boolean()),
  pageCount: s.optional(s.number()),
  _keysMap: {
    categoryDescriptions: "category_descriptions",
    enableReordering: "enable_reordering",
    pageCount: "page_count",
  },
});
