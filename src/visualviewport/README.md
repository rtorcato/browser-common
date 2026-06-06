# Visual Viewport API Utilities

This module provides utility functions for working with the [Visual Viewport API](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API) in the browser.

## Features

- Check if the Visual Viewport API is supported.
- Get the current visual viewport dimensions and scale.
- Listen for visual viewport resize and scroll events.

## API

### `isVisualViewportAvailable(): boolean`
Returns `true` if the Visual Viewport API is available in the current browser.

### `getVisualViewportInfo(): VisualViewportInfo | null`
Returns the current visual viewport's properties (offset, size, scale), or `null` if not supported.

### `onVisualViewportChange(callback: () => void): () => void`
Adds listeners for `resize` and `scroll` events on the visual viewport. Returns a function to remove the listeners.

## Example

```typescript
import {
  isVisualViewportAvailable,
  getVisualViewportInfo,
  onVisualViewportChange
} from "./visualviewport";

if (isVisualViewportAvailable()) {
  const info = getVisualViewportInfo();
  console.log(info);

  const unsubscribe = onVisualViewportChange(() => {
    console.log("Viewport changed!", getVisualViewportInfo());
  });
  // Later, to remove listeners:
  // unsubscribe();
}
```
