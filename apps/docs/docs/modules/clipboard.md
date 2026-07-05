---
title: clipboard
sidebar_label: clipboard
---

# clipboard

Read from and write to the system clipboard via the async Clipboard API.

**Import:** `@rtorcato/browser-common/clipboard`

📖 [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) · 📊 [caniuse: async clipboard](https://caniuse.com/async-clipboard)

Requires a **secure context** (HTTPS, or `localhost` in dev). Writing is
generally allowed from a user gesture; reading may prompt for permission.

## Example

```ts
import {
  isClipboardApiAvailable,
  copyToClipboard,
  readFromClipboard,
} from '@rtorcato/browser-common/clipboard'

if (isClipboardApiAvailable()) {
  await copyToClipboard('Copied from the app')
  const text = await readFromClipboard()
  console.log(text)
}
```

## Exports

- `isClipboardApiAvailable()` — feature check
- `copyToClipboard(text)` — write a string to the clipboard
- `copyElementTextToClipboard(element)` — copy an element's text content
- `readFromClipboard()` — read the clipboard's text

See the [API reference](/docs/api/clipboard) for full signatures.
