---
title: screencapture
sidebar_label: screencapture
---

# screencapture

Prompt the user to share a screen, window, or tab via the Screen Capture API.

**Import:** `@rtorcato/browser-common/screencapture`

📖 [MDN: Screen Capture API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API)

`getDisplayMedia` needs a **secure context** and **throws** where unsupported — guard with `isScreenCaptureAvailable()` first.

## Example

```ts
import { isScreenCaptureAvailable, getDisplayMedia } from '@rtorcato/browser-common/screencapture'

if (isScreenCaptureAvailable()) {
  const stream = await getDisplayMedia({ video: true })
}
```

## Exports

- `isScreenCaptureAvailable()` — feature check
- `getDisplayMedia(options?)` — prompts the user and resolves to a `MediaStream`

See the [API reference](/docs/api/screencapture) for full signatures.
