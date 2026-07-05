---
title: battery
sidebar_label: battery
---

# battery

Reads device battery level and charging state via the Battery Status API.

**Import:** `@rtorcato/browser-common/battery`

📖 [MDN: Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API)

The Battery Status API is Chromium-only and the spec is dormant — `getBatteryManager()`
resolves to `undefined` where unsupported, so guard with `isBatteryApiAvailable()` first.

## Example

```ts
import {
  isBatteryApiAvailable,
  getBatteryManager,
  onBatteryLevelChange,
} from '@rtorcato/browser-common/battery'

if (isBatteryApiAvailable()) {
  const battery = await getBatteryManager()
  const off = battery && onBatteryLevelChange(battery, () => console.log(battery.level))
  off?.()
}
```

## Exports

- `isBatteryApiAvailable()` — feature check
- `getBatteryManager()` — resolves to the `BatteryManager`, or `undefined`
- `onBatteryLevelChange(battery, callback)` — subscribes to level changes, returns an unsubscribe function
- `onBatteryChargingChange(battery, callback)` — subscribes to charging state changes, returns an unsubscribe function

See the [API reference](/docs/api/battery) for full signatures.
