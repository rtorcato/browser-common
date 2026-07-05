---
title: resizeobserver
sidebar_label: resizeobserver
---

# resizeobserver

Observe element size changes via the ResizeObserver API.

**Import:** `@rtorcato/browser-common/resizeobserver`

📖 [MDN: ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) · 📊 [caniuse: resizeobserver](https://caniuse.com/resizeobserver)

## Example

```ts
import {
  observeResize,
  disconnectResizeObserver,
  observeResizeOnce,
} from '@rtorcato/browser-common/resizeobserver'

const obs = observeResize(panel, (entries) => console.log(entries[0]?.contentRect))
disconnectResizeObserver(obs)

observeResizeOnce(panel, () => console.log('first resize'))
```

## Exports

- `observeResize(element, callback, options?)` — observes an element, returns the `ResizeObserver`
- `disconnectResizeObserver(observer)` — stops an observer
- `observeResizeOnce(element, callback, options?)` — observes and auto-disconnects after the first resize

See the [API reference](/docs/api/resizeobserver) for full signatures.
