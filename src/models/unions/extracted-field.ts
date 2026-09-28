import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import { legacyFieldSchema, type LegacyField } from "../legacy-field.js";
import { scoredFieldSchema, type ScoredField } from "../scored-field.js";

/**
 * One extracted field. Citation-enabled jobs and the default `gamma` tier return `{value,
 * score{grounding_score, extraction_score}, citation}`; `alpha`/`beta`/`delta` without citations
 * return the legacy flat `{value, score: number}`. For array fields `value` is an array of objects
 * whose sub-fields are themselves ExtractedField objects.
 */
export type ExtractedField = ScoredField | LegacyField;

export const extractedFieldSchema: Schema<ExtractedField> = s.of<ExtractedField>(
  s.union([s.lazy(() => scoredFieldSchema), s.lazy(() => legacyFieldSchema)]),
);
