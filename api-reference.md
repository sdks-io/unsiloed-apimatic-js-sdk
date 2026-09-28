# Reference

> Source: [UnsiloedAiDocumentProcessingApiClient](src/client.ts)

## Health

> Source: [Health](src/resources/health.ts)

<details>
<summary><code>healthCheck(options?: RequestOptions): ApiPromise&lt;HealthResponse, ResponseError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Confirmation that the service can respond to requests.
Also surfaces lifetime telemetry-drop counters so silent loss is visible
without grepping pod logs.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.health.healthCheck();
  // TODO: Handle 'response' of type HealthResponse
} catch (err) {
  // TODO: Handle 'err' of type ResponseError, where 'err.payload' is of type Undeclared
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.health.healthCheck().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type HealthResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error' of type Undeclared
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.health.healthCheck()`

- **OnSuccess**: <code>[HealthResponse](src/models/health-response.ts)</code>
- **OnError**: throws <code>[ResponseError](src/core/response-error.ts)</code>, with `err.payload` of type <code>[Undeclared](src/core/response-error.ts)</code>

**As ApiResult**: `await client.health.healthCheck().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;HealthResponse, ResponseError&gt;</code>, with `result.value` of type <code>[HealthResponse](src/models/health-response.ts)</code>
- **OnError**: `result.error` of type <code>[Undeclared](src/core/response-error.ts)</code>, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## ParseVisionApiCompatible

> Source: [ParseVisionApiCompatible](src/resources/parse-vision-api-compatible.ts)

<details>
<summary><code>createParseTask(request: ParseVisionApiCompatible.CreateParseTaskRequest, options?: RequestOptions): ApiPromise&lt;ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Create a document processing task. Accepts two request shapes at the same path,
chosen by `Content-Type`:
- `multipart/form-data` — binary file upload (`file` field) or a `url` field.
- `application/json` (or `application/x-www-form-urlencoded`) — JSON body with a
  required `url` field; the `file` field is not applicable.

Every other configuration field is accepted under both content types and behaves
identically.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.parseVisionApiCompatible.createParseTask();
  // TODO: Handle 'response' of type ParseCreateResponse
} catch (err) {
  // TODO: Handle 'err' of type ParseVisionApiCompatible.CreateParseTaskError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.parseVisionApiCompatible.createParseTask().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ParseCreateResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>agenticOcr?</code> | <code>[AgenticOcr2](src/models/agentic-ocr2.ts)</code> | Enable per-segment agentic OCR for higher accuracy. Pass `"standard"` or `"advanced"`. |
| <code>chunkProcessing?</code> | <code>string</code> | JSON object for chunk processing configuration. |
| <code>enhanceReadingOrder?</code> | <code>boolean</code> | Reorder detected segments to follow the document's natural reading order.<br>Useful for multi-column layouts (newspapers, two- or three-column papers).<br>Has no effect when `layout_analysis="page_by_page"`. Defaults to `false`.<br>**Default**: false |
| <code>errorHandling?</code> | <code>[ErrorHandling2](src/models/error-handling2.ts)</code> | Error handling strategy for non-critical processing errors.<br>`Continue` (default) — proceed despite errors (e.g., LLM refusals).<br>`Fail` — stop and fail the task on any error.<br>**Default**: "Continue" |
| <code>expiresIn?</code> | <code>number</code> | Reserved field. Persisted in the task configuration but currently has no<br>effect on retention for this endpoint — `POST /parse` (multipart and JSON/Form)<br>does not set the task's `expires_at` column, and the cleanup job only deletes<br>`AwaitingUpload` rows past their `expires_at`. To get a presigned-upload TTL,<br>use `POST /v2/parse/upload` instead, where `expires_in` controls the upload<br>URL's validity. |
| <code>exportFormat?</code> | <code>string</code> | Export format(s) to generate after parsing: `docx`, `markdown`, `json`. The files are returned as presigned URLs in the `exports` field of `GET /parse/{job_id}`. In multipart/form requests send a JSON-encoded array string such as `["docx"]`, not a repeated field. |
| <code>extractColors?</code> | <code>boolean</code> | Transfer text color from the PDF text layer to OCR results. Defaults to `false`.<br>**Default**: false |
| <code>extractLinks?</code> | <code>boolean</code> | Attach hyperlink URLs from PDF annotations to OCR results. Defaults to `false`.<br>**Default**: false |
| <code>extractStrikethrough?</code> | <code>boolean</code> | Preserve strikethrough formatting in HTML/Markdown output. Defaults to `false`.<br>**Default**: false |
| <code>file?</code> | <code>FileInput</code> | Document file to process (multipart only). Required if `url` is not provided.<br>Supported formats: PDF, PNG, JPEG, TIFF, PPT, PPTX, DOC, DOCX. Use `POST /parse/excel` for XLS and XLSX; Excel files sent here return 400 `excel_not_supported_here`. Maximum upload size: 500 MB by default. |
| <code>layoutAnalysis?</code> | <code>[LayoutAnalysis2](src/models/layout-analysis2.ts)</code> | Layout analysis strategy.<br>`smart_layout_detection` (default) — detects layout elements using bounding boxes.<br>`page_by_page` — treats each page as a single segment; faster for simple documents, or `advanced_layout_detection` (VLM-based exhaustive segmentation with 14 element types).<br>**Default**: "smart_layout_detection" |
| <code>segmentationVersion?</code> | <code>[SegmentationVersion3](src/models/segmentation-version3.ts)</code> | Segmentation model version: `v1` (default) or `v2`.<br>`v2` is form-aware and additionally returns `KeyValuePair`, `Signature`, and `Seal`<br>segments. Unrecognized values fall back to `v1`.<br>**Default**: "v1" |
| <code>llmProcessing?</code> | <code>string</code> | JSON object for LLM processing configuration. |
| <code>mergeTables?</code> | <code>boolean</code> | Merge tables that span multiple pages into a single unified structure. Defaults to `false`.<br>**Default**: false |
| <code>ocrEngine?</code> | <code>string</code> | OCR engine to use for text recognition.<br>`UnsiloedHawk` (default) - higher accuracy, better for complex layouts.<br>`UnsiloedBeta` - handles irregular bounding boxes, rotated/warped text.<br>`UnsiloedStorm` - enterprise-grade accuracy, optimized for 50+ languages.<br>**Default**: "UnsiloedHawk" |
| <code>ocrStrategy?</code> | <code>[OcrStrategy3](src/models/ocr-strategy3.ts)</code> | OCR strategy.<br>`auto_detection` (default) — applies OCR only where needed.<br>`force_ocr` — applies OCR to all content regardless of existing text layer.<br>**Default**: "auto_detection" |
| <code>outputFields?</code> | <code>string</code> | JSON object controlling which output fields are included in the response.<br>Example: `{"html": false, "markdown": true, "ocr": false}`.<br>All fields default to `true`. |
| <code>pageRange?</code> | <code>string</code> | Page range to process. Formats: `"1-5"`, `"2,4,6"`, `"[1,3,5]"`. Defaults to all pages. |
| <code>segmentAnalysis?</code> | <code>string</code> | JSON object controlling HTML/Markdown generation strategy and AI model per segment type.<br>Example: `{"Table": {"html": "VLM", "markdown": "VLM", "model_id": "us_table_v2"}}`. |
| <code>segmentFilter?</code> | <code>string</code> | Content filter: comma-separated segment types to keep.<br>Example: `"table,picture"`. Use `"all"` to include everything. Defaults to `"all"`.<br>**Default**: "all" |
| <code>segmentProcessing?</code> | <code>string</code> | Alias for `segment_analysis` (Core Parser name). If both are provided, this takes precedence. |
| <code>segmentTypeNaming?</code> | <code>[SegmentTypeNaming2](src/models/segment-type-naming2.ts)</code> | Segment type naming convention.<br>`Unsiloed` (default) — e.g., `PageHeader`, `ListItem`, `Picture`.<br>`Other` — alternative names e.g., `Header`, `List Item`, `Figure`.<br>**Default**: "Unsiloed" |
| <code>url?</code> | <code>string</code> | Presigned or public URL of the document to fetch and process.<br>Required if `file` is not provided. |
| <code>useHighResolution?</code> | <code>boolean</code> | Use high-resolution images for cropping and post-processing.<br>Latency penalty: ~2–3 s per page. Defaults to `false`.<br>**Default**: false |
| <code>validateSegments?</code> | <code>string</code> | JSON array string of segment types to validate with VLM.<br>Example: `["Table", "Formula", "Picture"]`. Defaults to `["Table", "Picture"]`; an empty or unparseable value also falls back to that default. |
| <code>validateTableSegments?</code> | <code>boolean</code> | Legacy: validate table segment classifications using VLM.<br>Prefer `validate_segments: ["Table"]` instead. Defaults to `false`.<br>**Default**: false |
| <code>xmlCitation?</code> | <code>boolean</code> | Extract and hyperlink bibliography citations in the markdown output. PDFs only.<br>Defaults to `false`.<br>**Default**: false |
| <code>mergeBatchSize?</code> | <code>number</code> | Maximum number of tables per merge group when merge_tables is enabled. Groups larger than this are split. Defaults to 20.<br>**Default**: 20 |
| <code>detectPii?</code> | <code>boolean</code> | Run a PII detection pass before parsing. If PII is found at or above pii_block_severity, the task is rejected and no parsing occurs. Defaults to false.<br>**Default**: false |
| <code>piiBlockSeverity?</code> | <code>[PiiBlockSeverity1](src/models/pii-block-severity1.ts)</code> | Severity threshold at which the task is rejected when detect_pii is enabled: any (default), low, medium, or high. Ignored if detect_pii is false.<br>**Default**: "any" |
| <code>piiEngine?</code> | <code>[PiiEngine1](src/models/pii-engine1.ts)</code> | PII detection engine: standard (default) or advanced (higher precision). Any other value falls back to standard. Ignored if detect_pii is false.<br>**Default**: "standard" |
| <code>responseProfile?</code> | <code>[ResponseProfile3](src/models/response-profile3.ts)</code> | Response shape selector: `slim`, `full`, or `custom`.<br>- `slim`: chunk `embed` + bbox + page_number + segment_id +<br>  segment_type + HTML for tables / Markdown for everything else.<br>  Drops `content`, `image`, `ocr`, `confidence`, `chart_data`,<br>  `page_height`, `page_width`.<br>- `full`: every field returned (equivalent to omitting this param).<br>- `custom`: honor `output_fields` verbatim.<br><br>Precedence: when both `response_profile` and `output_fields` are<br>provided, the profile wins (`output_fields` only matters for `custom`<br>or when the profile is omitted).<br><br>Applies to inline JSON responses only — `GET /parse/{job_id}?output_file=true`<br>returns a presigned URL to the stored full-shape output file. |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.parseVisionApiCompatible.createParseTask(request)`

- **OnSuccess**: <code>[ParseCreateResponse](src/models/parse-create-response.ts)</code>
- **OnError**: throws <code>[ParseVisionApiCompatible.CreateParseTaskError](src/resources/parse-vision-api-compatible.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.parseVisionApiCompatible.createParseTask(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskError&gt;</code>, with `result.value` of type <code>[ParseCreateResponse](src/models/parse-create-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>createParseTaskExcel(request: ParseVisionApiCompatible.CreateParseTaskExcelRequest, options?: RequestOptions): ApiPromise&lt;ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskExcelError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Dedicated Excel (.xls/.xlsx) ingestion endpoint. Shares all auth, billing, quota,
and rate-limit infrastructure with `POST /parse`, and is polled via the same
`GET /parse/{job_id}`. Non-Excel uploads are rejected with a 400; submit those to
`POST /parse` instead.

Accepts two request shapes at the same path, chosen by `Content-Type`:
- `multipart/form-data` — binary `.xls`/`.xlsx` upload (`file` field) or a `url` field.
- `application/json` (or `application/x-www-form-urlencoded`) — JSON body with a
  required `url` field; the `file` field is not applicable.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.parseVisionApiCompatible.createParseTaskExcel();
  // TODO: Handle 'response' of type ParseCreateResponse
} catch (err) {
  // TODO: Handle 'err' of type ParseVisionApiCompatible.CreateParseTaskExcelError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.parseVisionApiCompatible.createParseTaskExcel().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ParseCreateResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>excludeHidden?</code> | <code>boolean</code> | Drop hidden sheets/rows/cols/styling from the output. Defaults to `false`.<br>**Default**: false |
| <code>excludeHiddenCols?</code> | <code>boolean</code> | When excluding hidden content, also drop hidden columns. Defaults to `true`.<br>**Default**: true |
| <code>excludeHiddenRows?</code> | <code>boolean</code> | When excluding hidden content, also drop hidden rows. Defaults to `true`.<br>**Default**: true |
| <code>excludeHiddenSheets?</code> | <code>boolean</code> | When excluding hidden content, also drop hidden sheets. Defaults to `true`.<br>**Default**: true |
| <code>excludeImages?</code> | <code>boolean</code> | When excluding hidden content, also drop embedded/pasted images. Defaults to `false`.<br>**Default**: false |
| <code>excludeStyling?</code> | <code>boolean</code> | When excluding hidden content, also drop styling. Defaults to `true`.<br>**Default**: true |
| <code>expiresIn?</code> | <code>number</code> | Reserved field. Persisted in the task configuration but currently has no<br>effect on retention — Excel tasks use the same `Task::new_fast` creation<br>path as `POST /parse`, which does not set the task's `expires_at` column.<br>See the same note on `ParseCreateRequest.expires_in`. |
| <code>file?</code> | <code>FileInput</code> | Excel workbook to process. Required if `url` is not provided. Supported: XLS, XLSX. |
| <code>maxRowsPerSegment?</code> | <code>number</code> | Max rows per split segment when `split_large_tables`. Defaults to `50`.<br>**Default**: 50 |
| <code>splitLargeTables?</code> | <code>boolean</code> | Split large tables into smaller segments. Defaults to `true`.<br>**Default**: true |
| <code>tableClustering?</code> | <code>[TableClustering](src/models/table-clustering.ts)</code> | Table clustering effort: `accurate` (default), `fast`, or `off`.<br>**Default**: "accurate" |
| <code>url?</code> | <code>string</code> | Presigned or public URL of the workbook to fetch. Required if `file` is not provided. |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.parseVisionApiCompatible.createParseTaskExcel(request)`

- **OnSuccess**: <code>[ParseCreateResponse](src/models/parse-create-response.ts)</code>
- **OnError**: throws <code>[ParseVisionApiCompatible.CreateParseTaskExcelError](src/resources/parse-vision-api-compatible.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.parseVisionApiCompatible.createParseTaskExcel(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ParseCreateResponse, ParseVisionApiCompatible.CreateParseTaskExcelError&gt;</code>, with `result.value` of type <code>[ParseCreateResponse](src/models/parse-create-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getParseTask(request: ParseVisionApiCompatible.GetParseTaskRequest, options?: RequestOptions): ApiPromise&lt;ParseGetResponse, ParseVisionApiCompatible.GetParseTaskError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Get the status and results of a processing task.
Returns task information in Vision-API compatible format.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.parseVisionApiCompatible.getParseTask({ jobId });
  // TODO: Handle 'response' of type ParseGetResponse
} catch (err) {
  // TODO: Handle 'err' of type ParseVisionApiCompatible.GetParseTaskError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.parseVisionApiCompatible.getParseTask({ jobId }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ParseGetResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>jobId</code> | <code>string</code> | Job ID returned by `POST /parse`. |
| <code>includeChunks?</code> | <code>boolean</code> | Include the `chunks` array in the response. Defaults to `true`. |
| <code>base64Urls?</code> | <code>boolean</code> | Return segment images as base64-encoded data URIs instead of S3 presigned URLs.<br>Defaults to `false`. |
| <code>outputFile?</code> | <code>boolean</code> | Return a presigned S3 URL to the raw output JSON file instead of inlining the<br>full response body. Also accepted as the `output-file` request header.<br>Defaults to `false`. |
| <code>enhancedTable?</code> | <code>boolean</code> | Apply enhanced table post-processing when assembling the response — improves<br>cell-merge accuracy and structure recovery for complex tables, at the cost<br>of extra latency. Also accepted as the `enhanced-table` request header.<br>Defaults to `false`. |
| <code>mergeTables?</code> | <code>boolean</code> | Return the cached cross-page merged-table result, if the job was parsed with `merge_tables=true`. No merging happens at read time; the job's own setting takes precedence. Defaults to `false`. |
| <code>includeUrl?</code> | <code>boolean</code> | Include file URLs (`pdf_url`, `file_url`, segment images, `configuration.input_file_url`) in the response. When `false` (default) these fields are nulled. `exports` URLs are always returned regardless of this setting. |
| <code>segmentFilter?</code> | <code>string</code> | Comma-separated segment types to keep in the response, e.g. `Table,Picture` (alias: `keep_segment_types`). |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.parseVisionApiCompatible.getParseTask(request)`

- **OnSuccess**: <code>[ParseGetResponse](src/models/parse-get-response.ts)</code>
- **OnError**: throws <code>[ParseVisionApiCompatible.GetParseTaskError](src/resources/parse-vision-api-compatible.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.parseVisionApiCompatible.getParseTask(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ParseGetResponse, ParseVisionApiCompatible.GetParseTaskError&gt;</code>, with `result.value` of type <code>[ParseGetResponse](src/models/parse-get-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## ParseV2PresignedUpload

> Source: [ParseV2PresignedUpload](src/resources/parse-v2-presigned-upload.ts)

<details>
<summary><code>createPresignedUpload(request: ParseV2PresignedUpload.CreatePresignedUploadRequest, options?: RequestOptions): ApiPromise&lt;PresignedUploadResponse, ParseV2PresignedUpload.CreatePresignedUploadError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Creates a parse job and returns a presigned S3 PUT URL.
The client uploads the file directly to S3 (server not involved in the transfer).
Once the upload completes, the system enqueues the job automatically via S3 event notification.
Poll GET /parse/{job_id} to track progress.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.parseV2PresignedUpload.createPresignedUpload({ body });
  // TODO: Handle 'response' of type PresignedUploadResponse
} catch (err) {
  // TODO: Handle 'err' of type ParseV2PresignedUpload.CreatePresignedUploadError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.parseV2PresignedUpload.createPresignedUpload({ body }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type PresignedUploadResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>body</code> | <code>[PresignedUploadRequest](src/models/presigned-upload-request.ts)</code> | - |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.parseV2PresignedUpload.createPresignedUpload(request)`

- **OnSuccess**: <code>[PresignedUploadResponse](src/models/presigned-upload-response.ts)</code>
- **OnError**: throws <code>[ParseV2PresignedUpload.CreatePresignedUploadError](src/resources/parse-v2-presigned-upload.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.parseV2PresignedUpload.createPresignedUpload(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;PresignedUploadResponse, ParseV2PresignedUpload.CreatePresignedUploadError&gt;</code>, with `result.value` of type <code>[PresignedUploadResponse](src/models/presigned-upload-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## Extract

> Source: [Extract](src/resources/extract.ts)

<details>
<summary><code>extractData(request: Extract.ExtractDataRequest, options?: RequestOptions): ApiPromise&lt;V2ExtractResponse, Extract.ExtractDataError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Extract structured data from PDF documents using custom schemas with vision-language models. Supports multiple model tiers, optional bounding box citations, and intelligent page selection for large documents.

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.extract.extractData({ schemaData });
  // TODO: Handle 'response' of type V2ExtractResponse
} catch (err) {
  // TODO: Handle 'err' of type Extract.ExtractDataError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.extract.extractData({ schemaData }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type V2ExtractResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>schemaData</code> | <code>string</code> | JSON schema defining the structure and fields to extract from the document. Example: {"type":"object","properties":{"invoice_number":{"type":"string","description":"The invoice number"}},"required":["invoice_number"],"additionalProperties":false} |
| <code>pdfFile?</code> | <code>FileInput</code> | The PDF file to process for data extraction. Maximum file size: 500MB. Either pdf_file or file_url must be provided. |
| <code>fileUrl?</code> | <code>string</code> | URL to a PDF file to process. Either pdf_file or file_url must be provided. |
| <code>model?</code> | <code>[Model1](src/models/model1.ts)</code> | Model tier to use for extraction. Options: alpha, beta, gamma (default, recommended), delta<br>**Default**: "gamma" |
| <code>enableCitations?</code> | <code>boolean</code> | Return bounding box coordinates for extracted values<br>**Default**: false |
| <code>highAccuracyMode?</code> | <code>boolean</code> | Enable an agentic verification and validation layer for higher accuracy/consistency. Extracted values are independently cross-checked against the document and uncertain fields are re-verified and reconciled before the result is returned. Slower. Off by default; set true to enable per request.<br>**Default**: false |
| <code>schemaName?</code> | <code>[SchemaName](src/models/unions/schema-name.ts)</code> | Optional name identifying the schema, stored with the job for traceability. |
| <code>detectPii?</code> | <code>boolean</code> | Run a pre-flight PII check before extraction. If PII is found at or above pii_block_severity, no extraction job is created and the endpoint returns HTTP 200 with "status": "pii_blocked" and "blocked": true in the body.<br>**Default**: false |
| <code>piiEngine?</code> | <code>[PiiEngine4](src/models/pii-engine4.ts)</code> | PII detection engine: 'standard' (default) or 'advanced' (higher precision).<br>**Default**: "standard" |
| <code>piiBlockSeverity?</code> | <code>[PiiBlockSeverity4](src/models/pii-block-severity4.ts)</code> | Severity threshold that blocks extraction when detect_pii is enabled: 'any', 'low', 'medium', or 'high'.<br>**Default**: "high" |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.extract.extractData(request)`

- **OnSuccess**: <code>[V2ExtractResponse](src/models/unions/v2-extract-response.ts)</code>
- **OnError**: throws <code>[Extract.ExtractDataError](src/resources/extract.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.extract.extractData(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;V2ExtractResponse, Extract.ExtractDataError&gt;</code>, with `result.value` of type <code>[V2ExtractResponse](src/models/unions/v2-extract-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getExtractionJobStatus(request: Extract.GetExtractionJobStatusRequest, options?: RequestOptions): ApiPromise&lt;ExtractionJob, Extract.GetExtractionJobStatusError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Check the status and retrieve results of extraction jobs

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.extract.getExtractionJobStatus({ jobId });
  // TODO: Handle 'response' of type ExtractionJob
} catch (err) {
  // TODO: Handle 'err' of type Extract.GetExtractionJobStatusError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.extract.getExtractionJobStatus({ jobId }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ExtractionJob
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>jobId</code> | <code>string</code> | The unique identifier of the extraction job |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.extract.getExtractionJobStatus(request)`

- **OnSuccess**: <code>[ExtractionJob](src/models/extraction-job.ts)</code>
- **OnError**: throws <code>[Extract.GetExtractionJobStatusError](src/resources/extract.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.extract.getExtractionJobStatus(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ExtractionJob, Extract.GetExtractionJobStatusError&gt;</code>, with `result.value` of type <code>[ExtractionJob](src/models/extraction-job.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## Classify

> Source: [Classify](src/resources/classify.ts)

<details>
<summary><code>classifyDocument(request: Classify.ClassifyDocumentRequest, options?: RequestOptions): ApiPromise&lt;ClassifyResponse, Classify.ClassifyDocumentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Classify PDF and image documents into predefined categories

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.classify.classifyDocument({ categories });
  // TODO: Handle 'response' of type ClassifyResponse
} catch (err) {
  // TODO: Handle 'err' of type Classify.ClassifyDocumentError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.classify.classifyDocument({ categories }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ClassifyResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>categories</code> | <code>string</code> | JSON string containing an array of category objects with a required name. Example: [{"name":"invoice"},{"name":"contract"},{"name":"receipt"}]. A "description" key is accepted for compatibility but is not used by classification. |
| <code>pdfFile?</code> | <code>FileInput</code> | The document to classify: a PDF or an image (JPG, PNG, GIF, WebP, BMP, TIFF). Provide either pdf_file or file_url, not both. Maximum file size: 500MB. |
| <code>fileUrl?</code> | <code>string</code> | URL to a document to classify (PDF or image). Provide either pdf_file or file_url, not both. |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.classify.classifyDocument(request)`

- **OnSuccess**: <code>[ClassifyResponse](src/models/classify-response.ts)</code>
- **OnError**: throws <code>[Classify.ClassifyDocumentError](src/resources/classify.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.classify.classifyDocument(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ClassifyResponse, Classify.ClassifyDocumentError&gt;</code>, with `result.value` of type <code>[ClassifyResponse](src/models/classify-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>getClassificationJobStatus(request: Classify.GetClassificationJobStatusRequest, options?: RequestOptions): ApiPromise&lt;ClassifyResponse1, Classify.GetClassificationJobStatusError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Check the status and progress of classification jobs and retrieve results

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.classify.getClassificationJobStatus({ jobId });
  // TODO: Handle 'response' of type ClassifyResponse1
} catch (err) {
  // TODO: Handle 'err' of type Classify.GetClassificationJobStatusError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.classify.getClassificationJobStatus({ jobId }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type ClassifyResponse1
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>jobId</code> | <code>string</code> | The unique identifier of the classification job |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.classify.getClassificationJobStatus(request)`

- **OnSuccess**: <code>[ClassifyResponse1](src/models/classify-response1.ts)</code>
- **OnError**: throws <code>[Classify.GetClassificationJobStatusError](src/resources/classify.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.classify.getClassificationJobStatus(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;ClassifyResponse1, Classify.GetClassificationJobStatusError&gt;</code>, with `result.value` of type <code>[ClassifyResponse1](src/models/classify-response1.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## Split

> Source: [Split](src/resources/split.ts)

<details>
<summary><code>getSplitStatus(request: Split.GetSplitStatusRequest, options?: RequestOptions): ApiPromise&lt;SplitterResponse1, Split.GetSplitStatusError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Check the status and retrieve results of document splitting jobs

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.split.getSplitStatus({ jobId });
  // TODO: Handle 'response' of type SplitterResponse1
} catch (err) {
  // TODO: Handle 'err' of type Split.GetSplitStatusError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.split.getSplitStatus({ jobId }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SplitterResponse1
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>jobId</code> | <code>string</code> | The unique identifier of the splitting job |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.split.getSplitStatus(request)`

- **OnSuccess**: <code>[SplitterResponse1](src/models/splitter-response1.ts)</code>
- **OnError**: throws <code>[Split.GetSplitStatusError](src/resources/split.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.split.getSplitStatus(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SplitterResponse1, Split.GetSplitStatusError&gt;</code>, with `result.value` of type <code>[SplitterResponse1](src/models/splitter-response1.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

<details>
<summary><code>splitDocument(request: Split.SplitDocumentRequest, options?: RequestOptions): ApiPromise&lt;SplitterResponse, Split.SplitDocumentError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Split PDF documents by classifying pages into categories

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.split.splitDocument({ categories });
  // TODO: Handle 'response' of type SplitterResponse
} catch (err) {
  // TODO: Handle 'err' of type Split.SplitDocumentError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.split.splitDocument({ categories }).asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type SplitterResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Parameters

<dl>
<dd>

| Name | Type | Description |
| --- | --- | --- |
| <code>categories</code> | <code>string</code> | JSON string containing array of category objects with name and optional description. Example: [{"name":"invoice","description":"Business invoices with itemized charges"},{"name":"contract","description":"Legal agreements and binding documents"},{"name":"report"}] |
| <code>file?</code> | <code>FileInput</code> | PDF file to split. Either file or file_url must be provided. Provide either `file` or `file_url`; sending both returns 400. |
| <code>fileUrl?</code> | <code>string</code> | URL to a PDF file to split. Either file or file_url must be provided. Example: https://example.com/mixed_documents.pdf |
| <code>enableReordering?</code> | <code>[EnableReordering](src/models/unions/enable-reordering.ts)</code> | Reorder pages within each category after classification, using content and page numbers to infer the logical order. Only applied to categories that match more than one page. |

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.split.splitDocument(request)`

- **OnSuccess**: <code>[SplitterResponse](src/models/splitter-response.ts)</code>
- **OnError**: throws <code>[Split.SplitDocumentError](src/resources/split.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.split.splitDocument(request).asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;SplitterResponse, Split.SplitDocumentError&gt;</code>, with `result.value` of type <code>[SplitterResponse](src/models/splitter-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

## Organization

> Source: [Organization](src/resources/organization.ts)

<details>
<summary><code>getOrganizationUsage(options?: RequestOptions): ApiPromise&lt;OrgGetUsageResponse, Organization.GetOrganizationUsageError&gt;</code></summary>

<dl>
<dd>

### Description

<dl>
<dd>

Get organization usage information including current usage, monthly limit, and remaining quota

</dd>
</dl>

### Direct Usage

<dl>
<dd>

```ts
try {
  const response = await client.organization.getOrganizationUsage();
  // TODO: Handle 'response' of type OrgGetUsageResponse
} catch (err) {
  // TODO: Handle 'err' of type Organization.GetOrganizationUsageError, discriminated with 'err.payload.kind'
}
```

</dd>
</dl>

### Usage as ApiResult

<dl>
<dd>

```ts
const result = await client.organization.getOrganizationUsage().asApiResult();
// TODO: Use 'result.status' and 'result.headers' to read the raw response status and headers
if (result.ok) {
  // TODO: Use 'result.value' of type OrgGetUsageResponse
} else {
  // TODO: Use 'result.errorMessage' and 'result.error', discriminated with 'result.error.kind'
}
```

</dd>
</dl>

### Response

<dl>
<dd>

**Direct**: `await client.organization.getOrganizationUsage()`

- **OnSuccess**: <code>[OrgGetUsageResponse](src/models/org-get-usage-response.ts)</code>
- **OnError**: throws <code>[Organization.GetOrganizationUsageError](src/resources/organization.ts)</code>, with `err.payload` discriminated on `kind`

**As ApiResult**: `await client.organization.getOrganizationUsage().asApiResult()`

- **OnSuccess**: <code>[ApiResult](src/core/api-promise.ts)&lt;OrgGetUsageResponse, Organization.GetOrganizationUsageError&gt;</code>, with `result.value` of type <code>[OrgGetUsageResponse](src/models/org-get-usage-response.ts)</code>
- **OnError**: `result.error` discriminated on `kind`, with `result.errorMessage`

**Always thrown**: <code>[UnsiloedAiDocumentProcessingApiError](src/core/errors.ts)</code>

</dd>
</dl>

</dd>
</dl>

</details>

