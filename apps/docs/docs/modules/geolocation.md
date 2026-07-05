---
title: geolocation
sidebar_label: geolocation
---

# geolocation

Read the device's location, once or as a continuous watch, via the
Geolocation API.

**Import:** `@rtorcato/browser-common/geolocation`

📖 [MDN: Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) · 📊 [caniuse: geolocation](https://caniuse.com/geolocation)

Requires a **secure context** (HTTPS, or `localhost` in dev) and prompts the
user for permission on first use.

## Example

```ts
import {
  isGeolocationAvailable,
  getCurrentPosition,
  watchPosition,
  clearWatch,
} from '@rtorcato/browser-common/geolocation'

if (isGeolocationAvailable()) {
  const position = await getCurrentPosition({ enableHighAccuracy: true })
  console.log(position.coords.latitude, position.coords.longitude)

  const watchId = watchPosition((p) => updateMap(p.coords))
  // later:
  if (watchId !== undefined) clearWatch(watchId)
}
```

## Exports

- `isGeolocationAvailable()` — feature check
- `getCurrentPosition(options?)` — resolve a single `GeolocationPosition`
- `watchPosition(success, error?, options?)` — subscribe to updates; returns a watch id
- `clearWatch(id)` — stop a watch

See the [API reference](/docs/api/geolocation) for full signatures.
