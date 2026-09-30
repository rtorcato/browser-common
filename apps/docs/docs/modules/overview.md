---
title: Modules
sidebar_label: Overview
sidebar_position: 1
---

# Modules

Each browser Web API lives in its own module, published as a subpath export
(e.g. `@rtorcato/browser-common/clipboard`). These pages are hand-written
guides — a short description, a runnable example, and links to the underlying
spec docs. For exact function signatures and types, see the generated
[API Reference](/docs/api).

## The shared shape

Every module exposes an `is<Name>Available()` feature check. Most operations
degrade gracefully when the API is missing (returning `null` / `false` /
empty). A few that must return a live object (`createBroadcastChannel`,
`getDisplayMedia`, `createCredential`, `createURLPattern`) or a dialog result
(`showAlert` / `showConfirm` / `showPrompt`) throw a clear
`requires a browser environment` error instead — guard those with the feature
check first.

Importing any module is always SSR / Node-safe; nothing touches `window` at
module load, so calls simply no-op or throw at call time, never at import.

## Support at a glance

One row per module, for the main Web API it wraps. **Baseline** is the
[web-features](https://web-platform-dx.github.io/web-features/) status:
*Widely available* (in every major browser for 30+ months), *Newly available*
(in every major browser, recently), or *Limited* (missing from at least one).
Each module page breaks this down per API, with notes on partial support.

::browser-support[matrix]

## Reference links

Each module page links two external references:

- **📖 MDN** — the developer-facing reference for the underlying Web API.
- **📊 caniuse** — the live browser-support table for that API.

For the full support summary across all modules, see the
[Browser support](/docs/guides/browser-support) guide.
