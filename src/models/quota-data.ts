import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type QuotaData = {
  remaining?: number;
};

export const quotaDataSchema: Schema<QuotaData> = s.object<QuotaData>({
  remaining: s.optional(s.number()),
});
