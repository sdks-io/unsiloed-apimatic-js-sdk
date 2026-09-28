import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { quotaDataSchema, type QuotaData } from "./quota-data.js";

export type InsufficientQuotaErrorError = {
  message?: string;
  status?: string;
  quotaData?: QuotaData;
};

export const insufficientQuotaErrorErrorSchema: Schema<InsufficientQuotaErrorError> =
  s.object<InsufficientQuotaErrorError>({
    message: s.optional(s.string()),
    status: s.optional(s.string()),
    quotaData: s.optional(s.lazy(() => quotaDataSchema)),
    _keysMap: {
      quotaData: "quota_data",
    },
  });
