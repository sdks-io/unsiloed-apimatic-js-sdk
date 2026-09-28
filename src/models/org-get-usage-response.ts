import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

export type OrgGetUsageResponse = {
  /** Unique identifier for your organization */
  orgId?: string;
  /** Name of your organization */
  orgName?: string;
  /** Number of credits used in the current billing cycle */
  currentUsage?: number;
  /** Total monthly usage limit */
  usageLimit?: number;
  /** Number of credits remaining in the current billing cycle */
  remainingQuota?: number;
  /** Date of the last billing cycle reset (YYYY-MM-DD) */
  lastBilledDate?: string;
};

export const orgGetUsageResponseSchema: Schema<OrgGetUsageResponse> = s.object<OrgGetUsageResponse>({
  orgId: s.optional(s.string()),
  orgName: s.optional(s.string()),
  currentUsage: s.optional(s.number()),
  usageLimit: s.optional(s.number()),
  remainingQuota: s.optional(s.number()),
  lastBilledDate: s.optional(s.dateOnly()),
  _keysMap: {
    orgId: "org_id",
    orgName: "org_name",
    currentUsage: "current_usage",
    usageLimit: "usage_limit",
    remainingQuota: "remaining_quota",
    lastBilledDate: "last_billed_date",
  },
});
