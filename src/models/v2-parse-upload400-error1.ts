import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type V2ParseUpload400Error1 = {
  error?: string;
};

export const v2ParseUpload400Error1Schema: Schema<V2ParseUpload400Error1> = s.object<V2ParseUpload400Error1>({
  error: s.optional(s.string()),
});
