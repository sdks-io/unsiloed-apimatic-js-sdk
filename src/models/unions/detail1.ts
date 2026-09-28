import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";

/** Error message; for 422 validation errors, a list of the missing or malformed fields. */
export type Detail1 = string | Record<string, unknown>[] | Record<string, unknown>;

export const detail1Schema: Schema<Detail1> = s.of<Detail1>(
  s.union([s.string(), s.array(s.record(s.string(), s.unknown())), s.record(s.string(), s.unknown())]),
);
