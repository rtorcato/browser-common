# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active

- [ ] **Turn on Code Scanning in repo Settings.** Now that the repo is public, GHAS is free. Go to Settings → Code security and analysis → enable Code scanning. (CodeQL workflow already re-enabled.)
- [ ] **Versioning honesty.** Currently `v1.0.0` with 92 smoke tests but only `encodingapis` + `webshare` have *behavior* tests. Two paths: (1) keep going on `v1.x`, treat behavior-test additions as `fix:`/`feat:` patches, or (2) reset to `v0.x` to signal pre-stable. Pick a posture before the next breaking change.
- [ ] **Add `@example` tags to JSDoc.** Functions have `@param`/`@returns` but no usage examples. One short `@example` block per public function — IDE hover docs surface them.

## Nice to have

- [ ] **Migrate size-limit to `@rtorcato/js-tooling` shared preset when upstream ships it.** Local config + CI step are in place (5 representative subpath imports, all well under budget). When js-tooling adds size-limit as a shared preset, bump the devDep and replace local config with the preset reference.
- [ ] **Browser support matrix in README.** Some APIs are Chromium-only today (File System Access, Idle Detection, Web Locks, Background Fetch). Add a table mapping module → supported browsers.
- [ ] **API docs site.** Add an `apps/docs/` Astro Starlight site (mirror what `@rtorcato/js-tooling` already does — `@astrojs/starlight ^0.39.2`, deployed to GitHub Pages via the `docs.yml` workflow). Optionally use the [`starlight-typedoc`](https://starlight-typedoc.vercel.app/) plugin to auto-generate API reference pages from each subpath module's JSDoc, so you don't hand-write 42 module pages.
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **Verify tree-shaking works end-to-end.** `pnpm build-prod` emits 3 `chunk-*.js` files; confirm a consumer doing `import { copyToClipboard } from '@rtorcato/browser-common/clipboard'` only pulls the clipboard chunk into their bundle (test in a downstream Vite/Webpack project).
- [ ] **Type tests with `tsd` or `expectTypeOf`.** Add type-only tests on modules where the signature is the real product — `serializeForm` return shape, `getCurrentPosition` Promise type, `observeIntersection` callback signature. Prevents type regressions during refactors.
- [ ] **Future modules.** The previous `pointerevents` and `touchevents` stub folders were deleted (they were empty). If reviving, the original `pointerevents/README.md` API spec lives in git history at `4a649bd:src/pointerevents/README.md`.
