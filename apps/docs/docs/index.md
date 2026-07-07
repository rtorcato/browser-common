---
title: browser-common
description: Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs.
sidebar_position: 0
---

# browser-common

[![CI](https://github.com/rtorcato/browser-common/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/browser-common/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@rtorcato/browser-common.svg)](https://www.npmjs.com/package/@rtorcato/browser-common)
[![npm downloads](https://img.shields.io/npm/dm/@rtorcato/browser-common.svg)](https://www.npmjs.com/package/@rtorcato/browser-common)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@rtorcato/browser-common)](https://bundlephobia.com/package/@rtorcato/browser-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs — each one a
separate subpath export.

- **Per-API subpath imports** — `import { copyToClipboard } from '@rtorcato/browser-common/clipboard'`. Bundlers tree-shake to just the bytes you use (146–257 B brotlied per module).
- **Safe-by-default contract** — every module exports `is<Name>Available()`. Operations return `null`/`false`/empty on unsupported environments; they never throw. Safe to import in SSR / Node.
- **No runtime dependencies** — ESM-only, `sideEffects: false`, fully typed. Nothing to install but the package itself.
- **44 modules covered** — clipboard, geolocation, media devices, observers, storage, fullscreen, notifications, service workers, and 35+ more.

## Quick example

```ts
import { isClipboardApiAvailable, copyToClipboard } from '@rtorcato/browser-common/clipboard'

if (isClipboardApiAvailable()) {
	const ok = await copyToClipboard('hello world')
	console.log(ok) // true on success, false otherwise
}
```

Start with [Installation](./guides/installation.md), read [the contract](./guides/contract.md)
that every module follows, or browse the full [API Reference](./api/index.md) generated from
the source.
