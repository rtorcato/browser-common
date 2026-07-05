---
title: serviceworkers
sidebar_label: serviceworkers
---

# serviceworkers

Register, unregister, and message service workers via the Service Worker API.

**Import:** `@rtorcato/browser-common/serviceworkers`

📖 [MDN: Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) · 📊 [caniuse: serviceworkers](https://caniuse.com/serviceworkers)

Registering a service worker needs a **secure context** (HTTPS/localhost).

## Example

```ts
import {
  isServiceWorkerAvailable,
  registerServiceWorker,
  postMessageToServiceWorker,
} from '@rtorcato/browser-common/serviceworkers'

if (isServiceWorkerAvailable()) {
  const reg = await registerServiceWorker('/sw.js', { scope: '/' })
  postMessageToServiceWorker({ type: 'skipWaiting' })
}
```

## Exports

- `isServiceWorkerAvailable()` — feature check
- `registerServiceWorker(scriptUrl, options?)` — registers a service worker, resolves to the `ServiceWorkerRegistration` or `undefined`
- `unregisterAllServiceWorkers()` — unregisters every service worker for the current origin
- `getServiceWorkerRegistration()` — resolves to the active `ServiceWorkerRegistration`, or `undefined`
- `postMessageToServiceWorker(message)` — sends a message to the active service worker

See the [API reference](/docs/api/serviceworkers) for full signatures.
