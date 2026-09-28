import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Model tier to use for extraction. Options: alpha, beta, gamma (default, recommended), delta */
export const Model1 = {
  Alpha: "alpha",
  Beta: "beta",
  Gamma: "gamma",
  Delta: "delta",
} as const;
export type Model1 = (typeof Model1)[keyof typeof Model1] | (string & {});

export const model1Schema: EnumSchema<Model1> = s.enumOf<Model1>(Model1);
