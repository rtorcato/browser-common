---
title: mutationobserver
sidebar_label: mutationobserver
---

# mutationobserver

Observe DOM changes via the MutationObserver API.

**Import:** `@rtorcato/browser-common/mutationobserver`

📖 [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) · 📊 [caniuse: mutationobserver](https://caniuse.com/mutationobserver)

## Example

```ts
import {
  observeMutations,
  disconnectMutationObserver,
  observeMutationOnce,
} from '@rtorcato/browser-common/mutationobserver'

const obs = observeMutations(document.body, (records) => console.log(records))
disconnectMutationObserver(obs)

observeMutationOnce(container, () => console.log('mutated once'))
```

## Exports

- `observeMutations(element, callback, options?)` — observes an element, returns the `MutationObserver`
- `disconnectMutationObserver(observer)` — stops an observer
- `observeMutationOnce(element, callback, options?)` — observes and auto-disconnects after the first mutation

See the [API reference](/docs/api/mutationobserver) for full signatures.
