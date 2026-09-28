import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type QuotaData1 = {
  remaining?: number;
  message?: string;
};

export const quotaData1Schema: Schema<QuotaData1> = s.object<QuotaData1>({
  remaining: s.optional(s.number()),
  message: s.optional(s.string()),
});
