import * as s from "../core/validation/index.js";
import type { Schema } from "../core/validation/schema.js";
import { ContentSource7, contentSource7Schema } from "./content-source7.js";
import { CroppingStrategy, croppingStrategySchema } from "./cropping-strategy.js";
import { embedSourceSchema, type EmbedSource } from "./embed-source.js";
import { GenerationStrategy, generationStrategySchema } from "./generation-strategy.js";
import { translationConfig1Schema, type TranslationConfig1 } from "./translation-config1.js";

export type AutoGenerationConfig = {
  /** @default ContentSource7.Ocr */
  contentSource?: ContentSource7;
  /** @default CroppingStrategy.Auto */
  cropImage?: CroppingStrategy;
  embedSources?: EmbedSource[];
  /** Use the full page image as context for VLM generation @default false */
  extendedContext?: boolean;
  /** @default GenerationStrategy.Auto */
  html?: GenerationStrategy;
  /** @default GenerationStrategy.Auto */
  markdown?: GenerationStrategy;
  translation?: TranslationConfig1 | null;
  vlm?: string | null;
};

export const autoGenerationConfigSchema: Schema<AutoGenerationConfig> = s.object<AutoGenerationConfig>({
  contentSource: s.defaulted(contentSource7Schema, ContentSource7.Ocr),
  cropImage: s.defaulted(croppingStrategySchema, CroppingStrategy.Auto),
  embedSources: s.optional(s.array(s.lazy(() => embedSourceSchema))),
  extendedContext: s.defaulted(s.boolean(), false),
  html: s.defaulted(generationStrategySchema, GenerationStrategy.Auto),
  markdown: s.defaulted(generationStrategySchema, GenerationStrategy.Auto),
  translation: s.optionalNullable(s.lazy(() => translationConfig1Schema)),
  vlm: s.optionalNullable(s.string()),
  _keysMap: {
    contentSource: "content_source",
    cropImage: "crop_image",
    embedSources: "embed_sources",
    extendedContext: "extended_context",
  },
});
