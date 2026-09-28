import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

export const GenerationStrategy = {
  Vlm: "VLM",
  Auto: "Auto",
} as const;
export type GenerationStrategy = (typeof GenerationStrategy)[keyof typeof GenerationStrategy] | (string & {});

export const generationStrategySchema: EnumSchema<GenerationStrategy> =
  s.enumOf<GenerationStrategy>(GenerationStrategy);
