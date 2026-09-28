import * as s from "../core/validation/index.js";
import type { EnumSchema } from "../core/validation/schema.js";

/** Table clustering effort: `accurate` (default), `fast`, or `off`. */
export const TableClustering = {
  Accurate: "accurate",
  Fast: "fast",
  Off: "off",
} as const;
export type TableClustering = (typeof TableClustering)[keyof typeof TableClustering] | (string & {});

export const tableClusteringSchema: EnumSchema<TableClustering> = s.enumOf<TableClustering>(TableClustering);
