# TODOs

Tracking work for `@rtorcato/browser-common`. Items are grouped by priority. Anything checked off here should also leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Blockers — fix before npm publish goes public

- [x] ~~**9 modules not importable via subpath exports.**~~ Resolved: added `./backgroundtasks`, `./battery`, `./encodingapis`, `./performance`, `./permissions`, `./selectionapi`, `./visualviewport`, `./weblocks`, `./webshare` to `package.json` `exports`. All 42 README modules now match the exports field.
- [x] ~~**Reconcile `src/index.ts`.**~~ Resolved: dropped the partial root re-exports. The root is now an empty module with a comment pointing consumers at subpath imports. Better tree-shaking, simpler mental model.
- [x] ~~**Fix webshare tests.**~~ Resolved: extracted a `setNavigator` helper using `Object.defineProperty` for the navigator stub. All 11 tests pass on Node 22 and 24.
- [ ] **Versioning honesty.** Currently on `v1.0.0` and 2/42 modules tested. The exports gap is now fixed (above). Decide whether the next publish to npmjs should start at `v0.1.0` (more honest about test coverage) or continue from `v1.x` treating the exports fix as a `fix:` patch.

## High value — quality

- [x] ~~**Test coverage.**~~ Resolved: smoke tests added for all 40 previously-untested modules. Each test (a) calls the module's `is<Name>Available()`/`is<Name>Supported()` if present and asserts boolean return, and (b) verifies every export is callable. 92 tests across 43 files all passing. Real behavior tests (not just smoke) for individual functions still welcome as follow-ups.
- [ ] **Add `@example` tags to JSDoc.** Functions have `@param`/`@returns` but no usage examples. Add one short `@example` block per public function — IDE hover docs surface them and they double as documentation tests.
- [x] ~~**Add `.github/dependabot.yml`.**~~ Done via `js-tooling fix dependabot` — weekly npm + github-actions ecosystems configured.
- [x] ~~**Add `.github/ISSUE_TEMPLATE/`** and `.github/PULL_REQUEST_TEMPLATE.md`.~~ Done — `bug_report.yml`, `feature_request.yml`, `config.yml` (blank issues disabled + security link), `PULL_REQUEST_TEMPLATE.md` added.
- [x] ~~**Add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.**~~ Done — CONTRIBUTING covers setup, branch naming, Conventional Commits, the new-module workflow, releases. CODE_OF_CONDUCT references Contributor Covenant v2.1 with contact email.
- [x] ~~**Add `SECURITY.md`.**~~ Done — mirrors js-tooling's format; private advisory link + email.
- [x] ~~**Fix npm keywords + GitHub topics.**~~ Done — replaced generic keywords with 16 specific ones (browser-api, web-api, clipboard, geolocation, etc.); same set applied as GitHub repo topics.
- [x] ~~**Upgrade Biome v1 → v2 to align with shared preset.**~~ Done: bumped `@biomejs/biome` to `^2.4.16`, ran `biome migrate`, replaced biome.jsonc with one that extends `@rtorcato/js-tooling/biome` and only specifies repo-specific ignore patterns. Removed 6 stale `biome-ignore lint/suspicious/noExplicitAny` suppressions (rule is off in shared preset) and 7 unused `@ts-expect-error` directives (newer lib.dom.d.ts covers them). Added one new suppression for `noDocumentCookie` in the cookies module (which legitimately wraps `document.cookie`).
- [x] ~~**Add `.editorconfig`.**~~ Done via `js-tooling fix editorconfig`.
- [x] ~~**Add `.nvmrc`.**~~ Done via `js-tooling fix nvmrc` (pins Node 22).
- [x] ~~**Add CodeQL workflow.**~~ Done via `js-tooling fix codeql` — runs on push/PR/weekly cron.
- [ ] **Enable Code Scanning in repo Settings.** The CodeQL workflow runs successfully but can't upload SARIF results: "Code scanning is not enabled for this repository." For private repos this requires GitHub Advanced Security (paid). Easiest path: flip the repo public first (free GHAS), then go to Settings → Code security and analysis → enable Code scanning.
- [x] ~~**Run `knip`.**~~ Resolved: `knip.json` configured with subpath-export entry pattern (`src/index.ts`, `src/*/index.ts`); `knip` script added; ran clean after removing unused `@types/luxon`, adding `@vitest/coverage-v8`, and dropping the unused commitizen script.
- [ ] **Codecov badge in `README.md` will 404 until codecov is set up.** Either configure the codecov.io integration (the CI already uploads `./coverage/coverage-summary.json`) or remove the badge until it works.

## Followups from the GitLab → GitHub migration

- [x] ~~Push current commit to GitHub.~~ Done — 3 commits pushed to `github/main`.
- [ ] **Flip repo to public.** Currently private. Run `gh repo edit rtorcato/browser-common --visibility public` once the webshare test fix lands and CI goes fully green.
- [x] ~~**Delete the GitLab repo.**~~ Done — `glab repo delete` scheduled deletion (GitLab's 7-day soft-delete window).
- [x] ~~**Add `NPM_TOKEN` secret to GitHub repo.**~~ Done. Granular tokens 404 on first-publish of new scoped packages; switched to Classic Automation token, then `npm publish --access public --provenance=false` manually bootstrapped v1.0.0 on npmjs. Also ran `npm access set status=public` since `@rtorcato` scope defaulted new packages to private. CI release job now succeeds (no-op until next `feat:`/`fix:` commit).
- [x] ~~**Update `origin` remote to point at GitHub.**~~ Done — `origin` now points at `github.com/rtorcato/browser-common.git`; old GitLab remote removed.

## Nice to have

- [ ] **Bundle size monitoring.** Tracked upstream in `@rtorcato/js-tooling` — it's listed in [js-tooling's TODO.md](https://github.com/rtorcato/js-tooling/blob/main/TODO.md) as a planned shared preset. Wait for it to land there, then bump the `@rtorcato/js-tooling` devDep here to inherit the size-limit config + CI step rather than configuring it locally.
- [ ] **API docs site.** Generate TypeDoc → publish to GitHub Pages. Each subpath export becomes its own page.
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **Verify tree-shaking works end-to-end.** `pnpm build-prod` emits 3 `chunk-*.js` files; confirm a consumer doing `import { copyToClipboard } from '@rtorcato/browser-common/clipboard'` only pulls the clipboard chunk into their bundle (test in a downstream Vite/Webpack project).
- [ ] **Browser support matrix in README.** Some APIs are Chromium-only today (File System Access, Idle Detection, Web Locks, Background Fetch). Add a table mapping module → supported browsers so consumers know which modules they can't ship for Safari/Firefox.
- [ ] **Type tests with `tsd` or `expectTypeOf`.** Add type-only tests on modules where the signature is the real product — e.g., `serializeForm` return shape, `getCurrentPosition` Promise type, `observeIntersection` callback signature. Prevents type regressions during refactors.
- [ ] **Future modules.** The previous `pointerevents` and `touchevents` stub folders were deleted (they were empty). If you want to add them later, the original `pointerevents/README.md` API spec lives in git history at `4a649bd:src/pointerevents/README.md`.
