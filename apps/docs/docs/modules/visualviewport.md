---
title: visualviewport
sidebar_label: visualviewport
---

# visualviewport

Read the visual viewport's size, offset, and scale, and listen for its
resize/scroll events, via the Visual Viewport API.

**Import:** `@rtorcato/browser-common/visualviewport`

📖 [MDN: VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport) · 📊 [caniuse: visualviewport](https://caniuse.com/mdn-api_visualviewport)

## Example

```ts
import {
  isVisualViewportAvailable,
  getVisualViewportInfo,
  onVisualViewportChange,
} from '@rtorcato/browser-common/visualviewport'

if (isVisualViewportAvailable()) {
  const info = getVisualViewportInfo()
  console.log(info?.scale)

  const off = onVisualViewportChange(() => updateLayout())
  // later:
  off()
}
```

## Exports

- `isVisualViewportAvailable()` — feature check
- `getVisualViewportInfo()` — current `{ offsetLeft, offsetTop, width, height, scale }`, or `null`
- `onVisualViewportChange(callback)` — subscribe to resize and scroll; returns an unsubscribe function

See the [API reference](/docs/api/visualviewport) for full signatures.
