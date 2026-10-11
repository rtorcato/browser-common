---
title: mediaquery
sidebar_label: mediaquery
---

# mediaquery

Check CSS media queries from script and react when they start or stop
matching, via `window.matchMedia`. Includes shortcuts for the dark-mode and
reduced-motion user preferences.

**Import:** `@rtorcato/browser-common/mediaquery`

📖 [MDN: Window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) · 📊 [caniuse: matchmedia](https://caniuse.com/matchmedia)

::browser-support[mediaquery]

## Example

```ts
import {
  matchesMedia,
  onMediaQueryChange,
  prefersReducedMotion,
} from '@rtorcato/browser-common/mediaquery'

setWide(matchesMedia('(min-width: 768px)') ?? false)

const off = onMediaQueryChange('(min-width: 768px)', (matches) => setWide(matches))
// later:
off()

if (!prefersReducedMotion()) playIntroAnimation()
```

## Exports

- `isMediaQueryAvailable()` — feature check
- `matchesMedia(query)` — `true` / `false`, or `null` where unsupported
- `onMediaQueryChange(query, callback)` — subscribe to changes; the callback gets the new `matches` value; returns an unsubscribe function
- `prefersDarkMode()` — `(prefers-color-scheme: dark)`; `true` / `false`, or `null` where unsupported
- `prefersReducedMotion()` — `(prefers-reduced-motion: reduce)`; `true` / `false`, or `null` where unsupported

See the [API reference](/docs/api/mediaquery) for full signatures.
