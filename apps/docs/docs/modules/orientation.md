---
title: orientation
sidebar_label: orientation
---

# orientation

Read device orientation events and lock/unlock the screen orientation via the DeviceOrientation and Screen Orientation APIs.

**Import:** `@rtorcato/browser-common/orientation`

📖 [MDN: DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent) · 📊 [caniuse: deviceorientation](https://caniuse.com/deviceorientation)

iOS 13+ Safari requires an explicit user-gesture permission grant (see [motion](/docs/modules/motion)'s `requestMotionPermission`, which covers orientation too).

## Example

```ts
import {
  isDeviceOrientationAvailable,
  onDeviceOrientation,
  lockScreenOrientation,
  unlockScreenOrientation,
} from '@rtorcato/browser-common/orientation'

if (isDeviceOrientationAvailable()) {
  const off = onDeviceOrientation((e) => console.log(e.alpha, e.beta, e.gamma))
  off()
}

await lockScreenOrientation('landscape-primary')
unlockScreenOrientation()
```

## Exports

- `isDeviceOrientationAvailable()` — feature check for `DeviceOrientationEvent`
- `onDeviceOrientation(callback)` — subscribes to orientation changes, returns an unsubscribe function
- `getScreenOrientationType()` — current orientation type (e.g. `'portrait-primary'`)
- `lockScreenOrientation(type)` — locks the screen to an orientation, if supported
- `unlockScreenOrientation()` — unlocks the screen orientation, if supported

See the [API reference](/docs/api/orientation) for full signatures.
