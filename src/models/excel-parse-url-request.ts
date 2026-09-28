import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { TableClustering, tableClusteringSchema } from "./table-clustering.js";

/** Excel parse request for JSON / form-urlencoded callers (URL input only). */
export type ExcelParseUrlRequest = {
  /** Drop hidden sheets/rows/cols/styling from the output. Defaults to `false`. @default false */
  excludeHidden?: boolean | null;
  /** When excluding hidden content, also drop hidden columns. Defaults to `true`. @default true */
  excludeHiddenCols?: boolean | null;
  /** When excluding hidden content, also drop hidden rows. Defaults to `true`. @default true */
  excludeHiddenRows?: boolean | null;
  /** When excluding hidden content, also drop hidden sheets. Defaults to `true`. @default true */
  excludeHiddenSheets?: boolean | null;
  /**
   * When excluding hidden content, also drop embedded/pasted images. Defaults to `false`.
   *
   * @default false
   */
  excludeImages?: boolean | null;
  /** When excluding hidden content, also drop styling. Defaults to `true`. @default true */
  excludeStyling?: boolean | null;
  /**
   * Reserved field. Persisted in the task configuration but currently has no effect on retention —
   * Excel tasks use the same `Task::new_fast` creation path as `POST /parse`, which does not set
   * the task's `expires_at` column. See the same note on `ParseCreateRequest.expires_in`.
   */
  expiresIn?: number | null;
  /** Max rows per split segment when `split_large_tables`. Defaults to `50`. @default 50 */
  maxRowsPerSegment?: number | null;
  /** Split large tables into smaller segments. Defaults to `true`. @default true */
  splitLargeTables?: boolean | null;
  /**
   * Table clustering effort: `accurate` (default), `fast`, or `off`.
   *
   * @default TableClustering.Accurate
   */
  tableClustering?: TableClustering | null;
  /** Presigned or public URL of the workbook to fetch. Required if `file` is not provided. */
  url: string;
};

export const excelParseUrlRequestSchema: Schema<ExcelParseUrlRequest> = s.object<ExcelParseUrlRequest>({
  excludeHidden: s.defaulted(s.nullable(s.boolean()), false),
  excludeHiddenCols: s.defaulted(s.nullable(s.boolean()), true),
  excludeHiddenRows: s.defaulted(s.nullable(s.boolean()), true),
  excludeHiddenSheets: s.defaulted(s.nullable(s.boolean()), true),
  excludeImages: s.defaulted(s.nullable(s.boolean()), false),
  excludeStyling: s.defaulted(s.nullable(s.boolean()), true),
  expiresIn: s.optionalNullable(s.number()),
  maxRowsPerSegment: s.defaulted(s.nullable(s.number()), 50),
  splitLargeTables: s.defaulted(s.nullable(s.boolean()), true),
  tableClustering: s.defaulted(s.nullable(s.lazy(() => tableClusteringSchema)), TableClustering.Accurate),
  url: s.string(),
  _keysMap: {
    excludeHidden: "exclude_hidden",
    excludeHiddenCols: "exclude_hidden_cols",
    excludeHiddenRows: "exclude_hidden_rows",
    excludeHiddenSheets: "exclude_hidden_sheets",
    excludeImages: "exclude_images",
    excludeStyling: "exclude_styling",
    expiresIn: "expires_in",
    maxRowsPerSegment: "max_rows_per_segment",
    splitLargeTables: "split_large_tables",
    tableClustering: "table_clustering",
  },
});
