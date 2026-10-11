---
title: draganddrop
sidebar_label: draganddrop
---

# draganddrop

Attaches drag-and-drop event listeners for file drops, text drops, and
draggable elements using the native HTML Drag and Drop API.

**Import:** `@rtorcato/browser-common/draganddrop`

📖 [MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

::browser-support[draganddrop]

## Example

```ts
import { enableFileDrop, makeDraggable } from '@rtorcato/browser-common/draganddrop'

const offDrop = enableFileDrop(dropzone, (files) => upload(files))
const offDrag = makeDraggable(card, 'card-42')

// later:
offDrop()
offDrag()
```

## Exports

- `enableFileDrop(element, onDrop)` — makes an element a drop target for files; returns a cleanup function
- `makeDraggable(element, data, effectAllowed?)` — makes an element draggable with a data payload; returns a cleanup function
- `enableTextDrop(element, onDrop)` — makes an element a drop target for plain text; returns a cleanup function
- `disableDragAndDrop(element)` — **deprecated**: replaces the element with a clone, stripping every listener on it. Call the returned cleanup functions instead

See the [API reference](/docs/api/draganddrop) for full signatures.
