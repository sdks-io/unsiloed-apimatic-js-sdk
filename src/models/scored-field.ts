import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { extractionCitationSchema, type ExtractionCitation } from "./extraction-citation.js";
import { scoreSchema, type Score } from "./score.js";

export type ScoredField = {
  value: Record<string, unknown>;
  score: Score;
  citation?: ExtractionCitation | null;
};

export const scoredFieldSchema: Schema<ScoredField> = s.object<ScoredField>({
  value: s.record(s.string(), s.unknown()),
  score: scoreSchema,
  citation: s.optionalNullable(s.lazy(() => extractionCitationSchema)),
});
