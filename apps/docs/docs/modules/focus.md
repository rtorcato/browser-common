---
title: focus
sidebar_label: focus
---

# focus

Focus management helpers for moving focus to the first, last, next, or
previous focusable element within a container, or to a specific element by
selector.

**Import:** `@rtorcato/browser-common/focus`

📖 [MDN: HTMLElement.focus()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)

## Example

```ts
import { focusFirst, focusNext, focusBySelector } from '@rtorcato/browser-common/focus'

// open a dialog and focus its first focusable element
focusFirst(dialog)

// advance focus within a form on Tab-like custom navigation
focusNext(form)

// jump straight to a known field
focusBySelector(form, 'input[name="email"]')
```

## Exports

- `focusFirst(container)` — focuses the first focusable element in `container`
- `focusLast(container)` — focuses the last focusable element in `container`
- `focusNext(container)` — focuses the element after the currently focused one
- `focusPrev(container)` — focuses the element before the currently focused one
- `focusBySelector(container, selector)` — focuses the element matching `selector`

See the [API reference](/docs/api/focus) for full signatures.
