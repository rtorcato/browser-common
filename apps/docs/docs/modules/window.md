---
title: window
sidebar_label: window
---

# window

Small wrappers around common `window` operations — opening/closing/focusing
windows, scrolling, reloading, and reading or watching viewport size.

**Import:** `@rtorcato/browser-common/window`

📖 [MDN: Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

## Example

```ts
import {
  openWindow,
  closeWindow,
  focusWindow,
  blurWindow,
  scrollToTop,
  scrollToBottom,
  reloadWindow,
  getWindowSize,
  onWindowResize,
} from '@rtorcato/browser-common/window'

openWindow('https://example.com', '_blank')
scrollToTop('smooth')

const { width, height } = getWindowSize()
const off = onWindowResize(() => console.log(window.innerWidth))
off()
```

## Exports

- `openWindow(url, target?, features?)` — `window.open`; returns the new `Window` or `null` if blocked
- `closeWindow()` — closes the current window
- `focusWindow()` — focuses the current window
- `blurWindow()` — blurs the current window
- `scrollToTop(behavior?)` — scrolls to the top (`'auto'` or `'smooth'`)
- `scrollToBottom(behavior?)` — scrolls to `document.body.scrollHeight`
- `reloadWindow()` — reloads the current page
- `getWindowSize()` — `{ width, height }` from `innerWidth`/`innerHeight`
- `onWindowResize(callback)` — subscribe to resize; returns an unsubscribe function

See the [API reference](/docs/api/window) for full signatures.
