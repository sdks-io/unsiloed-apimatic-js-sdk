import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type OrgGetUsage404Error1 = {
  detail?: string;
};

export const orgGetUsage404Error1Schema: Schema<OrgGetUsage404Error1> = s.object<OrgGetUsage404Error1>({
  detail: s.optional(s.string()),
});
