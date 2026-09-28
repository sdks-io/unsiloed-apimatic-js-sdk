import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type PageResult = {
  /** Page number */
  page?: number;
  /** Classification for this page */
  classification?: string;
  /** Confidence score for this page */
  confidence?: number;
  /** Whether this page was classified successfully */
  success?: boolean;
  /** The model's raw classification output for this page */
  rawResult?: string;
  /** Error message when `success` is false. */
  error?: string;
};

export const pageResultSchema: Schema<PageResult> = s.object<PageResult>({
  page: s.optional(s.number()),
  classification: s.optional(s.string()),
  confidence: s.optional(s.number()),
  success: s.optional(s.boolean()),
  rawResult: s.optional(s.string()),
  error: s.optional(s.string()),
  _keysMap: {
    rawResult: "raw_result",
  },
});
