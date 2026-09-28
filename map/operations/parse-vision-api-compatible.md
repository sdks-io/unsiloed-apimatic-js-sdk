<!-- Generated file — do not edit; regenerated with the SDK. -->

# ParseVisionApiCompatible — operations

Accessor: `client.parseVisionApiCompatible` · Source: `src/resources/parse-vision-api-compatible.ts` · 3 operations · Request and error types: namespace `ParseVisionApiCompatible`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `unsiloed-apimatic-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createParseTask

- **Signature**: `createParseTask(request: ParseVisionApiCompatible.CreateParseTaskRequest, options?: RequestOptions): ApiPromise<ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskError>`
- **Wire**: `POST /parse`
- **Auth**: `apiKeyAuth`
- **Request body**: `multipart/form-data` — every field marked `form`. `file` is a file part, framed as bytes rather than encoded. The platform writes the boundary, or the SDK does when a file part streams
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `ParseCreateResponse`
- **Error**: `ParseVisionApiCompatible.CreateParseTaskError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] `string` · `"error401"` [401] no body · `"insufficientQuotaError"` [402] `InsufficientQuotaError` · `"error403"` [403] no body · `"fileTooLargeError"` [413] `FileTooLargeError` · `"rateLimitError"` [429] `RateLimitError` · `"error500"` [500] `string` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `ParseVisionApiCompatible.CreateParseTaskRequest` (32):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `agenticOcr` | `form` | `agentic_ocr` | `AgenticOcr2` | no | — |
| `chunkProcessing` | `form` | `chunk_processing` | `string` | no | — |
| `enhanceReadingOrder` | `form` | `enhance_reading_order` | `boolean` | no | `false` |
| `errorHandling` | `form` | `error_handling` | `ErrorHandling2` | no | `ErrorHandling2.Continue` |
| `expiresIn` | `form` | `expires_in` | `number` | no | — |
| `exportFormat` | `form` | `export_format` | `string` | no | — |
| `extractColors` | `form` | `extract_colors` | `boolean` | no | `false` |
| `extractLinks` | `form` | `extract_links` | `boolean` | no | `false` |
| `extractStrikethrough` | `form` | `extract_strikethrough` | `boolean` | no | `false` |
| `file` | `form` | — | `FileInput` | no | — |
| `layoutAnalysis` | `form` | `layout_analysis` | `LayoutAnalysis2` | no | `LayoutAnalysis2.SmartLayoutDetection` |
| `segmentationVersion` | `form` | `segmentation_version` | `SegmentationVersion3` | no | `SegmentationVersion3.V1` |
| `llmProcessing` | `form` | `llm_processing` | `string` | no | — |
| `mergeTables` | `form` | `merge_tables` | `boolean` | no | `false` |
| `ocrEngine` | `form` | `ocr_engine` | `string` | no | `"UnsiloedHawk"` |
| `ocrStrategy` | `form` | `ocr_strategy` | `OcrStrategy3` | no | `OcrStrategy3.AutoDetection` |
| `outputFields` | `form` | `output_fields` | `string` | no | — |
| `pageRange` | `form` | `page_range` | `string` | no | — |
| `segmentAnalysis` | `form` | `segment_analysis` | `string` | no | — |
| `segmentFilter` | `form` | `segment_filter` | `string` | no | `"all"` |
| `segmentProcessing` | `form` | `segment_processing` | `string` | no | — |
| `segmentTypeNaming` | `form` | `segment_type_naming` | `SegmentTypeNaming2` | no | `SegmentTypeNaming2.Unsiloed` |
| `url` | `form` | — | `string` | no | — |
| `useHighResolution` | `form` | `use_high_resolution` | `boolean` | no | `false` |
| `validateSegments` | `form` | `validate_segments` | `string` | no | — |
| `validateTableSegments` | `form` | `validate_table_segments` | `boolean` | no | `false` |
| `xmlCitation` | `form` | `xml_citation` | `boolean` | no | `false` |
| `mergeBatchSize` | `form` | `merge_batch_size` | `number` | no | `20` |
| `detectPii` | `form` | `detect_pii` | `boolean` | no | `false` |
| `piiBlockSeverity` | `form` | `pii_block_severity` | `PiiBlockSeverity1` | no | `PiiBlockSeverity1.Any` |
| `piiEngine` | `form` | `pii_engine` | `PiiEngine1` | no | `PiiEngine1.Standard` |
| `responseProfile` | `form` | `response_profile` | `ResponseProfile3` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `AgenticOcr2` | `agenticOcr2Schema` | `src/models/agentic-ocr2.ts` |
| `ErrorHandling2` | `errorHandling2Schema` | `src/models/error-handling2.ts` |
| `LayoutAnalysis2` | `layoutAnalysis2Schema` | `src/models/layout-analysis2.ts` |
| `SegmentationVersion3` | `segmentationVersion3Schema` | `src/models/segmentation-version3.ts` |
| `OcrStrategy3` | `ocrStrategy3Schema` | `src/models/ocr-strategy3.ts` |
| `SegmentTypeNaming2` | `segmentTypeNaming2Schema` | `src/models/segment-type-naming2.ts` |
| `PiiBlockSeverity1` | `piiBlockSeverity1Schema` | `src/models/pii-block-severity1.ts` |
| `PiiEngine1` | `piiEngine1Schema` | `src/models/pii-engine1.ts` |
| `ResponseProfile3` | `responseProfile3Schema` | `src/models/response-profile3.ts` |
| `ParseCreateResponse` | `parseCreateResponseSchema` | `src/models/parse-create-response.ts` |
| `InsufficientQuotaError` | `insufficientQuotaErrorSchema` | `src/models/insufficient-quota-error.ts` |
| `FileTooLargeError` | `fileTooLargeErrorSchema` | `src/models/file-too-large-error.ts` |
| `RateLimitError` | `rateLimitErrorSchema` | `src/models/rate-limit-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

### createParseTaskExcel

- **Signature**: `createParseTaskExcel(request: ParseVisionApiCompatible.CreateParseTaskExcelRequest, options?: RequestOptions): ApiPromise<ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskExcelError>`
- **Wire**: `POST /parse/excel`
- **Auth**: `apiKeyAuth`
- **Request body**: `multipart/form-data` — every field marked `form`. `file` is a file part, framed as bytes rather than encoded. The platform writes the boundary, or the SDK does when a file part streams
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `ParseCreateResponse`
- **Error**: `ParseVisionApiCompatible.CreateParseTaskExcelError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error400"` [400] `string` · `"error401"` [401] no body · `"insufficientQuotaError"` [402] `InsufficientQuotaError` · `"error403"` [403] no body · `"fileTooLargeError"` [413] `FileTooLargeError` · `"rateLimitError"` [429] `RateLimitError` · `"error500"` [500] `string` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `ParseVisionApiCompatible.CreateParseTaskExcelRequest` (12):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `excludeHidden` | `form` | `exclude_hidden` | `boolean` | no | `false` |
| `excludeHiddenCols` | `form` | `exclude_hidden_cols` | `boolean` | no | `true` |
| `excludeHiddenRows` | `form` | `exclude_hidden_rows` | `boolean` | no | `true` |
| `excludeHiddenSheets` | `form` | `exclude_hidden_sheets` | `boolean` | no | `true` |
| `excludeImages` | `form` | `exclude_images` | `boolean` | no | `false` |
| `excludeStyling` | `form` | `exclude_styling` | `boolean` | no | `true` |
| `expiresIn` | `form` | `expires_in` | `number` | no | — |
| `file` | `form` | — | `FileInput` | no | — |
| `maxRowsPerSegment` | `form` | `max_rows_per_segment` | `number` | no | `50` |
| `splitLargeTables` | `form` | `split_large_tables` | `boolean` | no | `true` |
| `tableClustering` | `form` | `table_clustering` | `TableClustering` | no | `TableClustering.Accurate` |
| `url` | `form` | — | `string` | no | — |

| Type | Schema value | Source |
| --- | --- | --- |
| `TableClustering` | `tableClusteringSchema` | `src/models/table-clustering.ts` |
| `ParseCreateResponse` | `parseCreateResponseSchema` | `src/models/parse-create-response.ts` |
| `InsufficientQuotaError` | `insufficientQuotaErrorSchema` | `src/models/insufficient-quota-error.ts` |
| `FileTooLargeError` | `fileTooLargeErrorSchema` | `src/models/file-too-large-error.ts` |
| `RateLimitError` | `rateLimitErrorSchema` | `src/models/rate-limit-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

### getParseTask

- **Signature**: `getParseTask(request: ParseVisionApiCompatible.GetParseTaskRequest, options?: RequestOptions): ApiPromise<ParseGetResponse, ParseVisionApiCompatible.GetParseTaskError>`
- **Wire**: `GET /parse/{job_id}`
- **Auth**: `apiKeyAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ParseGetResponse`
- **Error**: `ParseVisionApiCompatible.GetParseTaskError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"error401"` [401] `string` · `"error403"` [403] `string` · `"errorEnvelope"` [404] `ErrorEnvelope` · `"errorEnvelope2"` [500] `ErrorEnvelope` · `"errorEnvelope3"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `ParseVisionApiCompatible.GetParseTaskRequest` (8):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `jobId` | `path` | `job_id` | `string` | yes |
| `includeChunks` | `query` | `include_chunks` | `boolean` | no |
| `base64Urls` | `query` | `base64_urls` | `boolean` | no |
| `outputFile` | `query` | `output_file` | `boolean` | no |
| `enhancedTable` | `query` | `enhanced_table` | `boolean` | no |
| `mergeTables` | `query` | `merge_tables` | `boolean` | no |
| `includeUrl` | `query` | `include_url` | `boolean` | no |
| `segmentFilter` | `query` | `segment_filter` | `string` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ParseGetResponse` | `parseGetResponseSchema` | `src/models/parse-get-response.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

