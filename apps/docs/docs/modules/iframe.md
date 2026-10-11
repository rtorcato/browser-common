---
title: iframe
sidebar_label: iframe
---

# iframe

Helpers for reading and controlling iframe content — window/document
access, `postMessage`, `src` changes, reloading, and load detection.

**Import:** `@rtorcato/browser-common/iframe`

📖 [MDN: HTMLIFrameElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement)

::browser-support[iframe]

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
- `postMessageToIframe(iframe, message, targetOrigin?)` — posts a message to the iframe's window; `targetOrigin` defaults to the origin of the iframe's `src`
- `setIframeSrc(iframe, url)` — sets the iframe's `src`
- `reloadIframe(iframe)` — reloads the iframe's content
- `isIframeLoaded(iframe)` — true once `contentDocument.readyState` is `'complete'`
- `onIframeLoad(iframe, callback)` — adds a `load` event listener

## Safe usage

`postMessageToIframe` defaults `targetOrigin` to the origin of the iframe's `src`, so the browser
drops the message if the frame has navigated to another origin. When the `src` has an opaque origin
(`data:`, `about:blank`) there is nothing to default to, and it throws a `TypeError` until you pass
`targetOrigin` yourself.

Passing `'*'` sends to whatever origin the iframe is showing at that moment. Only do that on
purpose, and never with sensitive data:

```ts
postMessageToIframe(iframe, { token }) // only to the origin of iframe.src
postMessageToIframe(iframe, { type: 'ping' }, '*') // any origin: opt in explicitly
```

See the [API reference](/docs/api/iframe) for full signatures.
