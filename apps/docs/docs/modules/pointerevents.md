---
title: pointerevents
sidebar_label: pointerevents
---

# pointerevents

Unified mouse/pen/touch input handling via the Pointer Events API.

**Import:** `@rtorcato/browser-common/pointerevents`

📖 [MDN: Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) · 📊 [caniuse: pointer](https://caniuse.com/pointer)

## Example

```ts
import { isPointerEventsAvailable, onPointer, getPointerType, isPrimaryPointer } from '@rtorcato/browser-common/pointerevents'

if (isPointerEventsAvailable()) {
  const off = onPointer(canvas, 'pointerdown', (e) => {
    if (getPointerType(e) === 'pen' && isPrimaryPointer(e)) draw(e.clientX, e.clientY)
  })
  off()
}
```

## Exports

- `isPointerEventsAvailable()` — feature check
- `onPointer(element, type, handler, options?)` — subscribes to a pointer event, returns an unsubscribe function
- `getPointerType(event)` — input device type: `'mouse' | 'pen' | 'touch' | ''`
- `isPrimaryPointer(event)` — true if the event is the primary pointer of its type

See the [API reference](/docs/api/pointerevents) for full signatures.
