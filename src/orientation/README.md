# Orientation Utilities

This module provides utility functions for working with device and screen orientation in the browser, including DeviceOrientation events and the Screen Orientation API.

## Features

- Check if DeviceOrientation API is available
- Listen for device orientation changes
- Get the current screen orientation type
- Lock and unlock screen orientation

## API

### `isDeviceOrientationAvailable(): boolean`
Returns `true` if the DeviceOrientationEvent API is available in the current browser.

### `onDeviceOrientation(callback: (event: DeviceOrientationEvent) => void): () => void`
Adds a listener for device orientation changes. Returns a function to remove the listener.

### `getScreenOrientationType(): string | undefined`
Returns the current screen orientation type (e.g., 'portrait-primary', 'landscape-primary'), or `undefined` if not available.

### `lockScreenOrientation(type: string): Promise<void> | undefined`
Locks the screen orientation to the specified type. Returns a promise or `undefined` if not supported.

### `unlockScreenOrientation(): void`
Unlocks the screen orientation if supported.

## Example

```typescript
import {
  isDeviceOrientationAvailable,
  onDeviceOrientation,
  getScreenOrientationType,
  lockScreenOrientation,
  unlockScreenOrientation
} from './orientation';

if (isDeviceOrientationAvailable()) {
  const remove = onDeviceOrientation((event) => {
    console.log(event.alpha, event.beta, event.gamma)
  });
  // Later: remove();
}

console.log(getScreenOrientationType());
lockScreenOrientation('portrait-primary');
unlockScreenOrientation();
```
