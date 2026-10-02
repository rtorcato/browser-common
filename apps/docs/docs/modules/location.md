---
title: location
sidebar_label: location
---

# location

Read and manipulate the browser's `window.location` — current URL, pathname, query string, hash, redirects, and reloads.

**Import:** `@rtorcato/browser-common/location`

📖 [MDN: Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)

::browser-support[location]

## Example

```ts
import { getCurrentLocation, getPathname, redirectTo } from '@rtorcato/browser-common/location'

const url = getCurrentLocation()

if (getPathname() === '/login') {
  redirectTo('/dashboard')
}
```

## Exports

- `getCurrentLocation()` — current URL (`window.location.href`), or `null` outside a browser
- `redirectTo(url)` — navigates to a new URL
- `reloadPage()` — reloads the current page
- `getPathname()` — current pathname, or `null` outside a browser
- `getSearch()` — current query string, or `null` outside a browser
- `getHash()` — current hash, or `null` outside a browser

See the [API reference](/docs/api/location) for full signatures.
