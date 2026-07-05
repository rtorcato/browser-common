---
title: fullscreen
sidebar_label: fullscreen
---

# fullscreen

Enter, exit, and observe fullscreen mode via the Fullscreen API.

**Import:** `@rtorcato/browser-common/fullscreen`

📖 [MDN: Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) · 📊 [caniuse: fullscreen](https://caniuse.com/fullscreen)

`enterFullscreen` must be called from a user gesture handler (e.g. a click
listener) — browsers reject fullscreen requests made outside one.

## Example

```ts
import {
  enterFullscreen,
  exitFullscreen,
  isFullscreen,
  onFullscreenChange,
} from '@rtorcato/browser-common/fullscreen'

button.addEventListener('click', () => enterFullscreen(video))

const off = onFullscreenChange(() => {
  console.log(isFullscreen() ? 'entered fullscreen' : 'exited fullscreen')
})

off()
```

## Exports

- `enterFullscreen(element?)` — requests fullscreen for `element` (default: `document.documentElement`)
- `exitFullscreen()` — exits fullscreen if active
- `isFullscreen()` — true if currently in fullscreen
- `onFullscreenChange(callback)` — listens for fullscreen change; returns an unsubscribe function

See the [API reference](/docs/api/fullscreen) for full signatures.
