# Screen and Viewport Utilities

This module provides utility functions for working with the screen and viewport in the browser, including dimensions, orientation, and fullscreen mode.

## Features

- Get screen and viewport width/height
- Detect landscape/portrait orientation
- Enter and exit fullscreen mode
- Check fullscreen status

## API

### `getScreenWidth(): number | undefined`
Returns the screen width in pixels, or `undefined` if not in a browser.

### `getScreenHeight(): number | undefined`
Returns the screen height in pixels, or `undefined` if not in a browser.

### `getViewportWidth(): number | undefined`
Returns the viewport width in pixels, or `undefined` if not in a browser.

### `getViewportHeight(): number | undefined`
Returns the viewport height in pixels, or `undefined` if not in a browser.

### `isLandscape(): boolean | undefined`
Returns `true` if the viewport is in landscape orientation, `false` if portrait, or `undefined` if not in a browser.

### `isPortrait(): boolean | undefined`
Returns `true` if the viewport is in portrait orientation, `false` if landscape, or `undefined` if not in a browser.

### `enterFullscreen(element?: HTMLElement): Promise<void> | undefined`
Requests fullscreen mode for the given element (defaults to the document root). Returns a promise or `undefined` if not supported.

### `exitFullscreen(): Promise<void> | undefined`
Exits fullscreen mode. Returns a promise or `undefined` if not supported.

### `isFullscreen(): boolean | undefined`
Returns `true` if the browser is in fullscreen mode, `false` otherwise, or `undefined` if not in a browser.

## Example

```typescript
import {
  getScreenWidth,
  getScreenHeight,
  getViewportWidth,
  getViewportHeight,
  isLandscape,
  isPortrait,
  enterFullscreen,
  exitFullscreen,
  isFullscreen
} from './screen';

console.log('Screen:', getScreenWidth(), getScreenHeight());
console.log('Viewport:', getViewportWidth(), getViewportHeight());
if (isLandscape()) {
  console.log('Landscape mode');
}
```
