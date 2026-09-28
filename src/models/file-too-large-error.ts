import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type FileTooLargeError = {
  error?: string;
  message?: string;
  fileSizeBytes?: number;
  maxFileSizeBytes?: number;
};

export const fileTooLargeErrorSchema: Schema<FileTooLargeError> = s.object<FileTooLargeError>({
  error: s.optional(s.string()),
  message: s.optional(s.string()),
  fileSizeBytes: s.optional(s.number()),
  maxFileSizeBytes: s.optional(s.number()),
  _keysMap: {
    fileSizeBytes: "file_size_bytes",
    maxFileSizeBytes: "max_file_size_bytes",
  },
});
