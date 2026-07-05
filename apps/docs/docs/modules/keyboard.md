---
title: keyboard
sidebar_label: keyboard
---

# keyboard

Keyboard event helpers — key and modifier checks, printable-key detection,
multi-key shortcuts, and preventing default for a specific key.

**Import:** `@rtorcato/browser-common/keyboard`

📖 [MDN: KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)

## Example

```ts
import { onShortcut, isKey } from '@rtorcato/browser-common/keyboard'

const off = onShortcut(['Control', 's'], (event) => {
  event.preventDefault()
  save()
})

input.addEventListener('keydown', (e) => {
  if (isKey(e, 'Enter')) submit()
})

off()
```

## Exports

- `isKey(event, key)` — case-insensitive match against `event.key`
- `isModifierKey(event)` — true for Shift, Control, Alt, or Meta
- `isPrintableKey(event)` — true for a single printable character (no Ctrl/Meta)
- `onShortcut(keys, callback, target?)` — fires when all `keys` are held together; returns an unsubscribe function
- `preventKeyDefault(key, target?)` — calls `preventDefault()` whenever `key` is pressed; returns an unsubscribe function

See the [API reference](/docs/api/keyboard) for full signatures.
