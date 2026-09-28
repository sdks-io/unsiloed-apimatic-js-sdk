import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { quotaData1Schema, type QuotaData1 } from "./quota-data1.js";

export type Detail = {
  message?: string;
  quotaData?: QuotaData1;
};

export const detailSchema: Schema<Detail> = s.object<Detail>({
  message: s.optional(s.string()),
  quotaData: s.optional(s.lazy(() => quotaData1Schema)),
  _keysMap: {
    quotaData: "quota_data",
  },
});
