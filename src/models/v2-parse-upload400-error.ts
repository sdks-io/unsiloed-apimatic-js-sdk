import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type V2ParseUpload400Error = {
  error?: string;
};

export const v2ParseUpload400ErrorSchema: Schema<V2ParseUpload400Error> = s.object<V2ParseUpload400Error>({
  error: s.optional(s.string()),
});
