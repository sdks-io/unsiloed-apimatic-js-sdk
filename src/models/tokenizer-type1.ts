import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Use a custom tokenizer by specifying its model ID */
export type TokenizerType1 = {
  /** Use a custom tokenizer by specifying its model ID */
  string: string;
};

export const tokenizerType1Schema: Schema<TokenizerType1> = s.object<TokenizerType1>({
  string: s.string(),
  _keysMap: {
    string: "String",
  },
});
