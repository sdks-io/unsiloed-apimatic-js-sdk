<!-- Generated file — do not edit; regenerated with the SDK. -->

# Extract — operations

Accessor: `client.extract` · Source: `src/resources/extract.ts` · 2 operations · Request and error types: namespace `Extract`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `unsiloed-apimatic-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### extractData

- **Signature**: `extractData(request: Extract.ExtractDataRequest, options?: RequestOptions): ApiPromise<V2ExtractResponse, Extract.ExtractDataError>`
- **Wire**: `POST /v2/extract`
- **Auth**: `apiKeyAuth`
- **Request body**: `multipart/form-data` — every field marked `form`. `pdf_file` is a file part, framed as bytes rather than encoded. The platform writes the boundary, or the SDK does when a file part streams
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `V2ExtractResponse`
- **Error**: `Extract.ExtractDataError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"detailError"` [400] `DetailError` · `"detailError2"` [401] `DetailError` · `"detailError3"` [402] `DetailError` · `"detailError4"` [413] `DetailError` · `"detailError5"` [422] `DetailError` · `"detailError6"` [429] `DetailError` · `"detailError7"` [500] `DetailError` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Extract.ExtractDataRequest` (10):

| Field | Channel | Wire | Type | Req | Default |
| --- | --- | --- | --- | --- | --- |
| `schemaData` | `form` | `schema_data` | `string` | yes | — |
| `pdfFile` | `form` | `pdf_file` | `FileInput` | no | — |
| `fileUrl` | `form` | `file_url` | `string` | no | — |
| `model` | `form` | — | `Model1` | no | `Model1.Gamma` |
| `enableCitations` | `form` | `enable_citations` | `boolean` | no | `false` |
| `highAccuracyMode` | `form` | `high_accuracy_mode` | `boolean` | no | `false` |
| `schemaName` | `form` | `schema_name` | `SchemaName` | no | — |
| `detectPii` | `form` | `detect_pii` | `boolean` | no | `false` |
| `piiEngine` | `form` | `pii_engine` | `PiiEngine4` | no | `PiiEngine4.Standard` |
| `piiBlockSeverity` | `form` | `pii_block_severity` | `PiiBlockSeverity4` | no | `PiiBlockSeverity4.High` |

| Type | Schema value | Source |
| --- | --- | --- |
| `Model1` | `model1Schema` | `src/models/model1.ts` |
| `SchemaName` | `schemaNameSchema` | `src/models/unions/schema-name.ts` |
| `PiiEngine4` | `piiEngine4Schema` | `src/models/pii-engine4.ts` |
| `PiiBlockSeverity4` | `piiBlockSeverity4Schema` | `src/models/pii-block-severity4.ts` |
| `V2ExtractResponse` | `v2ExtractResponseSchema` | `src/models/unions/v2-extract-response.ts` |
| `DetailError` | `detailErrorSchema` | `src/models/detail-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

### getExtractionJobStatus

- **Signature**: `getExtractionJobStatus(request: Extract.GetExtractionJobStatusRequest, options?: RequestOptions): ApiPromise<ExtractionJob, Extract.GetExtractionJobStatusError>`
- **Wire**: `GET /extract/{job_id}`
- **Auth**: `apiKeyAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ExtractionJob`
- **Error**: `Extract.GetExtractionJobStatusError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"detailError"` [404] `DetailError` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Extract.GetExtractionJobStatusRequest` (1):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `jobId` | `path` | `job_id` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ExtractionJob` | `extractionJobSchema` | `src/models/extraction-job.ts` |
| `DetailError` | `detailErrorSchema` | `src/models/detail-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

