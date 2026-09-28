import * as s from "../../core/validation/index.js";
import type { Schema } from "../../core/validation/schema.js";

/** Optional name identifying the schema, stored with the job for traceability. */
export type SchemaName = string;

export const schemaNameSchema: Schema<SchemaName> = s.of<SchemaName>(s.union([s.string()]));
