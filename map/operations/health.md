<!-- Generated file — do not edit; regenerated with the SDK. -->

# Health — operations

Accessor: `client.health` · Source: `src/resources/health.ts` · 1 operation · Request types: namespace `Health`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `unsiloed-apimatic-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### healthCheck

- **Signature**: `healthCheck(options?: RequestOptions): ApiPromise<HealthResponse, ResponseError>`
- **Wire**: `GET /health`
- **Auth**: none — public; no credential is sent
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `HealthResponse`
- **Error**: `ResponseError` — untyped, `payload.kind` always `"undeclared"`

| Type | Schema value | Source |
| --- | --- | --- |
| `HealthResponse` | `healthResponseSchema` | `src/models/health-response.ts` |

