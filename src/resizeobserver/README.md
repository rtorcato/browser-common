# ResizeObserver Utilities

This module provides utility functions for working with the [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) in the browser.

## Features

- Observe element resize events with a callback
- Observe an element for a single resize event (fires callback once)
- Disconnect a ResizeObserver

## API

### `observeResize(element: Element, callback: ResizeObserverCallback, options?: ResizeObserverOptions): ResizeObserver`
Creates a ResizeObserver, starts observing the given element, and returns the observer instance.

### `disconnectResizeObserver(observer: ResizeObserver): void`
Disconnects the given ResizeObserver, stopping all observations.

### `observeResizeOnce(element: Element, callback: ResizeObserverCallback, options?: ResizeObserverOptions): ResizeObserver`
Observes the element for a single resize event, fires the callback, and then disconnects the observer.

## Example

```typescript
import { observeResize, disconnectResizeObserver, observeResizeOnce } from './resizeobserver';

const el = document.getElementById('my-element');
if (el) {
  // Observe all resizes
  const observer = observeResize(el, (entries) => {
    console.log('Resized!', entries);
  });

  // Observe only the first resize
  observeResizeOnce(el, (entries) => {
    console.log('First resize!', entries);
  });

  // Later, to stop observing:
  disconnectResizeObserver(observer);
}
```
