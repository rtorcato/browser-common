---
title: websockets
sidebar_label: websockets
---

# websockets

Open, send over, and close WebSocket connections, with event handlers wired
up in one call.

**Import:** `@rtorcato/browser-common/websockets`

📖 [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) · 📊 [caniuse: websockets](https://caniuse.com/websockets)

## Example

```ts
import {
  isWebSocketAvailable,
  createWebSocket,
  sendWebSocketMessage,
  closeWebSocket,
} from '@rtorcato/browser-common/websockets'

if (isWebSocketAvailable()) {
  const ws = createWebSocket('wss://example.com', undefined, {
    onMessage: (e) => console.log(e.data),
  })
  sendWebSocketMessage(ws, JSON.stringify({ ping: 1 }))
  closeWebSocket(ws, 1000, 'done')
}
```

## Exports

- `isWebSocketAvailable()` — feature check
- `createWebSocket(url, protocols?, handlers?)` — opens a connection and attaches `onOpen`/`onMessage`/`onError`/`onClose` handlers
- `sendWebSocketMessage(ws, data)` — sends if the socket is open; returns `true`/`false`
- `closeWebSocket(ws, code?, reason?)` — closes if open or connecting

See the [API reference](/docs/api/websockets) for full signatures.
