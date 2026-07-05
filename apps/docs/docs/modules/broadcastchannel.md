---
title: broadcastchannel
sidebar_label: broadcastchannel
---

# broadcastchannel

Same-origin messaging between tabs, windows, and workers via the
BroadcastChannel API.

**Import:** `@rtorcato/browser-common/broadcastchannel`

📖 [MDN: Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) · 📊 [caniuse: broadcastchannel](https://caniuse.com/broadcastchannel)

`createBroadcastChannel` returns a live channel object, so it **throws** a
`requires a browser environment` error where BroadcastChannel is unsupported —
guard with `isBroadcastChannelAvailable()` first.

## Example

```ts
import {
  isBroadcastChannelAvailable,
  createBroadcastChannel,
} from '@rtorcato/browser-common/broadcastchannel'

if (isBroadcastChannelAvailable()) {
  const channel = createBroadcastChannel<{ type: string }>('sync')

  const off = channel.onMessage((data) => {
    if (data.type === 'updated') refresh()
  })

  channel.send({ type: 'updated' })

  // later:
  off()
  channel.close()
}
```

## Exports

- `isBroadcastChannelAvailable()` — feature check
- `createBroadcastChannel(name)` — returns `{ onMessage, send, close, channel }`

See the [API reference](/docs/api/broadcastchannel) for full signatures.
