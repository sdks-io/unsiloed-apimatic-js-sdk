<!-- Generated file — do not edit; regenerated with the SDK. -->

# Organization — operations

Accessor: `client.organization` · Source: `src/resources/organization.ts` · 1 operation · Request and error types: namespace `Organization`

**Type sources**: every type an operation names, with the file that declares it and the schema value exported beside it. Import every name from `unsiloed-apimatic-sdk`; the `Source` path is where to **read** the shape, never what to import. `ResponseError`, the runtime error family and the file vocabulary are excluded — see sdk-map.md.

### getOrganizationUsage

- **Signature**: `getOrganizationUsage(options?: RequestOptions): ApiPromise<OrgGetUsageResponse, Organization.GetOrganizationUsageError>`
- **Wire**: `GET /org/get_usage`
- **Auth**: `apiKeyAuth`
- **Request body**: none — no `Content-Type` header is sent
- **Returns**: `OrgGetUsageResponse`
- **Error**: `Organization.GetOrganizationUsageError` — **typed arms**, narrowed on `err.payload.kind`
- **Error arms**: `"orgGetUsage401Error1"` [401] `OrgGetUsage401Error1` · `"orgGetUsage404Error1"` [404] `OrgGetUsage404Error1` · `"undeclared"` [any other] `rawBody: ArrayBuffer`

| Type | Schema value | Source |
| --- | --- | --- |
| `OrgGetUsageResponse` | `orgGetUsageResponseSchema` | `src/models/org-get-usage-response.ts` |
| `OrgGetUsage401Error1` | `orgGetUsage401Error1Schema` | `src/models/org-get-usage401-error1.ts` |
| `OrgGetUsage404Error1` | `orgGetUsage404Error1Schema` | `src/models/org-get-usage404-error1.ts` |

