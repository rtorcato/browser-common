# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active

- [ ] **Naming inconsistency: `is*Available` vs `is*Supported`.** 16 of 27 guard functions use `Available`, 11 use `Supported`. The README and the `browser-common` skill describe a single convention. Pick `Available` (majority + reads more naturally) and rename the 11 outliers (`isFileShareSupported`, `isNotificationSupported`, `isPrintSupported`, `isServiceWorkerSupported`, `isTextDecoderSupported`, `isTextEncoderSupported`, `isVisualViewportSupported`, `isWebLocksSupported`, `isWebShareSupported`, `isWebSocketSupported`, `isGenericSensorApiAvailable` — wait, that one's already Available; double-check the list). Keep backward-compat aliases marked `@deprecated` for the first minor; remove in the next major.
- [ ] **Add `@example` tags to JSDoc.** Functions have `@param`/`@returns` but no usage examples. One short `@example` block per public function — IDE hover docs surface them. While doing this, also document HTTPS / user-gesture requirements where applicable (`copyToClipboard`, `getCurrentPosition`, `getUserMedia`, `requestNotificationPermission`, `enterFullscreen`, `requestMotionPermission`).
- [ ] **Behavior tests for the 4 highest-value modules.** `clipboard`, `geolocation`, `mediadevices`, `intersection` — the modules consumers actually reach for. Replace (don't duplicate) their smoke tests. Use `@vitest/environment-jsdom` + mocks for `navigator.*` (working pattern in `src/webshare/webshare.test.ts`).
- [ ] **Upstream: fix `@rtorcato/js-tooling/vitest/config` coverage `include` glob.** The shared preset hardcodes `coverage.include: ['src/cli/generators/**/*.ts']` (js-tooling's own structure). Any consumer using the preset gets `0/0` coverage reports. We worked around it locally by overriding in `vitest.config.ts`, but the fix belongs upstream — drop the hardcoded `include` or default to `src/**/*.ts`.

## Nice to have

- [ ] **Optionally add `starlight-typedoc`** to auto-generate per-module API pages from JSDoc. Currently the docs site uses a hand-maintained module table; the typedoc plugin would add full per-function pages with type signatures. Plugin: https://starlight-typedoc.vercel.app/
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **Verify tree-shaking works end-to-end.** `pnpm build-prod` emits 3 `chunk-*.js` files; confirm a consumer doing `import { copyToClipboard } from '@rtorcato/browser-common/clipboard'` only pulls the clipboard chunk into their bundle (test in a downstream Vite/Webpack project).
- [ ] **Type tests with `tsd` or `expectTypeOf`.** Add type-only tests on modules where the signature is the real product — `serializeForm` return shape, `getCurrentPosition` Promise type, `observeIntersection` callback signature. Prevents type regressions during refactors.
- [ ] **Pre-push hook runs `pnpm verify`.** Currently only pre-commit runs Biome. A pre-push that runs typecheck + tests would catch regressions before pushing rather than after CI fails. Cost: slower `git push`.
- [ ] **CODEOWNERS file.** Auto-assigns reviewer on PRs. Mostly useful if/when external contributors arrive.
- [ ] **Enable GitHub Discussions.** Better than Issues for "how do I use this?" questions. Free to enable in repo Settings.
- [ ] **Pre-release dist-tag (`beta` / `next`) for breaking changes during v0.x.** Lets you test breaking changes without forcing the `latest` tag. Configure semantic-release branches accordingly.
- [ ] **Future modules.** The previous `pointerevents` and `touchevents` stub folders were deleted (they were empty). If reviving, the original `pointerevents/README.md` API spec lives in git history at `4a649bd:src/pointerevents/README.md`.
