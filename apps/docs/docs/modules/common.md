---
title: common
sidebar_label: common
---

# common

Small environment and user-agent checks used to detect whether code is
running in a browser, on mobile, and what language/agent the browser reports.

**Import:** `@rtorcato/browser-common/common`

📖 [MDN: Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

## Example

```ts
import {
  isBrowser,
  getUserAgent,
  isMobile,
  getBrowserLanguage,
} from '@rtorcato/browser-common/common'

if (isBrowser) {
  console.log(getUserAgent(), isMobile(), getBrowserLanguage())
}
```

## Exports

- `isBrowser` — `true` if running in a browser environment
- `getUserAgent()` — the `navigator.userAgent` string, or `undefined`
- `isMobile()` — `true` if the user agent matches a mobile device
- `getBrowserLanguage()` — the `navigator.language` string, or `undefined`

See the [API reference](/docs/api/common) for full signatures.
