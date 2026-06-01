# TODOs

Tracking work for `@rtorcato/browser-common`. Items are grouped by priority. Anything checked off here should also leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Blockers — fix before npm publish goes public

- [ ] **11 modules are not importable via subpath exports.** `src/<name>/index.ts` exists for: `backgroundtasks`, `battery`, `encodingapis`, `performance`, `permissions`, `selectionapi`, `visualviewport`, `weblocks`, `webshare`, plus any others added since this list was written. Add corresponding `./<name>` entries to the `exports` field in `package.json`. Verify by `node -e "import('@rtorcato/browser-common/<name>').then(m => console.log(Object.keys(m)))"` after a local `pnpm build-prod && pnpm pack && (cd /tmp && pnpm add ./browser-common-*.tgz)`.
- [ ] **Reconcile `src/index.ts`.** It currently re-exports only 10 modules as namespaces (`Notifications`, `Common`, `Print`, `LocalStorage`, `SessionStorage`, `Clipboard`, `GeoLocation`, `Location`, `MediaDevices`, `Screen`). Decide: either re-export all 42 modules consistently, OR remove the root re-exports entirely and document that consumers must use subpath imports (recommended — better tree-shaking, simpler mental model).
- [ ] **Fix webshare tests.** `src/webshare/webshare.test.ts:16,26,39` — replace `globalThis.navigator = X` with `Object.defineProperty(globalThis, 'navigator', { value: X, configurable: true })`. `navigator` is a getter-only property on Node 22+, so direct assignment throws and blocks the CI release job.

## High value — quality

- [ ] **Test coverage.** Currently 2 of 42 modules have tests (`encodingapis`, `webshare`). Add at least smoke tests for the remaining 40 modules. Suggested pattern: per-module `<name>.test.ts` co-located in `src/<name>/`, verifying (a) the `is<Name>Available()` support check returns a boolean, and (b) every export is callable in the test environment.
- [ ] **Add `@example` tags to JSDoc.** Functions have `@param`/`@returns` but no usage examples. Add one short `@example` block per public function — IDE hover docs surface them and they double as documentation tests.
- [ ] **Add `.github/dependabot.yml`.** The auto-merge workflow at `.github/workflows/dependabot-automerge.yml` is in place but Dependabot itself isn't configured, so it never opens PRs. Add a config for `npm` and `github-actions` ecosystems (weekly, max 5 open PRs).
- [ ] **Add `.github/ISSUE_TEMPLATE/`** (bug report + feature request) and `.github/PULL_REQUEST_TEMPLATE.md`.
- [ ] **Add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`** before flipping the repo public.
- [ ] **Codecov badge in `README.md` will 404 until codecov is set up.** Either configure the codecov.io integration (the CI already uploads `./coverage/coverage-summary.json`) or remove the badge until it works.

## Followups from the GitLab → GitHub migration

- [ ] **Push current commit to GitHub.** Blocked on `gh auth refresh -s workflow` (the OAuth token needs the `workflow` scope to push files under `.github/workflows/`). Once granted, run `git push -u github main`.
- [ ] **Flip repo to public.** Created as private during migration; run `gh repo edit rtorcato/browser-common --visibility public` once the first CI run is green.
- [ ] **Delete the GitLab repo** at `gitlab.com/rtorcato/browser-common` after GitHub is verified working (`glab repo delete rtorcato/browser-common`).
- [ ] **Add `NPM_TOKEN` secret to GitHub repo** so the release job can publish: `gh secret set NPM_TOKEN --repo rtorcato/browser-common` (paste an Automation token from https://www.npmjs.com/settings/rtorcato/tokens).
- [ ] **Update `origin` remote to point at GitHub.** Currently `origin` still points at GitLab. After the GitLab repo is deleted: `git remote remove github && git remote set-url origin https://github.com/rtorcato/browser-common.git`.

## Nice to have

- [ ] **Bundle size monitoring.** Add [`size-limit`](https://github.com/ai/size-limit) so PRs surface size regressions per subpath export.
- [ ] **API docs site.** Generate TypeDoc → publish to GitHub Pages. Each subpath export becomes its own page.
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **Verify tree-shaking works end-to-end.** `pnpm build-prod` emits 3 `chunk-*.js` files; confirm a consumer doing `import { copyToClipboard } from '@rtorcato/browser-common/clipboard'` only pulls the clipboard chunk into their bundle (test in a downstream Vite/Webpack project).
- [ ] **Future modules.** The previous `pointerevents` and `touchevents` stub folders were deleted (they were empty). If you want to add them later, the original `pointerevents/README.md` API spec lives in git history at `4a649bd:src/pointerevents/README.md`.
