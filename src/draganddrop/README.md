# Drag and Drop Utilities

This module provides utility functions for handling drag-and-drop interactions in the browser, including file drops, text drops, and making elements draggable.

## Features

- Enable file drop on an element and handle dropped files
- Make elements draggable with custom data
- Enable text drop on an element and handle dropped text
- Remove drag-and-drop event listeners from an element

## API

### `enableFileDrop(element: HTMLElement, onDrop: (files: FileList) => void): void`
Adds drag-and-drop listeners to an element for file drops. Calls `onDrop` with the dropped files.

### `makeDraggable(element: HTMLElement, data: string, effectAllowed?: DataTransfer['effectAllowed']): void`
Makes an element draggable and sets the drag data and effect.

### `enableTextDrop(element: HTMLElement, onDrop: (text: string) => void): void`
Adds drag-and-drop listeners to an element for plain text drops. Calls `onDrop` with the dropped text.

### `disableDragAndDrop(element: HTMLElement): void`
Removes all drag-and-drop listeners from the element by replacing it with a clone.

## Example

```typescript
import { enableFileDrop, makeDraggable, enableTextDrop, disableDragAndDrop } from "./draganddrop";

// Enable file drop
enableFileDrop(document.getElementById("dropzone"), (files) => {
  console.log(files);
});

// Make an element draggable
makeDraggable(document.getElementById("draggable"), "my-data");

// Enable text drop
enableTextDrop(document.getElementById("textdrop"), (text) => {
  console.log(text);
});

// Remove drag-and-drop listeners
disableDragAndDrop(document.getElementById("dropzone"));
```
