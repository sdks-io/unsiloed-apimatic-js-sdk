import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { TableClustering, tableClusteringSchema } from "./table-clustering.js";

/**
 * Request body for `POST /parse/excel` (multipart/form-data).
 *
 * Excel parsing has its own configuration — none of the PDF parsing options (OCR, layout analysis,
 * segment processing) apply. Provide either `file` (binary .xls/.xlsx upload) or `url`, not both.
 * Every config field is optional and defaults to the Excel pipeline's own default.
 */
export type ExcelParseCreateRequest = {
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
  /** Excel workbook to process. Required if `url` is not provided. Supported: XLS, XLSX. */
  file?: Uint8Array;
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
  url?: string | null;
};

export const excelParseCreateRequestSchema: Schema<ExcelParseCreateRequest> =
  s.object<ExcelParseCreateRequest>({
    excludeHidden: s.defaulted(s.nullable(s.boolean()), false),
    excludeHiddenCols: s.defaulted(s.nullable(s.boolean()), true),
    excludeHiddenRows: s.defaulted(s.nullable(s.boolean()), true),
    excludeHiddenSheets: s.defaulted(s.nullable(s.boolean()), true),
    excludeImages: s.defaulted(s.nullable(s.boolean()), false),
    excludeStyling: s.defaulted(s.nullable(s.boolean()), true),
    expiresIn: s.optionalNullable(s.number()),
    file: s.optional(s.bytes()),
    maxRowsPerSegment: s.defaulted(s.nullable(s.number()), 50),
    splitLargeTables: s.defaulted(s.nullable(s.boolean()), true),
    tableClustering: s.defaulted(s.nullable(s.lazy(() => tableClusteringSchema)), TableClustering.Accurate),
    url: s.optionalNullable(s.string()),
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
