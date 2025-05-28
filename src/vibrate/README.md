# Vibration API Utilities

This module provides utility functions for working with the [Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API) in the browser.

## Features

- Check if the Vibration API is available
- Vibrate the device with a custom pattern or duration
- Stop ongoing vibration
- Common vibration patterns (pulse, notification)

## API

### `isVibrationApiAvailable(): boolean`
Returns `true` if the Vibration API is available in the current browser.

### `vibrate(pattern: number | number[]): boolean`
Triggers vibration with the given pattern. Returns `true` if vibration was triggered, `false` otherwise.

### `stopVibration(): boolean`
Stops any ongoing vibration. Returns `true` if vibration was stopped, `false` otherwise.

### `vibratePulse(duration?: number): boolean`
Vibrates the device with a short pulse (default 200ms).

### `vibrateNotification(): boolean`
Vibrates the device with a notification pattern (e.g., vibrate 100ms, pause 50ms, vibrate 100ms).

## Example

```typescript
import { isVibrationApiAvailable, vibrate, stopVibration, vibratePulse, vibrateNotification } from "./vibrate";

if (isVibrationApiAvailable()) {
  vibrate([200, 100, 200]); // Custom pattern
  vibratePulse();           // Short pulse
  vibrateNotification();    // Notification pattern
  stopVibration();          // Stop vibration
}
```
