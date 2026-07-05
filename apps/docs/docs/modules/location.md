---
title: location
sidebar_label: location
---

# location

Read and manipulate the browser's `window.location` — current URL, pathname, query string, hash, redirects, and reloads.

**Import:** `@rtorcato/browser-common/location`

📖 [MDN: Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)

## Example

```ts
import { getCurrentLocation, getPathname, redirectTo } from '@rtorcato/browser-common/location'

const url = getCurrentLocation()

if (getPathname() === '/login') {
  redirectTo('/dashboard')
}
```

## Exports

- `getCurrentLocation()` — current URL (`window.location.href`), or `undefined` outside a browser
- `redirectTo(url)` — navigates to a new URL
- `reloadPage()` — reloads the current page
- `getPathname()` — current pathname, or `undefined` outside a browser
- `getSearch()` — current query string, or `undefined` outside a browser
- `getHash()` — current hash, or `undefined` outside a browser

See the [API reference](/docs/api/location) for full signatures.
