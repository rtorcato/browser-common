---
title: mediadevices
sidebar_label: mediadevices
---

# mediadevices

Enumerate media devices and request camera/microphone access via the MediaDevices API.

**Import:** `@rtorcato/browser-common/mediadevices`

📖 [MDN: MediaDevices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) · 📊 [caniuse: stream](https://caniuse.com/stream)

`getUserMedia` needs a **secure context** (HTTPS/localhost) and prompts for permission.

## Example

```ts
import {
  isMediaDevicesAvailable,
  getMediaDevices,
  getUserMedia,
  stopMediaStream,
} from '@rtorcato/browser-common/mediadevices'

if (isMediaDevicesAvailable()) {
  const devices = await getMediaDevices()
  const cams = devices.filter((d) => d.kind === 'videoinput')

  const stream = await getUserMedia({ video: true, audio: true })
  // ... use stream
  stopMediaStream(stream)
}
```

## Exports

- `isMediaDevicesAvailable()` — feature check
- `getMediaDevices()` — lists available input/output devices
- `getUserMedia(constraints)` — requests camera/microphone access, returns a `MediaStream`
- `stopMediaStream(stream)` — stops all tracks in a `MediaStream`
- `getMediaPermissionStatus(name)` — checks `'camera'` or `'microphone'` permission status

See the [API reference](/docs/api/mediadevices) for full signatures.
