---
title: idle
sidebar_label: idle
---

# idle

Runs a callback when the browser or system is idle — via
`requestIdleCallback` (falling back to `setTimeout`) or the Chromium-only
Idle Detection API.

**Import:** `@rtorcato/browser-common/idle`

📖 [MDN: Idle Detection API](https://developer.mozilla.org/en-US/docs/Web/API/Idle_Detection_API) · 📊 [caniuse: IdleDetector](https://caniuse.com/mdn-api_idledetector)

The Idle Detection API (`detectIdle`) is Chromium-only, requires a
permission grant and a secure context, and returns `null` when unavailable —
check with `isIdleDetectionApiAvailable()` first. `onIdle`/`cancelIdle` use
`requestIdleCallback` and work everywhere via the `setTimeout` fallback.

::browser-support[idle]

## Example

```ts
import {
  isIdleDetectionApiAvailable,
  onIdle,
  cancelIdle,
  detectIdle,
} from '@rtorcato/browser-common/idle'

const id = onIdle((deadline) => doWork(deadline))
cancelIdle(id)

if (isIdleDetectionApiAvailable()) {
  const detector = await detectIdle(
    () => lockUI(),
    () => unlockUI()
  )
}
```

## Exports

- `isIdleDetectionApiAvailable()` — feature check for the Idle Detection API
- `onIdle(callback, options?)` — schedules a callback via `requestIdleCallback` (or `setTimeout` fallback)
- `cancelIdle(id)` — cancels a callback registered with `onIdle`
- `detectIdle(onIdle, onActive?)` — starts the Idle Detection API, returns the detector or `null`

See the [API reference](/docs/api/idle) for full signatures.
