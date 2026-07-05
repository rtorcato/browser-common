---
title: webshare
sidebar_label: webshare
---

# webshare

Share text, links, or files via the platform's native share sheet, using the
Web Share API.

**Import:** `@rtorcato/browser-common/webshare`

📖 [MDN: Navigator: share() method](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) · 📊 [caniuse: web-share](https://caniuse.com/web-share)

`navigator.share` needs a user gesture; wide support on mobile, but Firefox desktop never shipped it.

## Example

```ts
import {
  isWebShareAvailable,
  isFileShareAvailable,
  share,
} from '@rtorcato/browser-common/webshare'

if (isWebShareAvailable()) {
  await share({ title: 'Look', url: 'https://example.com' })
}

if (isFileShareAvailable()) {
  await share({ files: [myFile] })
}
```

## Exports

- `isWebShareAvailable()` — feature check
- `share(data)` — shares `{ title, text, url, files }` via `navigator.share`; throws if unsupported
- `isFileShareAvailable()` — checks whether `navigator.canShare` supports sharing files

See the [API reference](/docs/api/webshare) for full signatures.
