# Web Locks API Utilities

This module provides utility functions for working with the [Web Locks API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API) in the browser.

## Features

- Check if the Web Locks API is supported.
- Run asynchronous code while holding a named lock, ensuring exclusive access to resources.

## API

### `isWebLocksAvailable(): boolean`

Returns `true` if the Web Locks API is available in the current browser.

### `withLock<T>(name: string, callback: () => Promise<T>): Promise<T>`

Acquires a lock with the given name, runs the provided async callback, and releases the lock when done.

## Example

```typescript
import { withLock, isWebLocksAvailable } from "./weblocks";

if (isWebLocksAvailable()) {
  await withLock("my-resource", async () => {
    // Critical section: safe to access shared resource here
  });
}
```
