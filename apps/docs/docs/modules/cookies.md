---
title: cookies
sidebar_label: cookies
---

# cookies

Read, write, and delete `document.cookie` entries without hand-rolling the
parsing and encoding.

**Import:** `@rtorcato/browser-common/cookies`

📖 [MDN: Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) · 📊 [caniuse: cookies](https://caniuse.com/cookies)

## Example

```ts
import { setCookie, getCookie, hasCookie, deleteCookie } from '@rtorcato/browser-common/cookies'

setCookie('theme', 'dark', 30)

if (hasCookie('theme')) {
  const theme = getCookie('theme')
}

deleteCookie('theme')
```

## Exports

- `setCookie(name, value, days?, path?)` — sets a cookie, optionally with an expiry
- `getCookie(name)` — returns the cookie value, or `null` if not found
- `deleteCookie(name, path?)` — deletes a cookie
- `hasCookie(name)` — `true` if the cookie exists
- `getAllCookies()` — returns all cookies as a `Record<string, string>`

See the [API reference](/docs/api/cookies) for full signatures.
