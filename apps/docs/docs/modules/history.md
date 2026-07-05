---
title: history
sidebar_label: history
---

# history

Wrappers around the History API for pushing and replacing entries,
navigating back/forward, and listening for `popstate`.

**Import:** `@rtorcato/browser-common/history`

📖 [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) · 📊 [caniuse: history](https://caniuse.com/history)

## Example

```ts
import { pushState, onPopState, goBack } from '@rtorcato/browser-common/history'

pushState('/page/2', { page: 2 })

const off = onPopState((event) => {
  console.log('navigated to', event.state)
})

goBack()
off()
```

## Exports

- `pushState(url, state?, title?)` — pushes a new history entry
- `replaceState(url, state?, title?)` — replaces the current history entry
- `goBack()` — navigates back one entry
- `goForward()` — navigates forward one entry
- `go(delta)` — navigates to a relative position in the history stack
- `onPopState(callback)` — listens for `popstate`; returns an unsubscribe function

See the [API reference](/docs/api/history) for full signatures.
