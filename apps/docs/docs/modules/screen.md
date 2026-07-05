---
title: screen
sidebar_label: screen
---

# screen

Screen and viewport dimensions, orientation, and Fullscreen API helpers.

**Import:** `@rtorcato/browser-common/screen`

📖 [MDN: Screen](https://developer.mozilla.org/en-US/docs/Web/API/Screen) · 📊 [caniuse: fullscreen](https://caniuse.com/fullscreen)

## Example

```ts
import {
  getScreenWidth,
  getViewportWidth,
  isLandscape,
  enterFullscreen,
  exitFullscreen,
  isFullscreen,
} from '@rtorcato/browser-common/screen'

const w = getScreenWidth()
if (isLandscape()) renderWide()

button.addEventListener('click', () => {
  if (isFullscreen()) {
    exitFullscreen()
  } else {
    enterFullscreen()
  }
})
```

## Exports

- `getScreenWidth()` — screen width in pixels, or `undefined` outside a browser
- `getScreenHeight()` — screen height in pixels, or `undefined` outside a browser
- `getViewportWidth()` — viewport width (`window.innerWidth`), or `undefined` outside a browser
- `getViewportHeight()` — viewport height (`window.innerHeight`), or `undefined` outside a browser
- `isLandscape()` — true if viewport is wider than tall
- `isPortrait()` — true if viewport is taller than or equal to wide
- `enterFullscreen(element?)` — requests fullscreen for an element (defaults to `document.documentElement`)
- `exitFullscreen()` — exits fullscreen if active
- `isFullscreen()` — true if the document currently has a fullscreen element

See the [API reference](/docs/api/screen) for full signatures.
