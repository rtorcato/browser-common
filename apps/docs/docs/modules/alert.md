---
title: alert
sidebar_label: alert
---

# alert

Thin wrappers around the browser's `alert`, `confirm`, and `prompt` dialogs.

**Import:** `@rtorcato/browser-common/alert`

📖 [MDN: Window.alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)

`showAlert`, `showConfirm`, and `showPrompt` all **throw** a
`requires a browser environment` error when called outside a browser (no
`window`) — there is no feature-check function, so guard with your own
environment check if you might run this code server-side.

## Example

```ts
import { showAlert, showConfirm, showPrompt } from '@rtorcato/browser-common/alert'

showAlert('Saved!')

if (showConfirm('Delete item?')) {
  deleteItem()
}

const name = showPrompt('Your name?', 'Anon')
```

## Exports

- `showAlert(message)` — shows an alert dialog
- `showConfirm(message)` — shows a confirm dialog, returns `true` if OK was clicked
- `showPrompt(message, defaultValue?)` — shows a prompt dialog, returns the input or `null`

See the [API reference](/docs/api/alert) for full signatures.
