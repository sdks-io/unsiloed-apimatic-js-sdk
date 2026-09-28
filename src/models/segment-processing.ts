import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { autoGenerationConfigSchema, type AutoGenerationConfig } from "./auto-generation-config.js";
import { formulaGenerationConfigSchema, type FormulaGenerationConfig } from "./formula-generation-config.js";
import {
  keyValuePairGenerationConfigSchema,
  type KeyValuePairGenerationConfig,
} from "./key-value-pair-generation-config.js";
import { llmGenerationConfigSchema, type LlmGenerationConfig } from "./llm-generation-config.js";
import { pictureGenerationConfigSchema, type PictureGenerationConfig } from "./picture-generation-config.js";
import { tableGenerationConfigSchema, type TableGenerationConfig } from "./table-generation-config.js";

export type SegmentProcessing = {
  caption?: AutoGenerationConfig | null;
  footnote?: AutoGenerationConfig | null;
  formula?: FormulaGenerationConfig | null;
  /** Key-value pairs (segmentation v2). Default model `astra_v2`. */
  keyValuePair?: KeyValuePairGenerationConfig | null;
  listItem?: AutoGenerationConfig | null;
  page?: LlmGenerationConfig | null;
  pageFooter?: AutoGenerationConfig | null;
  pageHeader?: AutoGenerationConfig | null;
  picture?: PictureGenerationConfig | null;
  sectionHeader?: AutoGenerationConfig | null;
  table?: TableGenerationConfig | null;
  text?: AutoGenerationConfig | null;
  title?: AutoGenerationConfig | null;
};

export const segmentProcessingSchema: Schema<SegmentProcessing> = s.object<SegmentProcessing>({
  caption: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  footnote: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  formula: s.optionalNullable(s.lazy(() => formulaGenerationConfigSchema)),
  keyValuePair: s.optionalNullable(s.lazy(() => keyValuePairGenerationConfigSchema)),
  listItem: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  page: s.optionalNullable(s.lazy(() => llmGenerationConfigSchema)),
  pageFooter: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  pageHeader: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  picture: s.optionalNullable(s.lazy(() => pictureGenerationConfigSchema)),
  sectionHeader: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  table: s.optionalNullable(s.lazy(() => tableGenerationConfigSchema)),
  text: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  title: s.optionalNullable(s.lazy(() => autoGenerationConfigSchema)),
  _keysMap: {
    caption: "Caption",
    footnote: "Footnote",
    formula: "Formula",
    keyValuePair: "KeyValuePair",
    listItem: "ListItem",
    page: "Page",
    pageFooter: "PageFooter",
    pageHeader: "PageHeader",
    picture: "Picture",
    sectionHeader: "SectionHeader",
    table: "Table",
    text: "Text",
    title: "Title",
  },
});
