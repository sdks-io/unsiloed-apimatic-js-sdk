import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { fileSchema, type File } from "./file.js";

/**
 * Always present; `null` until status is `completed`. Split results (only present when status is
 * completed)
 */
export type Result2 = {
  /** Whether splitting succeeded */
  success?: boolean;
  /** Success/failure message */
  message?: string;
  /** Array of split PDF files */
  files?: File[];
};

export const result2Schema: Schema<Result2> = s.object<Result2>({
  success: s.optional(s.boolean()),
  message: s.optional(s.string()),
  files: s.optional(s.array(s.lazy(() => fileSchema))),
});
