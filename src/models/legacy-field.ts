import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type LegacyField = {
  value: Record<string, unknown>;
  score: number;
};

export const legacyFieldSchema: Schema<LegacyField> = s.object<LegacyField>({
  value: s.record(s.string(), s.unknown()),
  score: s.number(),
});
