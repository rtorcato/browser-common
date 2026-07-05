---
title: selectionapi
sidebar_label: selectionapi
---

# selectionapi

Read, clear, and set text selection via the Selection API.

**Import:** `@rtorcato/browser-common/selectionapi`

📖 [MDN: Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection)

## Example

```ts
import {
  isSelectionApiAvailable,
  getSelectedText,
  clearSelection,
  selectElementText,
} from '@rtorcato/browser-common/selectionapi'

if (isSelectionApiAvailable()) {
  const text = getSelectedText()
  clearSelection()
  selectElementText(document.querySelector('#code')!)
}
```

## Exports

- `isSelectionApiAvailable()` — feature check
- `getSelection()` — the current `Selection` object, or `null`
- `getSelectedText()` — the currently selected text, or `''`
- `clearSelection()` — clears the current selection
- `selectElementText(element)` — selects the text content of an element

See the [API reference](/docs/api/selectionapi) for full signatures.
