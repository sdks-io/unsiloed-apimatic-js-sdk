import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import { tokenizerTypeSchema, type TokenizerType } from "../tokenizer-type.js";
import { tokenizerType1Schema, type TokenizerType1 } from "../tokenizer-type1.js";

/** The tokenizer to use for the chunking process. */
export type TokenizerType2 = TokenizerType | TokenizerType1;

export const tokenizerType2Schema: Schema<TokenizerType2> = s.of<TokenizerType2>(
  s.union([s.lazy(() => tokenizerTypeSchema), s.lazy(() => tokenizerType1Schema)]),
);
