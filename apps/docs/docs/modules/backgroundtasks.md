---
title: backgroundtasks
sidebar_label: backgroundtasks
---

# backgroundtasks

Registers Background Sync and Background Fetch tasks through a service
worker registration.

**Import:** `@rtorcato/browser-common/backgroundtasks`

📖 [MDN: Background Synchronization API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Synchronization_API)

Background Sync and Background Fetch are Chromium-only and require an active
service worker — `registerBackgroundSync`/`registerBackgroundFetch` resolve
to `undefined` silently when unsupported or no service worker is registered,
they don't throw.

## Example

```ts
import {
  isBackgroundSyncAvailable,
  registerBackgroundSync,
  registerBackgroundFetch,
} from '@rtorcato/browser-common/backgroundtasks'

if (isBackgroundSyncAvailable()) {
  await registerBackgroundSync('sync-outbox')
}

await registerBackgroundFetch('media', ['/video.mp4'], { title: 'Video' })
```

## Exports

- `isBackgroundSyncAvailable()` — feature check for Background Sync
- `isBackgroundFetchAvailable()` — feature check for Background Fetch
- `registerBackgroundSync(tag)` — registers a background sync task
- `registerBackgroundFetch(tag, urls, options?)` — registers a background fetch task

See the [API reference](/docs/api/backgroundtasks) for full signatures.
