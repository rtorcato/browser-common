# TODOs

Tracking work for `@rtorcato/browser-common`. Items are grouped by priority. Anything checked off here should also leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Blockers — fix before npm publish goes public

- [x] ~~**9 modules not importable via subpath exports.**~~ Resolved: added `./backgroundtasks`, `./battery`, `./encodingapis`, `./performance`, `./permissions`, `./selectionapi`, `./visualviewport`, `./weblocks`, `./webshare` to `package.json` `exports`. All 42 README modules now match the exports field.
- [ ] **Reconcile `src/index.ts`.** It currently re-exports only 10 modules as namespaces (`Notifications`, `Common`, `Print`, `LocalStorage`, `SessionStorage`, `Clipboard`, `GeoLocation`, `Location`, `MediaDevices`, `Screen`). Decide: either re-export all 42 modules consistently, OR remove the root re-exports entirely and document that consumers must use subpath imports (recommended — better tree-shaking, simpler mental model).
- [x] ~~**Fix webshare tests.**~~ Resolved: extracted a `setNavigator` helper using `Object.defineProperty` for the navigator stub. All 11 tests pass on Node 22 and 24.
- [ ] **Versioning honesty.** Currently on `v1.0.0` and 2/42 modules tested. The exports gap is now fixed (above). Decide whether the next publish to npmjs should start at `v0.1.0` (more honest about test coverage) or continue from `v1.x` treating the exports fix as a `fix:` patch.

## High value — quality

- [ ] **Test coverage.** Currently 2 of 42 modules have tests (`encodingapis`, `webshare`). Add at least smoke tests for the remaining 40 modules. Suggested pattern: per-module `<name>.test.ts` co-located in `src/<name>/`, verifying (a) the `is<Name>Available()` support check returns a boolean, and (b) every export is callable in the test environment.
- [ ] **Add `@example` tags to JSDoc.** Functions have `@param`/`@returns` but no usage examples. Add one short `@example` block per public function — IDE hover docs surface them and they double as documentation tests.
- [x] ~~**Add `.github/dependabot.yml`.**~~ Done via `js-tooling fix dependabot` — weekly npm + github-actions ecosystems configured.
- [ ] **Add `.github/ISSUE_TEMPLATE/`** (bug report + feature request) and `.github/PULL_REQUEST_TEMPLATE.md`.
- [ ] **Add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`** before flipping the repo public.
- [ ] **Add `SECURITY.md`.** `@rtorcato/js-tooling` has one; mirror it. Even a 5-line "report via private GitHub Security advisory" file is enough — required by GitHub's security tab to show as configured.
- [ ] **Fix npm keywords + GitHub topics.** `package.json` keywords are `["common", "typescript", "javascript"]` — useless for discovery. Replace with: `browser-api`, `web-api`, `clipboard`, `geolocation`, `tree-shakeable`, `esm`, `web-platform`, `dom`. Mirror the same list as GitHub repo topics (`gh repo edit rtorcato/browser-common --add-topic browser-api ...`).
- [ ] **Upgrade Biome v1 → v2 to align with shared preset.** The js-tooling shared config (`@rtorcato/js-tooling/biome`) targets Biome v2.3.0, but this repo is still on v1.9.4. Not a simple "extends" — v2 changes the schema (`organizeImports` moved to `assist.actions.source.organizeImports`, `files.ignore` → `files.includes` with negation patterns, several rules renamed). Steps: (1) bump `@biomejs/biome ^1.9.4` → `^2.3.0` in devDeps, (2) migrate `biome.jsonc` to v2 schema (use `biome migrate` CLI), (3) re-run `pnpm check` and fix any newly-flagged rules. Reserve a dedicated commit for this.
- [x] ~~**Add `.editorconfig`.**~~ Done via `js-tooling fix editorconfig`.
- [x] ~~**Add `.nvmrc`.**~~ Done via `js-tooling fix nvmrc` (pins Node 22).
- [x] ~~**Add CodeQL workflow.**~~ Done via `js-tooling fix codeql` — runs on push/PR/weekly cron.
- [x] ~~**Run `knip`.**~~ Resolved: `knip.json` configured with subpath-export entry pattern (`src/index.ts`, `src/*/index.ts`); `knip` script added; ran clean after removing unused `@types/luxon`, adding `@vitest/coverage-v8`, and dropping the unused commitizen script.
- [ ] **Codecov badge in `README.md` will 404 until codecov is set up.** Either configure the codecov.io integration (the CI already uploads `./coverage/coverage-summary.json`) or remove the badge until it works.

## Followups from the GitLab → GitHub migration

- [x] ~~Push current commit to GitHub.~~ Done — 3 commits pushed to `github/main`.
- [ ] **Flip repo to public.** Currently private. Run `gh repo edit rtorcato/browser-common --visibility public` once the webshare test fix lands and CI goes fully green.
- [ ] **Delete the GitLab repo** at `gitlab.com/rtorcato/browser-common` after GitHub is verified working (`glab repo delete rtorcato/browser-common`).
- [ ] **Add `NPM_TOKEN` secret to GitHub repo** so the release job can publish: `gh secret set NPM_TOKEN --repo rtorcato/browser-common` (paste an Automation token from https://www.npmjs.com/settings/rtorcato/tokens).
- [ ] **Update `origin` remote to point at GitHub.** Currently `origin` still points at GitLab and `github` is a secondary remote. After the GitLab repo is deleted: `git remote remove origin && git remote rename github origin`.

## Nice to have

- [ ] **Bundle size monitoring.** Tracked upstream in `@rtorcato/js-tooling` — it's listed in [js-tooling's TODO.md](https://github.com/rtorcato/js-tooling/blob/main/TODO.md) as a planned shared preset. Wait for it to land there, then bump the `@rtorcato/js-tooling` devDep here to inherit the size-limit config + CI step rather than configuring it locally.
- [ ] **API docs site.** Generate TypeDoc → publish to GitHub Pages. Each subpath export becomes its own page.
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **Verify tree-shaking works end-to-end.** `pnpm build-prod` emits 3 `chunk-*.js` files; confirm a consumer doing `import { copyToClipboard } from '@rtorcato/browser-common/clipboard'` only pulls the clipboard chunk into their bundle (test in a downstream Vite/Webpack project).
- [ ] **Browser support matrix in README.** Some APIs are Chromium-only today (File System Access, Idle Detection, Web Locks, Background Fetch). Add a table mapping module → supported browsers so consumers know which modules they can't ship for Safari/Firefox.
- [ ] **Type tests with `tsd` or `expectTypeOf`.** Add type-only tests on modules where the signature is the real product — e.g., `serializeForm` return shape, `getCurrentPosition` Promise type, `observeIntersection` callback signature. Prevents type regressions during refactors.
- [ ] **Future modules.** The previous `pointerevents` and `touchevents` stub folders were deleted (they were empty). If you want to add them later, the original `pointerevents/README.md` API spec lives in git history at `4a649bd:src/pointerevents/README.md`.
