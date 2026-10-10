---
title: window
sidebar_label: window
---

# window

Small wrappers around common `window` operations — opening/closing/focusing
windows, scrolling, reloading, and reading or watching viewport size.

**Import:** `@rtorcato/browser-common/window`

📖 [MDN: Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)

::browser-support[window]

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

openWindow('https://example.com', '_blank', { noopener: true })
scrollToTop('smooth')

const { width, height } = getWindowSize()
const off = onWindowResize(() => console.log(window.innerWidth))
off()
```

## Exports

- `openWindow(url, target?, features?)` — `window.open`; `features` is a string or `{ features?, noopener? }`. Returns the new `Window`, or `null` if blocked or opened with `noopener`
- `closeWindow()` — closes the current window
- `focusWindow()` — focuses the current window
- `blurWindow()` — blurs the current window
- `scrollToTop(behavior?)` — scrolls to the top (`'auto'` or `'smooth'`)
- `scrollToBottom(behavior?)` — scrolls to `document.body.scrollHeight`
- `reloadWindow()` — reloads the current page
- `getWindowSize()` — `{ width, height }` from `innerWidth`/`innerHeight`
- `onWindowResize(callback)` — subscribe to resize; returns an unsubscribe function

## Safe usage

Unlike `<a target="_blank">`, `window.open` does **not** imply `noopener`. By default the
opened page gets `window.opener` and can navigate this page (reverse tabnabbing). When the URL
is not fully trusted, opt in:

```ts
openWindow(userSuppliedUrl, '_blank', { noopener: true })
```

This passes `noopener,noreferrer`. The browser then returns `null` even when the window
opens, so don't use the return value to detect a blocked popup in this mode.

See the [API reference](/docs/api/window) for full signatures.
