---
title: draganddrop
sidebar_label: draganddrop
---

# draganddrop

Attaches drag-and-drop event listeners for file drops, text drops, and
draggable elements using the native HTML Drag and Drop API.

**Import:** `@rtorcato/browser-common/draganddrop`

📖 [MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

## Example

```ts
import { enableFileDrop, makeDraggable, disableDragAndDrop } from '@rtorcato/browser-common/draganddrop'

enableFileDrop(dropzone, (files) => upload(files))
makeDraggable(card, 'card-42')

// later:
disableDragAndDrop(dropzone)
```

## Exports

- `enableFileDrop(element, onDrop)` — makes an element a drop target for files
- `makeDraggable(element, data, effectAllowed?)` — makes an element draggable with a data payload
- `enableTextDrop(element, onDrop)` — makes an element a drop target for plain text
- `disableDragAndDrop(element)` — removes drag-and-drop listeners by cloning and replacing the element

See the [API reference](/docs/api/draganddrop) for full signatures.
