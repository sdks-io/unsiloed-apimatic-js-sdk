import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { detailSchema, type Detail } from "./detail.js";

export type Classify402Error1 = {
  detail?: Detail;
};

export const classify402Error1Schema: Schema<Classify402Error1> = s.object<Classify402Error1>({
  detail: s.optional(s.lazy(() => detailSchema)),
});
