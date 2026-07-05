---
title: dom
sidebar_label: dom
---

# dom

Short-hand wrappers around common DOM operations — querying, creating
elements, classes, attributes, and `data-*` attributes.

**Import:** `@rtorcato/browser-common/dom`

📖 [MDN: Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

## Example

```ts
import { $, $$, createElement, addClass, toggleClass, setData } from '@rtorcato/browser-common/dom'

const btn = $('button.primary')
const items = $$('.item')

const el = createElement('button', { className: 'primary' }, 'Save')
addClass(el, 'active')
toggleClass(el, 'open')
setData(el, 'userId', '42')
```

## Exports

- `$(selector, parent?)` — selects the first matching element, or `null`
- `$$(selector, parent?)` — selects all matching elements as an array
- `createElement(tag, props?, ...children)` — creates an element with props and children
- `removeElement(el)` — removes an element from the DOM
- `setAttributes(el, attrs)` — sets multiple attributes at once
- `addClass(el, ...classes)` — adds one or more classes
- `removeClass(el, ...classes)` — removes one or more classes
- `toggleClass(el, className, force?)` — toggles a class, returns whether it's now present
- `hasClass(el, className)` — `true` if the element has the class
- `getData(el, key)` — reads a `data-*` attribute
- `setData(el, key, value)` — sets a `data-*` attribute

See the [API reference](/docs/api/dom) for full signatures.
