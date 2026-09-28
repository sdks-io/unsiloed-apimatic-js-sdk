import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Enable per-segment agentic OCR for higher accuracy. Pass `"standard"` or `"advanced"`. */
export const AgenticOcr2 = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type AgenticOcr2 = (typeof AgenticOcr2)[keyof typeof AgenticOcr2] | (string & {});

export const agenticOcr2Schema: EnumSchema<AgenticOcr2> = s.enumOf<AgenticOcr2>(AgenticOcr2);
