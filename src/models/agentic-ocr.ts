import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Enable per-segment agentic OCR for higher accuracy. Pass `"standard"` or `"advanced"`. */
export const AgenticOcr = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type AgenticOcr = (typeof AgenticOcr)[keyof typeof AgenticOcr] | (string & {});

export const agenticOcrSchema: EnumSchema<AgenticOcr> = s.enumOf<AgenticOcr>(AgenticOcr);
