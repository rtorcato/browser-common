---
title: Browser support
description: Which modules work in which browsers.
---

Every module guards its underlying API. Operations return `null`/`false` on unsupported browsers — they never throw. See [the contract](./contract.md) for details.

## Per-API support

Support depends on the Web API each module wraps, not on this library. The
[module overview](/docs/modules/overview#support-at-a-glance) has a table of
every module with its Baseline status and the first version of Chrome, Edge,
Firefox, Safari and iOS Safari that ships the API; each module page breaks it
down per API. Both are generated from
[MDN browser-compat-data](https://github.com/mdn/browser-compat-data) at docs
build time, so they track the current data rather than a hand-written snapshot.

A few modules require **HTTPS** at runtime (or `localhost` for dev): `clipboard`, `geolocation`, `mediadevices`, `serviceworkers`, `notifications`.

## The library's own floor

The published bundle is untranspiled ES2020 ESM (optional chaining, nullish
coalescing, native `import`/`export`). Loaded as-is, that needs at least
**Chrome 80, Edge 80, Firefox 74, Safari 13.1 and iOS Safari 13.4**. Your
bundler can transpile it further if you target older engines, but the Web API
underneath must still exist.

## Quirks worth knowing

| Module | Note |
|---|---|
| `battery` | Firefox **removed** the Battery Status API in v52. Safari never shipped it. Chrome and Edge only. |
| `vibrate` | Safari (desktop + iOS) never shipped the Vibration API. Chrome, Firefox, Edge only. |
| `webshare` | Wide support on **mobile** (iOS Safari, Android Chrome) and Safari desktop. Firefox desktop never shipped it. |
| `motion` / `orientation` | iOS 13+ Safari requires an explicit user-gesture permission grant before events fire — use `requestMotionPermission()`. |
