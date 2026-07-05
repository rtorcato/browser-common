---
title: iframe
sidebar_label: iframe
---

# iframe

Helpers for reading and controlling iframe content — window/document
access, `postMessage`, `src` changes, reloading, and load detection.

**Import:** `@rtorcato/browser-common/iframe`

📖 [MDN: HTMLIFrameElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement)

## Example

```ts
import {
  isIframe,
  postMessageToIframe,
  onIframeLoad,
} from '@rtorcato/browser-common/iframe'

if (isIframe(el)) {
  onIframeLoad(el, () => console.log('iframe ready'))
  postMessageToIframe(el, { type: 'ping' }, 'https://example.com')
}
```

## Exports

- `isIframe(el)` — type guard for `HTMLIFrameElement`
- `getIframeWindow(iframe)` — returns `contentWindow` or `null`
- `getIframeDocument(iframe)` — returns `contentDocument` or `null`
- `postMessageToIframe(iframe, message, targetOrigin?)` — posts a message to the iframe's window
- `setIframeSrc(iframe, url)` — sets the iframe's `src`
- `reloadIframe(iframe)` — reloads the iframe's content
- `isIframeLoaded(iframe)` — true once `contentDocument.readyState` is `'complete'`
- `onIframeLoad(iframe, callback)` — adds a `load` event listener

See the [API reference](/docs/api/iframe) for full signatures.
