import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/**
 * Optional high-level response shape selector. `None` (default) preserves the legacy behavior
 * driven entirely by `output_fields`. `Some(Slim)` returns a minimal payload; `Some(Full)` forces
 * every field on; `Some(Custom)` honors `output_fields` verbatim.
 */
export const ResponseProfile4 = {
  Slim: "slim",
  Full: "full",
  Custom: "custom",
} as const;
export type ResponseProfile4 = (typeof ResponseProfile4)[keyof typeof ResponseProfile4] | (string & {});

export const responseProfile4Schema: EnumSchema<ResponseProfile4> =
  s.enumOf<ResponseProfile4>(ResponseProfile4);
