<!-- Generated file — do not edit; regenerated with the SDK. -->

# ParseV2PresignedUpload — operations

Accessor: `client.parseV2PresignedUpload` · Source: `src/resources/parse-v2-presigned-upload.ts` · 1 operation · Request and error types: namespace `ParseV2PresignedUpload`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `unsiloed-apimatic-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### createPresignedUpload

- **Signature**: `createPresignedUpload(request: ParseV2PresignedUpload.CreatePresignedUploadRequest, options?: RequestOptions): ApiPromise<PresignedUploadResponse, ParseV2PresignedUpload.CreatePresignedUploadError>`
- **Wire**: `POST /v2/parse/upload`
- **Auth**: `apiKeyAuth`
- **Request body**: `application/json` — the `body` field
- **SDK-sent**: `header Idempotency-Key` (minted per call)
- **Returns**: `PresignedUploadResponse`
- **Error**: `ParseV2PresignedUpload.CreatePresignedUploadError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"v2ParseUpload400Error1"` [400] `V2ParseUpload400Error1` · `"error401"` [401] no body · `"error402"` [402] no body · `"error403"` [403] no body · `"rateLimitError"` [429] `RateLimitError` · `"error500"` [500] no body · `"errorEnvelope"` [503] `ErrorEnvelope` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

**Fields** — `ParseV2PresignedUpload.CreatePresignedUploadRequest` (1):

| Field | Channel | Type | Req |
| --- | --- | --- | --- |
| `body` | `body` | `PresignedUploadRequest` | yes |

| Type | Schema value | Source |
| --- | --- | --- |
| `PresignedUploadRequest` | `presignedUploadRequestSchema` | `src/models/presigned-upload-request.ts` |
| `PresignedUploadResponse` | `presignedUploadResponseSchema` | `src/models/presigned-upload-response.ts` |
| `V2ParseUpload400Error1` | `v2ParseUpload400Error1Schema` | `src/models/v2-parse-upload400-error1.ts` |
| `RateLimitError` | `rateLimitErrorSchema` | `src/models/rate-limit-error.ts` |
| `ErrorEnvelope` | `errorEnvelopeSchema` | `src/models/error-envelope.ts` |

