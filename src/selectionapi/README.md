# Selection API Utilities

This module provides utility functions for working with the [Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) in the browser.

## Features

- Check if the Selection API is available
- Get the current selection or selected text
- Clear the current selection
- Select the text content of a given element

## API

### `isSelectionApiAvailable(): boolean`
Returns `true` if the Selection API is available in the current environment.

### `getSelection(): Selection | null`
Returns the current `Selection` object, or `null` if not available.

### `getSelectedText(): string`
Returns the currently selected text, or an empty string if none.

### `clearSelection(): void`
Clears the current selection, if any.

### `selectElementText(element: Element): void`
Selects the text content of the given element.

## Example

```typescript
import {
  isSelectionApiAvailable,
  getSelection,
  getSelectedText,
  clearSelection,
  selectElementText
} from './selectionapi';

if (isSelectionApiAvailable()) {
  const text = getSelectedText();
  clearSelection();
  selectElementText(document.getElementById('my-text'));
}
```
