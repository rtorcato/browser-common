---
title: print
sidebar_label: print
---

# print

Trigger the browser print dialog for the whole page or a single element.

**Import:** `@rtorcato/browser-common/print`

📖 [MDN: Window.print()](https://developer.mozilla.org/en-US/docs/Web/API/Window/print)

## Example

```ts
import { isPrintAvailable, printPage, printElementById } from '@rtorcato/browser-common/print'

if (isPrintAvailable()) {
  printPage()
  printElementById('receipt')
}
```

## Exports

- `printPage()` — triggers the browser's print dialog
- `printElementById(elementId)` — opens a new window with the element's content and prints it
- `isPrintAvailable()` — feature check

See the [API reference](/docs/api/print) for full signatures.
