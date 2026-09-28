import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const Engine = {
  Standard: "standard",
  Advanced: "advanced",
} as const;
export type Engine = (typeof Engine)[keyof typeof Engine] | (string & {});

export const engineSchema: EnumSchema<Engine> = s.enumOf<Engine>(Engine);
