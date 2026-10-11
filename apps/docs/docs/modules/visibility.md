---
title: visibility
sidebar_label: visibility
---

# visibility

Check whether the page is visible or hidden, and react when the user switches
tabs or minimises the window, via the Page Visibility API.

**Import:** `@rtorcato/browser-common/visibility`

📖 [MDN: Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) · 📊 [caniuse: pagevisibility](https://caniuse.com/pagevisibility)

::browser-support[visibility]

## Example

```ts
import {
  isPageVisible,
  onVisibilityChange,
} from '@rtorcato/browser-common/visibility'

if (isPageVisible()) startPolling()

const off = onVisibilityChange((state) => {
  if (state === 'hidden') stopPolling()
  else startPolling()
})
// later:
off()
```

## Exports

- `isVisibilityAvailable()` — feature check
- `getVisibilityState()` — `'visible'` or `'hidden'`, or `null` where unsupported
- `isPageVisible()` — `true` / `false`, or `null` where unsupported
- `onVisibilityChange(callback)` — subscribe to `visibilitychange`; the callback gets the new state; returns an unsubscribe function

See the [API reference](/docs/api/visibility) for full signatures.
