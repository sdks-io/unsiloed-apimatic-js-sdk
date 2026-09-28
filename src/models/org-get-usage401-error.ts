import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type OrgGetUsage401Error = {
  detail?: string;
};

export const orgGetUsage401ErrorSchema: Schema<OrgGetUsage401Error> = s.object<OrgGetUsage401Error>({
  detail: s.optional(s.string()),
});
