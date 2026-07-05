---
title: notifications
sidebar_label: notifications
---

# notifications

Request permission and show desktop notifications via the Notifications API.

**Import:** `@rtorcato/browser-common/notifications`

📖 [MDN: Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) · 📊 [caniuse: notifications](https://caniuse.com/notifications)

Needs a **secure context** and user permission (`requestNotificationPermission`).

## Example

```ts
import { isNotificationAvailable, notifyIfPermitted } from '@rtorcato/browser-common/notifications'

button.addEventListener('click', async () => {
  if (isNotificationAvailable()) {
    await notifyIfPermitted('Done', { body: 'Upload complete' })
  }
})
```

## Exports

- `isNotificationAvailable()` — feature check
- `requestNotificationPermission()` — asks the user for notification permission
- `showNotification(title, options?)` — shows a notification if permission is already granted
- `notifyIfPermitted(title, options?)` — requests permission if needed, then shows a notification

See the [API reference](/docs/api/notifications) for full signatures.
