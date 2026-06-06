---
title: Browser support
description: Which modules work in which browsers.
---

Every module guards its underlying API. Operations return `null`/`false` on unsupported browsers — they never throw. See [the contract](/browser-common/guides/contract/) for details.

The browsers below are the latest stable releases. For an authoritative source on each underlying Web API, see [MDN: Web APIs](https://developer.mozilla.org/en-US/docs/Web/API).

## Universally supported

Available in all evergreen browsers (Chrome, Firefox, Safari, Edge):

`alert`, `canvas`, `clipboard`, `common`, `cookies`, `dom`, `draganddrop`, `encodingapis`, `focus`, `forms`, `fullscreen`, `geolocation`, `history`, `htmlmedia`, `iframe`, `intersection`, `keyboard`, `localstorage`, `location`, `mediadevices`, `motion`, `mutationobserver`, `notifications`, `orientation`, `performance`, `permissions`, `pointerevents`, `print`, `resizeobserver`, `screen`, `selectionapi`, `serviceworkers`, `sessionstorage`, `touchevents`, `visualviewport`, `weblocks`, `websockets`, `window`

A few of these require **HTTPS** at runtime (or `localhost` for dev): `clipboard`, `geolocation`, `mediadevices`, `serviceworkers`, `notifications`.

## Chromium-only

These wrap APIs that ship in Chrome and Edge but not Firefox or Safari. Always check `is<Name>Available()` first; on unsupported browsers it returns `false` and ops no-op.

| Module | Chrome | Edge | Firefox | Safari |
|---|---|---|---|---|
| `backgroundtasks` | ✅ | ✅ | ❌ | ❌ |
| `filesystem` (File System Access) | ✅ 86+ | ✅ 86+ | ❌ | ❌ |
| `idle` (Idle Detection) | ✅ 94+ | ✅ 94+ | ❌ | ❌ |

## Quirks worth knowing

| Module | Note |
|---|---|
| `battery` | Firefox **removed** the Battery Status API in v52. Safari never shipped it. Chrome and Edge only. |
| `vibrate` | Safari (desktop + iOS) never shipped the Vibration API. Chrome, Firefox, Edge only. |
| `webshare` | Wide support on **mobile** (iOS Safari, Android Chrome) and Safari desktop. Firefox desktop never shipped it. |
| `motion` / `orientation` | iOS 13+ Safari requires an explicit user-gesture permission grant before events fire — use `requestMotionPermission()`. |
