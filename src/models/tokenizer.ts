import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Common tokenizers used for text processing. */
export const Tokenizer = {
  Word: "Word",
  Cl100KBase: "Cl100kBase",
  XlmRobertaBase: "XlmRobertaBase",
  BertBaseUncased: "BertBaseUncased",
} as const;
export type Tokenizer = (typeof Tokenizer)[keyof typeof Tokenizer] | (string & {});

export const tokenizerSchema: EnumSchema<Tokenizer> = s.enumOf<Tokenizer>(Tokenizer);
