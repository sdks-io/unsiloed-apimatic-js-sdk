import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type OrgGetUsage401Error1 = {
  detail?: string;
};

export const orgGetUsage401Error1Schema: Schema<OrgGetUsage401Error1> = s.object<OrgGetUsage401Error1>({
  detail: s.optional(s.string()),
});
