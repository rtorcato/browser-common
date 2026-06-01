---
name: new-module
description: Scaffold a new browser-API feature module under src/ with its index.ts, package.json exports entry, and a test stub. Use when the user asks to add a new module/feature/wrapper.
---

# new-module

Add a new feature module to `@rtorcato/browser-common`.

Usage: the user names the module (e.g., "add a `screenwakelock` module"). The module name is lowercase, no separators (matches existing convention: `clipboard`, `mediadevices`, `localstorage`).

## Steps

1. **Verify the name is unused.** Check `ls src/<name>` returns no such directory and the `exports` field in `package.json` has no `./<name>` key.

2. **Create `src/<name>/index.ts`.** Export named functions only — no default exports. Follow the existing style: tabs, single quotes, no semicolons. Guard browser-only APIs with `typeof navigator !== 'undefined'` (or `window`/`document`) checks. Example pattern from `src/clipboard/index.ts`:

   ```ts
   export const is<Name>Available = (): boolean => {
   	return typeof navigator !== 'undefined' && !!navigator.<api>
   }
   ```

3. **Add the `exports` entry to `package.json`.** Insert in alphabetical position among siblings:

   ```json
   "./<name>": {
   	"import": "./dist/<name>/index.js",
   	"types": "./dist/<name>/index.d.ts"
   }
   ```

   Do not edit `build.mjs` — it picks up the new folder via `getEntrypointFolders('src')`.

4. **Create a test under `src/tests/<name>.test.ts`.** Use Vitest. At minimum, a smoke test that imports and asserts something non-trivial. Example:

   ```ts
   import { expect, test } from 'vitest'
   import { is<Name>Available } from '../<name>'

   test('<name>: is<Name>Available returns a boolean', () => {
   	expect(typeof is<Name>Available()).toBe('boolean')
   })
   ```

5. **Verify.** Run `pnpm check:fix && pnpm typecheck && pnpm test`. All three must pass before reporting done.

## Notes

- This is an ESM-only package; do not add CJS exports.
- Sub-files within a module are fine (e.g., `src/<name>/foo.ts`) — only `index.ts` is the entry point.
- If the API only exists in some browsers, return `null`/`false` on unsupported environments rather than throwing.
