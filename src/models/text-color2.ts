import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/** Optional text color (RGB) provided by OCR engine */
export type TextColor2 = {
  b: number;
  g: number;
  hex: string;
  r: number;
};

export const textColor2Schema: Schema<TextColor2> = s.object<TextColor2>({
  b: s.number(),
  g: s.number(),
  hex: s.string(),
  r: s.number(),
});
