import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";

/**
 * Excel-specific parsing configuration, forwarded verbatim to the Excel pipeline service
 * (`services/Excel_pipeline` `POST /parse`). These are the ONLY knobs the Excel pipeline honors —
 * none of the PDF parsing fields (OCR, layout, segments) apply. Defaults mirror the service's own
 * `SpreadsheetConfig` defaults so an omitted value behaves identically to not setting it. Set on a
 * task via the dedicated `POST /parse/excel` endpoint; `None` for every non-Excel task.
 */
export type ExcelConfiguration = {
  /** Include cell background/font colors (only when `cell_metadata`). Default true. */
  cellColors?: boolean;
  /** Include cell color, formula, and dropdown metadata in the output. Default false. */
  cellMetadata?: boolean;
  /** Include data-validation dropdown options (only when `cell_metadata`). Default true. */
  dropdowns?: boolean;
  /** Drop hidden sheets/rows/cols/styling from the output. Default false. */
  excludeHidden?: boolean;
  /** When excluding hidden content, also drop hidden columns. Default true. */
  excludeHiddenCols?: boolean;
  /** When excluding hidden content, also drop hidden rows. Default true. */
  excludeHiddenRows?: boolean;
  /** When excluding hidden content, also drop hidden sheets. Default true. */
  excludeHiddenSheets?: boolean;
  /** When excluding hidden content, also drop embedded/pasted images. Default false. */
  excludeImages?: boolean;
  /** When excluding hidden content, also drop styling. Default true. */
  excludeStyling?: boolean;
  /** Include cell formulas (only when `cell_metadata`). Default true. */
  formulas?: boolean;
  /** Max rows per split segment when `split_large_tables`. Default 50. */
  maxRowsPerSegment?: number;
  /** Split large tables into smaller segments. Default true. */
  splitLargeTables?: boolean;
  /** Table clustering effort: `accurate` (default), `fast`, or `off`. */
  tableClustering?: string;
};

export const excelConfigurationSchema: Schema<ExcelConfiguration> = s.object<ExcelConfiguration>({
  cellColors: s.optional(s.boolean()),
  cellMetadata: s.optional(s.boolean()),
  dropdowns: s.optional(s.boolean()),
  excludeHidden: s.optional(s.boolean()),
  excludeHiddenCols: s.optional(s.boolean()),
  excludeHiddenRows: s.optional(s.boolean()),
  excludeHiddenSheets: s.optional(s.boolean()),
  excludeImages: s.optional(s.boolean()),
  excludeStyling: s.optional(s.boolean()),
  formulas: s.optional(s.boolean()),
  maxRowsPerSegment: s.optional(s.number()),
  splitLargeTables: s.optional(s.boolean()),
  tableClustering: s.optional(s.string()),
  _keysMap: {
    cellColors: "cell_colors",
    cellMetadata: "cell_metadata",
    excludeHidden: "exclude_hidden",
    excludeHiddenCols: "exclude_hidden_cols",
    excludeHiddenRows: "exclude_hidden_rows",
    excludeHiddenSheets: "exclude_hidden_sheets",
    excludeImages: "exclude_images",
    excludeStyling: "exclude_styling",
    maxRowsPerSegment: "max_rows_per_segment",
    splitLargeTables: "split_large_tables",
    tableClustering: "table_clustering",
  },
});
