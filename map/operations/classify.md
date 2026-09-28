<!-- Generated file — do not edit; regenerated with the SDK. -->

# Classify — operations

Accessor: `client.classify` · Source: `src/resources/classify.ts` · 2 operations · Request and error types: namespace `Classify`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `unsiloed-apimatic-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### classifyDocument

- **Signature**: `classifyDocument(request: Classify.ClassifyDocumentRequest, options?: RequestOptions): ApiPromise<ClassifyResponse, Classify.ClassifyDocumentError>`
- **Wire**: `POST /classify`
- **Auth**: `apiKeyAuth`
- **Request body**: `multipart/form-data` — every field marked `form`. `pdf_file` is a file part, framed as bytes rather than encoded. The platform writes the boundary, or the SDK does when a file part streams
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `ClassifyResponse`
- **Error**: `Classify.ClassifyDocumentError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"detailError"` [400] `DetailError` · `"detailError2"` [401] `DetailError` · `"classify402Error1"` [402] `Classify402Error1` · `"detailError3"` [422] `DetailError` · `"detailError4"` [429] `DetailError` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Classify.ClassifyDocumentRequest` (3):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `categories` | `form` | — | `string` | yes |
| `pdfFile` | `form` | `pdf_file` | `FileInput` | no |
| `fileUrl` | `form` | `file_url` | `string` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `ClassifyResponse` | `classifyResponseSchema` | `src/models/classify-response.ts` |
| `DetailError` | `detailErrorSchema` | `src/models/detail-error.ts` |
| `Classify402Error1` | `classify402Error1Schema` | `src/models/classify402-error1.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

### getClassificationJobStatus

- **Signature**: `getClassificationJobStatus(request: Classify.GetClassificationJobStatusRequest, options?: RequestOptions): ApiPromise<ClassifyResponse1, Classify.GetClassificationJobStatusError>`
- **Wire**: `GET /classify/{job_id}`
- **Auth**: `apiKeyAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `ClassifyResponse1`
- **Error**: `Classify.GetClassificationJobStatusError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"detailError"` [404] `DetailError` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Classify.GetClassificationJobStatusRequest` (1):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `jobId` | `path` | `job_id` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `ClassifyResponse1` | `classifyResponse1Schema` | `src/models/classify-response1.ts` |
| `DetailError` | `detailErrorSchema` | `src/models/detail-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

