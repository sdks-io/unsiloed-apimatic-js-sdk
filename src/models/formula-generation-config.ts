import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { ContentSource1, contentSource1Schema } from "./content-source1.js";
import { CroppingStrategy, croppingStrategySchema } from "./cropping-strategy.js";
import { embedSourceSchema, type EmbedSource } from "./embed-source.js";
import { GenerationStrategy, generationStrategySchema } from "./generation-strategy.js";
import { translationConfig1Schema, type TranslationConfig1 } from "./translation-config1.js";

/** Generation config for `Formula` segments (default html `Auto`, markdown `VLM`). */
export type FormulaGenerationConfig = {
  /** @default ContentSource1.Ocr */
  contentSource?: ContentSource1;
  /** @default CroppingStrategy.Auto */
  cropImage?: CroppingStrategy;
  embedSources?: EmbedSource[];
  /** Use the full page image as context for VLM generation @default false */
  extendedContext?: boolean;
  /** @default GenerationStrategy.Auto */
  html?: GenerationStrategy;
  /** @default GenerationStrategy.Vlm */
  markdown?: GenerationStrategy;
  /** Model ID for VLM generation */
  modelId?: string | null;
  translation?: TranslationConfig1 | null;
  /**
   * Use dedicated OCR for table processing to provide structured context to VLM (default: false)
   *
   * @default false
   */
  useTableOcr?: boolean;
  /** Prompt for the VLM model */
  vlm?: string | null;
};

export const formulaGenerationConfigSchema: Schema<FormulaGenerationConfig> =
  s.object<FormulaGenerationConfig>({
    contentSource: s.defaulted(contentSource1Schema, ContentSource1.Ocr),
    cropImage: s.defaulted(croppingStrategySchema, CroppingStrategy.Auto),
    embedSources: s.optional(s.array(s.lazy(() => embedSourceSchema))),
    extendedContext: s.defaulted(s.boolean(), false),
    html: s.defaulted(generationStrategySchema, GenerationStrategy.Auto),
    markdown: s.defaulted(generationStrategySchema, GenerationStrategy.Vlm),
    modelId: s.optionalNullable(s.string()),
    translation: s.optionalNullable(s.lazy(() => translationConfig1Schema)),
    useTableOcr: s.defaulted(s.boolean(), false),
    vlm: s.optionalNullable(s.string()),
    _keysMap: {
      contentSource: "content_source",
      cropImage: "crop_image",
      embedSources: "embed_sources",
      extendedContext: "extended_context",
      modelId: "model_id",
      useTableOcr: "use_table_ocr",
    },
  });
