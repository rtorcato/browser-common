# Pointer Events Utilities

This module provides utility functions for working with [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) in the browser.

## Features

- Check if Pointer Events are supported
- Add and remove pointer event listeners
- Normalize pointer events (for future cross-browser support)

## API

### `isPointerEventsSupported(): boolean`
Returns `true` if Pointer Events are supported in the current environment.

### `addPointerEventListener(element: Element, type: string, handler: EventListenerOrEventListenerObject): () => void`
Adds a pointer event listener to the given element. Returns a function to remove the listener.

### `normalizePointerEvent(event: PointerEvent): PointerEvent`
Returns the event as-is (can be extended for cross-browser support).

## Example

```typescript
import {
  isPointerEventsSupported,
  addPointerEventListener,
  normalizePointerEvent
} from './pointerevents';

if (isPointerEventsSupported()) {
  const remove = addPointerEventListener(document.body, 'pointerdown', (e) => {
    const event = normalizePointerEvent(e as PointerEvent);
    console.log(event.pointerType, event.clientX, event.clientY);
  });
  // Later: remove();
}
```
