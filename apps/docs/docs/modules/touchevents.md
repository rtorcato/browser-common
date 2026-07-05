---
title: touchevents
sidebar_label: touchevents
---

# touchevents

Subscribe to touch events and read active touch points via the Touch Events API.

**Import:** `@rtorcato/browser-common/touchevents`

📖 [MDN: Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) · 📊 [caniuse: touch](https://caniuse.com/touch)

## Example

```ts
import {
  isTouchEventsAvailable,
  onTouch,
  getTouchPoints,
  getTouchCount,
} from '@rtorcato/browser-common/touchevents'

if (isTouchEventsAvailable()) {
  const off = onTouch(canvas, 'touchmove', (e) => {
    const points = getTouchPoints(e)
    points.forEach((p) => drawDot(p.x, p.y))
  }, { passive: true })

  canvas.addEventListener('touchstart', (e) => {
    if (getTouchCount(e) === 2) startPinch(e)
  })

  off()
}
```

## Exports

- `isTouchEventsAvailable()` — feature check
- `onTouch(element, type, handler, options?)` — attaches a touch listener, returns an unsubscribe function
- `getTouchPoints(event)` — `{x, y}` points for every currently active touch (`event.touches`)
- `getTouchCount(event)` — number of currently active touches (`event.touches.length`)

See the [API reference](/docs/api/touchevents) for full signatures.
