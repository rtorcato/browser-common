---
title: common
sidebar_label: common
---

# common

Small environment and user-agent checks used to detect whether code is
running in a browser, on mobile, and what language/agent and OS platform the browser reports.

**Import:** `@rtorcato/browser-common/common`

📖 [MDN: Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

::browser-support[common]

## Example

```ts
import {
  isBrowser,
  getUserAgent,
  isMobile,
  getBrowserLanguage,
  getPlatform,
  isIOS,
  isAndroid,
} from '@rtorcato/browser-common/common'

if (isBrowser) {
  console.log(getUserAgent(), isMobile(), getBrowserLanguage())
  console.log(getPlatform(), isIOS(), isAndroid())
}
```

## Exports

- `isBrowser` — `true` if running in a browser environment
- `getUserAgent()` — the `navigator.userAgent` string, or `null`
- `isMobile()` — `true` if the user agent matches a mobile device
- `getBrowserLanguage()` — the `navigator.language` string, or `null`
- `getPlatform()` — the OS as a `Platform` (`'ios' | 'android' | 'macos' | 'windows' | 'linux' | 'unknown'`); prefers `navigator.userAgentData`, falls back to the user agent, and reports iPadOS as `'ios'`
- `isIOS()` — `true` on iOS or iPadOS
- `isAndroid()` — `true` on Android

See the [API reference](/docs/api/common) for full signatures.
