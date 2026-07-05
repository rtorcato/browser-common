---
title: webanimations
sidebar_label: webanimations
---

# webanimations

Animate elements imperatively via the Web Animations API (`Element.animate`).

**Import:** `@rtorcato/browser-common/webanimations`

📖 [MDN: Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) · 📊 [caniuse: web-animation](https://caniuse.com/web-animation)

## Example

```ts
import { isWebAnimationsAvailable, animateElement } from '@rtorcato/browser-common/webanimations'

if (isWebAnimationsAvailable()) {
  const anim = animateElement(el, [{ opacity: 0 }, { opacity: 1 }], 300)
  await anim?.finished
}
```

## Exports

- `isWebAnimationsAvailable()` — feature check
- `animateElement(element, keyframes, options?)` — runs `element.animate()`; returns the `Animation`, or `null` if unsupported

See the [API reference](/docs/api/webanimations) for full signatures.
