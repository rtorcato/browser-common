---
title: permissions
sidebar_label: permissions
---

# permissions

Query and watch permission status via the Permissions API.

**Import:** `@rtorcato/browser-common/permissions`

📖 [MDN: Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) · 📊 [caniuse: permissions-api](https://caniuse.com/permissions-api)

Query only; support varies by permission name.

## Example

```ts
import { isPermissionsApiAvailable, queryPermission, onPermissionChange } from '@rtorcato/browser-common/permissions'

if (isPermissionsApiAvailable()) {
  const state = await queryPermission('geolocation')

  const status = await navigator.permissions.query({ name: 'geolocation' })
  const off = onPermissionChange(status, () => console.log(status.state))
  off()
}
```

## Exports

- `isPermissionsApiAvailable()` — feature check
- `queryPermission(name)` — resolves a permission's state (`'granted' | 'denied' | 'prompt'`), or `undefined` if unsupported
- `onPermissionChange(status, callback)` — subscribes to a `PermissionStatus` change event, returns an unsubscribe function

See the [API reference](/docs/api/permissions) for full signatures.
