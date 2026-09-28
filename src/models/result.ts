import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * Present when `output_file=true`: holds `output_file_url`, a presigned URL to the raw output JSON.
 */
export type Result = {
  outputFileUrl?: string;
};

export const resultSchema: Schema<Result> = s.object<Result>({
  outputFileUrl: s.optional(s.string()),
  _keysMap: {
    outputFileUrl: "output_file_url",
  },
});
