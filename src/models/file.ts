import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type File = {
  /** Name of the split file */
  name?: string;
  /** Relative path to the file */
  path?: string;
  /** File type (always 'file') */
  type?: string;
  /** Unique file identifier */
  fileId?: string;
  /**
   * Presigned download URL for the split file. Expires roughly an hour after the response is
   * generated, so download the file straight away rather than storing the URL. Re-issue this
   * request for a fresh URL.
   */
  fullPath?: string;
  /** Classification confidence score (0-1) */
  confidenceScore?: number;
};

export const fileSchema: Schema<File> = s.object<File>({
  name: s.optional(s.string()),
  path: s.optional(s.string()),
  type: s.optional(s.string()),
  fileId: s.optional(s.string()),
  fullPath: s.optional(s.string()),
  confidenceScore: s.optional(s.number()),
  _keysMap: {
    fullPath: "full_path",
    confidenceScore: "confidence_score",
  },
});
