import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { detail1Schema, type Detail1 } from "./unions/detail1.js";

/** Error body with a single `detail` field. */
export type DetailError = {
  /** Error message; for 422 validation errors, a list of the missing or malformed fields. */
  detail: Detail1;
};

export const detailErrorSchema: Schema<DetailError> = s.object<DetailError>({
  detail: detail1Schema,
});
