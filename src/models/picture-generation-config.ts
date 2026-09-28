import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { ContentSource1, contentSource1Schema } from "./content-source1.js";
import { embedSourceSchema, type EmbedSource } from "./embed-source.js";
import { GenerationStrategy, generationStrategySchema } from "./generation-strategy.js";
import { PictureCroppingStrategy, pictureCroppingStrategySchema } from "./picture-cropping-strategy.js";
import { translationConfig1Schema, type TranslationConfig1 } from "./translation-config1.js";

export type PictureGenerationConfig = {
  /** @default ContentSource1.Ocr */
  contentSource?: ContentSource1;
  /** @default PictureCroppingStrategy.All */
  cropImage?: PictureCroppingStrategy;
  embedSources?: EmbedSource[];
  /** Use the full page image as context for VLM generation @default false */
  extendedContext?: boolean;
  /** @default GenerationStrategy.Auto */
  html?: GenerationStrategy;
  /** @default GenerationStrategy.Vlm */
  markdown?: GenerationStrategy;
  /** Model ID for VLM generation */
  modelId?: string | null;
  /**
   * When true, text-bearing pictures (forms, handwritten pages, scanned documents, screenshots of
   * text) are transcribed verbatim by the VLM instead of described/summarized. Only takes effect
   * for segments that actually contain OCR text — true figures (photos, charts, diagrams with
   * little text) still get the standard description. Default: false.
   *
   * @default false
   */
  transcribeText?: boolean;
  translation?: TranslationConfig1 | null;
  /** Prompt for the VLM model */
  vlm?: string | null;
};

export const pictureGenerationConfigSchema: Schema<PictureGenerationConfig> =
  s.object<PictureGenerationConfig>({
    contentSource: s.defaulted(contentSource1Schema, ContentSource1.Ocr),
    cropImage: s.defaulted(pictureCroppingStrategySchema, PictureCroppingStrategy.All),
    embedSources: s.optional(s.array(s.lazy(() => embedSourceSchema))),
    extendedContext: s.defaulted(s.boolean(), false),
    html: s.defaulted(generationStrategySchema, GenerationStrategy.Auto),
    markdown: s.defaulted(generationStrategySchema, GenerationStrategy.Vlm),
    modelId: s.optionalNullable(s.string()),
    transcribeText: s.defaulted(s.boolean(), false),
    translation: s.optionalNullable(s.lazy(() => translationConfig1Schema)),
    vlm: s.optionalNullable(s.string()),
    _keysMap: {
      contentSource: "content_source",
      cropImage: "crop_image",
      embedSources: "embed_sources",
      extendedContext: "extended_context",
      modelId: "model_id",
      transcribeText: "transcribe_text",
    },
  });
