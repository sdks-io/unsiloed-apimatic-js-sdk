import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Text color in RGB format */
export type TextColor = {
  b: number;
  g: number;
  hex: string;
  r: number;
};

export const textColorSchema: Schema<TextColor> = s.object<TextColor>({
  b: s.number(),
  g: s.number(),
  hex: s.string(),
  r: s.number(),
});
