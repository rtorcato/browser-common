# Print Utilities

This module provides utility functions for working with the browser's print capabilities, including printing the whole page or a specific element.

## Features

- Trigger the browser's print dialog
- Print a specific HTML element by its ID
- Check if print is supported

## API

### `printPage(): void`
Triggers the browser's print dialog for the current page.

### `printElementById(elementId: string): void`
Prints the content of a specific element by its ID. Opens a new window with the element's content and triggers print.

### `isPrintAvailable(): boolean`
Returns `true` if the browser supports the print function.

## Example

```typescript
import { printPage, printElementById, isPrintAvailable } from './print';

if (isPrintAvailable()) {
  printPage();
  printElementById('my-section');
}
```
