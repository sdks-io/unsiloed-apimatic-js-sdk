<!-- Generated file — do not edit; regenerated with the SDK. -->

# Split — operations

Accessor: `client.split` · Source: `src/resources/split.ts` · 2 operations · Request and error types: namespace `Split`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `unsiloed-apimatic-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### getSplitStatus

- **Signature**: `getSplitStatus(request: Split.GetSplitStatusRequest, options?: RequestOptions): ApiPromise<SplitterResponse1, Split.GetSplitStatusError>`
- **Wire**: `GET /splitter/{job_id}`
- **Auth**: `apiKeyAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `SplitterResponse1`
- **Error**: `Split.GetSplitStatusError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"detailError"` [404] `DetailError` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Split.GetSplitStatusRequest` (1):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `jobId` | `path` | `job_id` | `string` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `SplitterResponse1` | `splitterResponse1Schema` | `src/models/splitter-response1.ts` |
| `DetailError` | `detailErrorSchema` | `src/models/detail-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

### splitDocument

- **Signature**: `splitDocument(request: Split.SplitDocumentRequest, options?: RequestOptions): ApiPromise<SplitterResponse, Split.SplitDocumentError>`
- **Wire**: `POST /splitter`
- **Auth**: `apiKeyAuth`
- **Request body**: `multipart/form-data` — every field marked `form`. `file` is a file part, framed as bytes rather than encoded. The platform writes the boundary, or the SDK does when a file part streams
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `SplitterResponse`
- **Error**: `Split.SplitDocumentError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"detailError"` [400] `DetailError` · `"detailError2"` [401] `DetailError` · `"detailError3"` [422] `DetailError` · `"detailError4"` [429] `DetailError` · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `Split.SplitDocumentRequest` (4):

| Field | Channel | Wire | Type | Req |
| --- | --- | --- | --- | --- |
| `categories` | `form` | — | `string` | yes |
| `file` | `form` | — | `FileInput` | no |
| `fileUrl` | `form` | `file_url` | `string` | no |
| `enableReordering` | `form` | `enable_reordering` | `EnableReordering` | no |

| Type | Schema value | Source |
| --- | --- | --- |
| `EnableReordering` | `enableReorderingSchema` | `src/models/unions/enable-reordering.ts` |
| `SplitterResponse` | `splitterResponseSchema` | `src/models/splitter-response.ts` |
| `DetailError` | `detailErrorSchema` | `src/models/detail-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

