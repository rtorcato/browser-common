---
title: Installation
description: Install @rtorcato/browser-common and import your first module.
---

## Install

```bash
pnpm add @rtorcato/browser-common
# or
npm install @rtorcato/browser-common
# or
yarn add @rtorcato/browser-common
```

The package is ESM-only. Your project's `tsconfig.json` should have `"module": "esnext"` (or `"nodenext"`) and your `package.json` should have `"type": "module"`.

## Requirements

- **Browser**: any modern evergreen browser (Chrome, Firefox, Safari, Edge) for most modules. A few are Chromium-only — see the [browser support guide](./browser-support.md).
- **Node.js**: ≥22 for local development. The published package targets ES2022 + DOM and runs in any modern browser.
- **Bundler**: Vite, Webpack 5+, Rollup, esbuild — anything that respects `package.json` `"exports"` and `"sideEffects": false` will tree-shake correctly.

## Import the module you need

Always use **subpath imports**. Never import from the root.

```ts
// ✅ Tree-shakes to just clipboard bytes
import { isClipboardApiAvailable, copyToClipboard } from '@rtorcato/browser-common/clipboard'

// ❌ Don't do this — root exports nothing
import * as browserCommon from '@rtorcato/browser-common'
```

## Your first call

Every module ships a support-check function — call it before any operation:

```ts
import { isClipboardApiAvailable, copyToClipboard } from '@rtorcato/browser-common/clipboard'

async function copy(text: string) {
	if (!isClipboardApiAvailable()) {
		console.warn('Clipboard API not available in this environment')
		return false
	}
	return await copyToClipboard(text)
}
```

## Install the skill for your AI agent

The repo ships a skill at `skills/browser-common/SKILL.md` that teaches AI coding agents the
import, feature-guard and SSR rules below. Any agent that supports the
[`skills`](https://www.npmjs.com/package/skills) CLI can install it straight from GitHub — no clone,
no package install:

```bash
npx skills add https://github.com/rtorcato/browser-common --skill browser-common
```

See the [contract guide](./contract.md) for the full safety guarantees, or browse the
[API Reference](../api/index.md) for all 44 modules.
