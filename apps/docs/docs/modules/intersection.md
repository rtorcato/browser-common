---
title: intersection
sidebar_label: intersection
---

# intersection

Thin wrappers around `IntersectionObserver` for observing element
visibility, including a one-shot `observeOnce` helper.

**Import:** `@rtorcato/browser-common/intersection`

📖 [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) · 📊 [caniuse: intersectionobserver](https://caniuse.com/intersectionobserver)

## Example

```ts
import { observeOnce, disconnectIntersectionObserver } from '@rtorcato/browser-common/intersection'

observeOnce(image, () => loadImage(image))
```

## Exports

- `observeIntersection(element, callback, options?)` — creates an `IntersectionObserver` and observes `element`
- `unobserveIntersection(observer, element)` — stops observing `element`
- `disconnectIntersectionObserver(observer)` — disconnects the observer entirely
- `observeOnce(element, callback, options?)` — fires `callback` once on first intersection, then disconnects

See the [API reference](/docs/api/intersection) for full signatures.
