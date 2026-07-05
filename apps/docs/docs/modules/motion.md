---
title: motion
sidebar_label: motion
---

# motion

Listen for device motion (acceleration) events via the DeviceMotionEvent and Generic Sensor APIs.

**Import:** `@rtorcato/browser-common/motion`

📖 [MDN: DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) · 📊 [caniuse: deviceorientation](https://caniuse.com/deviceorientation)

iOS 13+ Safari requires an explicit user-gesture permission grant (`requestMotionPermission`).

## Example

```ts
import { isDeviceMotionAvailable, onDeviceMotion, requestMotionPermission } from '@rtorcato/browser-common/motion'

button.addEventListener('click', async () => {
  if ((await requestMotionPermission()) === 'granted' && isDeviceMotionAvailable()) {
    const off = onDeviceMotion((e) => console.log(e.acceleration))
  }
})
```

## Exports

- `isDeviceMotionAvailable()` — feature check for `DeviceMotionEvent`
- `onDeviceMotion(callback)` — subscribes to motion events, returns an unsubscribe function
- `isGenericSensorApiAvailable()` — feature check for the Generic Sensor API
- `requestMotionPermission()` — requests iOS 13+ motion permission, resolves `'granted' | 'denied' | 'default'`

See the [API reference](/docs/api/motion) for full signatures.
