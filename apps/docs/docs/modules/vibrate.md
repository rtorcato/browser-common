---
title: vibrate
sidebar_label: vibrate
---

# vibrate

Trigger and stop device vibration via the Vibration API.

**Import:** `@rtorcato/browser-common/vibrate`

📖 [MDN: Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) · 📊 [caniuse: vibration](https://caniuse.com/vibration)

Not supported on Safari (desktop or iOS).

## Example

```ts
import {
  isVibrationApiAvailable,
  vibrate,
  stopVibration,
  vibratePulse,
  vibrateNotification,
} from '@rtorcato/browser-common/vibrate'

if (isVibrationApiAvailable()) {
  vibrate([200, 100, 200])
  vibratePulse(300)
  vibrateNotification()
  stopVibration()
}
```

## Exports

- `isVibrationApiAvailable()` — feature check
- `vibrate(pattern)` — vibrates for a duration or pattern (ms), returns whether it was triggered
- `stopVibration()` — stops any ongoing vibration
- `vibratePulse(duration?)` — a short pulse (default 200ms)
- `vibrateNotification()` — a preset notification pattern

See the [API reference](/docs/api/vibrate) for full signatures.
