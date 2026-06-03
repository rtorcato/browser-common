# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active

- [ ] **Flip repo to public.** Run `gh repo edit rtorcato/browser-common --visibility public`. Unlocks free GHAS (so the CodeQL workflow can upload SARIF instead of failing on "code scanning not enabled"). Also lets the README's CI badge resolve for non-collaborators.
- [ ] **Re-enable CodeQL workflow + turn on Code Scanning.** After the public flip: (1) `git mv .github/workflows/codeql.yml.disabled .github/workflows/codeql.yml` to reactivate the workflow, (2) GitHub → Settings → Code security and analysis → enable Code scanning. Workflow is currently disabled (file renamed) because it failed every run on a private repo without GHAS.
- [ ] **Versioning honesty.** Currently `v1.0.0` with 92 smoke tests but only `encodingapis` + `webshare` have *behavior* tests. Two paths: (1) keep going on `v1.x`, treat behavior-test additions as `fix:`/`feat:` patches, or (2) reset to `v0.x` to signal pre-stable. Pick a posture before the next breaking change.
- [ ] **Codecov badge in `README.md` will 404 until codecov.io is set up.** Either configure the integration (CI already uploads `./coverage/coverage-summary.json`) or remove the badge.
- [ ] **Add `@example` tags to JSDoc.** Functions have `@param`/`@returns` but no usage examples. One short `@example` block per public function — IDE hover docs surface them.

## Nice to have

- [ ] **Bundle size monitoring.** Tracked upstream in `@rtorcato/js-tooling` as a planned shared preset. Wait for it to land there, then bump the devDep here to inherit the config + CI step rather than configuring locally.
- [ ] **Browser support matrix in README.** Some APIs are Chromium-only today (File System Access, Idle Detection, Web Locks, Background Fetch). Add a table mapping module → supported browsers.
- [ ] **API docs site.** Generate TypeDoc → publish to GitHub Pages. Each subpath export becomes its own page.
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **Verify tree-shaking works end-to-end.** `pnpm build-prod` emits 3 `chunk-*.js` files; confirm a consumer doing `import { copyToClipboard } from '@rtorcato/browser-common/clipboard'` only pulls the clipboard chunk into their bundle (test in a downstream Vite/Webpack project).
- [ ] **Type tests with `tsd` or `expectTypeOf`.** Add type-only tests on modules where the signature is the real product — `serializeForm` return shape, `getCurrentPosition` Promise type, `observeIntersection` callback signature. Prevents type regressions during refactors.
- [ ] **Future modules.** The previous `pointerevents` and `touchevents` stub folders were deleted (they were empty). If reviving, the original `pointerevents/README.md` API spec lives in git history at `4a649bd:src/pointerevents/README.md`.
