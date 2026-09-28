import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";
import { tokenizerTypeSchema, type TokenizerType } from "../tokenizer-type.js";
import { tokenizerType1Schema, type TokenizerType1 } from "../tokenizer-type1.js";

/**
 * Specifies which tokenizer to use for the chunking process.
 *
 * This type supports two ways of specifying a tokenizer:
 * 1. Using a predefined tokenizer from the `Tokenizer` enum
 * 2. Using a custom tokenizer by providing its model ID as a string
 */
export type TokenizerType21 = TokenizerType | TokenizerType1;

export const tokenizerType21Schema: Schema<TokenizerType21> = s.of<TokenizerType21>(
  s.union([s.lazy(() => tokenizerTypeSchema), s.lazy(() => tokenizerType1Schema)]),
);
