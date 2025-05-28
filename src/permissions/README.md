# Permissions API Utilities

This module provides utility functions for working with the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API) in the browser.

## Features

- Check if the Permissions API is available
- Query the status of a permission (e.g., 'geolocation', 'notifications')
- Listen for permission status changes

## API

### `isPermissionsApiAvailable(): boolean`
Returns `true` if the Permissions API is available in the current environment.

### `queryPermission(name: PermissionName): Promise<PermissionState | undefined>`
Queries the status of the given permission name. Returns a promise resolving to `'granted'`, `'denied'`, `'prompt'`, or `undefined` if not supported.

### `onPermissionChange(status: PermissionStatus, callback: () => void): () => void`
Adds a change event listener to a permission status object. Returns a function to remove the listener.

## Example

```typescript
import {
  isPermissionsApiAvailable,
  queryPermission,
  onPermissionChange
} from './permissions';

if (isPermissionsApiAvailable()) {
  const state = await queryPermission('geolocation');
  console.log('Geolocation permission:', state);
}
```
