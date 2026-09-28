import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Controls the setting for the chunking and post-processing of each chunk. */
export type ChunkProcessing = {
  /** Whether to ignore headers and footers in the chunking process. @default false */
  ignoreHeadersAndFooters?: boolean;
  /**
   * The target number of words in each chunk. If 0, each chunk will contain a single segment.
   *
   * @default 512
   */
  targetLength?: number;
  tokenizer?: Record<string, unknown>;
};

export const chunkProcessingSchema: Schema<ChunkProcessing> = s.object<ChunkProcessing>({
  ignoreHeadersAndFooters: s.defaulted(s.boolean(), false),
  targetLength: s.defaulted(s.number(), 512),
  tokenizer: s.optional(s.record(s.string(), s.unknown())),
  _keysMap: {
    ignoreHeadersAndFooters: "ignore_headers_and_footers",
    targetLength: "target_length",
  },
});
