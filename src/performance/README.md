# Performance API Utilities

This module provides utility functions for working with the [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API) in the browser.

## Features

- Check if the Performance API is available
- Get a high-resolution timestamp
- Get performance entries by type
- Mark named timestamps
- Measure time between marks

## API

### `isPerformanceApiAvailable(): boolean`
Returns `true` if the Performance API is available in the current environment.

### `now(): number`
Returns the current high-resolution timestamp (in milliseconds). Falls back to `Date.now()` if not available.

### `getPerformanceEntriesByType(type: string): PerformanceEntry[]`
Returns all performance entries of the given type, or an empty array if not supported.

### `mark(name: string): void`
Marks a named timestamp in the performance timeline.

### `measure(name: string, startMark: string, endMark: string): void`
Measures the time between two marks.

## Example

```typescript
import {
  isPerformanceApiAvailable,
  now,
  getPerformanceEntriesByType,
  mark,
  measure
} from './performance';

if (isPerformanceApiAvailable()) {
  mark('start');
  // ... some code ...
  mark('end');
  measure('my-measure', 'start', 'end');
  const entries = getPerformanceEntriesByType('measure');
  console.log(entries);
}
```
