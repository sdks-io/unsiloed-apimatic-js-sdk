import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type Score = {
  /** Confidence the value was located in the document; `0.0` when citations are disabled. */
  groundingScore?: number;
  /** Confidence in the extracted value itself. */
  extractionScore?: number | null;
};

export const scoreSchema: Schema<Score> = s.object<Score>({
  groundingScore: s.optional(s.number()),
  extractionScore: s.optionalNullable(s.number()),
  _keysMap: {
    groundingScore: "grounding_score",
    extractionScore: "extraction_score",
  },
});
