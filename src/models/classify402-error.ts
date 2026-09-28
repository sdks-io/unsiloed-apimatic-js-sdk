import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { detailSchema, type Detail } from "./detail.js";

export type Classify402Error = {
  detail?: Detail;
};

export const classify402ErrorSchema: Schema<Classify402Error> = s.object<Classify402Error>({
  detail: s.optional(s.lazy(() => detailSchema)),
});
