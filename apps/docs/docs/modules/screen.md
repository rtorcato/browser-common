---
title: screen
sidebar_label: screen
---

# screen

Screen and viewport dimensions and orientation. For the Fullscreen API, use [`fullscreen`](./fullscreen.md).

**Import:** `@rtorcato/browser-common/screen`

📖 [MDN: Screen](https://developer.mozilla.org/en-US/docs/Web/API/Screen)

::browser-support[screen]

## Example

```ts
import { getScreenWidth, isLandscape } from '@rtorcato/browser-common/screen'

const w = getScreenWidth()
if (isLandscape()) renderWide()
```

## Exports

- `getScreenWidth()` — screen width in pixels, or `null` outside a browser
- `getScreenHeight()` — screen height in pixels, or `null` outside a browser
- `getViewportWidth()` — viewport width (`window.innerWidth`), or `null` outside a browser
- `getViewportHeight()` — viewport height (`window.innerHeight`), or `null` outside a browser
- `isLandscape()` — true if viewport is wider than tall; false outside a browser
- `isPortrait()` — true if viewport is taller than or equal to wide; false outside a browser

See the [API reference](/docs/api/screen) for full signatures.
