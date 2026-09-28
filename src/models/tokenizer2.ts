import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Use one of the predefined tokenizer types */
export const Tokenizer2 = {
  Word: "Word",
  Cl100KBase: "Cl100kBase",
  XlmRobertaBase: "XlmRobertaBase",
  BertBaseUncased: "BertBaseUncased",
} as const;
export type Tokenizer2 = (typeof Tokenizer2)[keyof typeof Tokenizer2] | (string & {});

export const tokenizer2Schema: EnumSchema<Tokenizer2> = s.enumOf<Tokenizer2>(Tokenizer2);
