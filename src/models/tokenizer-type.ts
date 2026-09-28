import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { tokenizer2Schema, type Tokenizer2 } from "./tokenizer2.js";

/** Use one of the predefined tokenizer types */
export type TokenizerType = {
  /** Use one of the predefined tokenizer types */
  enum: Tokenizer2;
};

export const tokenizerTypeSchema: Schema<TokenizerType> = s.object<TokenizerType>({
  enum: tokenizer2Schema,
  _keysMap: {
    enum: "Enum",
  },
});
