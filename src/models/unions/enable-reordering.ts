import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";

/**
 * Reorder pages within each category after classification, using content and page numbers to infer
 * the logical order. Only applied to categories that match more than one page.
 */
export type EnableReordering = boolean;

export const enableReorderingSchema: Schema<EnableReordering> = s.of<EnableReordering>(
  s.union([s.boolean()]),
);
