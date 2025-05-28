# Session Storage Utilities

This module provides utility functions for working with the [sessionStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) in the browser.

## Features

- Check if sessionStorage is available
- Set, get, remove, and clear sessionStorage values (with JSON support)

## API

### `isSessionStorageAvailable(): boolean`
Returns `true` if sessionStorage is available in the current environment.

### `setSessionStorage(key: string, value: any): void`
Sets a value in sessionStorage. Objects are automatically stringified.

### `getSessionStorage(key: string): any | null`
Gets a value from sessionStorage and parses it as JSON. Returns `null` if not found or not available.

### `removeSessionStorage(key: string): void`
Removes a value from sessionStorage.

### `clearSessionStorage(): void`
Clears all keys from sessionStorage.

## Example

```typescript
import {
  isSessionStorageAvailable,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  clearSessionStorage
} from './sessionstorage';

if (isSessionStorageAvailable()) {
  setSessionStorage('user', { name: 'Alice' });
  const user = getSessionStorage('user'); // { name: 'Alice' }
  removeSessionStorage('user');
  clearSessionStorage();
}
```
