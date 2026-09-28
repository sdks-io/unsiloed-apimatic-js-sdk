import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type Category = {
  category?: string;
  pages?: number[];
  pageCount?: number;
  confidence?: number;
};

export const categorySchema: Schema<Category> = s.object<Category>({
  category: s.optional(s.string()),
  pages: s.optional(s.array(s.number())),
  pageCount: s.optional(s.number()),
  confidence: s.optional(s.number()),
  _keysMap: {
    pageCount: "page_count",
  },
});
