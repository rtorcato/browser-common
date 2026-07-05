---
title: viewtransitions
sidebar_label: viewtransitions
---

# viewtransitions

Animate DOM updates via the View Transitions API.

**Import:** `@rtorcato/browser-common/viewtransitions`

📖 [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) · 📊 [caniuse: view-transitions](https://caniuse.com/view-transitions)

`startViewTransition` runs the callback synchronously as a fallback when unsupported, so it's always safe to call.

## Example

```ts
import { startViewTransition } from '@rtorcato/browser-common/viewtransitions'

await startViewTransition(() => updateDOM())
```

## Exports

- `isViewTransitionsSupported()` — feature check
- `startViewTransition(updateCallback)` — runs the update in a view transition when supported, otherwise runs it directly

See the [API reference](/docs/api/viewtransitions) for full signatures.
