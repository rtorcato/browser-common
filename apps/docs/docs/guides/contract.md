---
title: The safe-by-default contract
description: Every module follows the same shape — guard, no-throw, SSR-safe.
---

Every module in `@rtorcato/browser-common` follows the same three-part contract. Memorize it once; you know how every module behaves.

## 1. Support check returns boolean

Every module exports an `is<Name>Available()` function that returns `boolean`. Call it before any operation.

```ts
import { isClipboardApiAvailable } from '@rtorcato/browser-common/clipboard'

if (isClipboardApiAvailable()) {
	// safe to call the rest of the clipboard API
}
```

## 2. Operations never throw on unsupported environments

If the underlying Web API is missing, operations return:

- `null` (for "get" operations that return a value)
- `false` (for "set" / "do" operations that report success)
- An empty/rejected result (for promise-returning operations)

Never a thrown exception from a missing API. Your `try`/`catch` is only needed for the API's *own* errors (network failures, permission denials), not for "this browser doesn't support it".

```ts
// In Node.js or an old browser:
const ok = await copyToClipboard('hello')
// ok === false — no exception thrown
```

## 3. Safe to import in SSR / Node

Top-level code in every module is guarded with `typeof window !== 'undefined'` / `typeof navigator !== 'undefined'` checks. You can `import` modules in:

- Server-rendered React / Vue / Svelte components
- Node.js scripts
- Static site generators
- Edge runtimes

The calls become no-ops in those environments. There's no separate "server build" to manage.

## Runtime requirements still apply

The contract above is about *imports* — operations still have the usual Web API requirements at runtime:

| Module(s) | Runtime requirement |
|---|---|
| `clipboard` (write), `mediadevices.getUserMedia`, `serviceworkers.register`, `notifications.requestPermission` | Secure context (HTTPS or `localhost`) |
| `clipboard.copyToClipboard`, `fullscreen.enterFullscreen`, `htmlmedia.playMedia`, `vibrate.vibrate` | User-gesture initiated (click handler, keydown, etc.) |
| `motion.requestMotionPermission`, `orientation.requestPermission` | iOS 13+ Safari needs explicit permission grant |

These are documented per-function in JSDoc — your IDE will show them on hover.
