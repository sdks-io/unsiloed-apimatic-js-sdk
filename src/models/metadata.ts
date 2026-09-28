import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type Metadata = {
  /** Extracted field names in order. */
  order?: string[];
  /** The JSON schema used for extraction. */
  schema?: Record<string, unknown>;
  pageCount?: number;
};

export const metadataSchema: Schema<Metadata> = s.object<Metadata>({
  order: s.optional(s.array(s.string())),
  schema: s.optional(s.record(s.string(), s.unknown())),
  pageCount: s.optional(s.number()),
  _keysMap: {
    pageCount: "page_count",
  },
});
