# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active

- [ ] **Upstream bug: js-tooling vitest preset hardcodes coverage glob + thresholds** — [rtorcato/js-tooling#39](https://github.com/rtorcato/js-tooling/issues/39). Once fixed and a new js-tooling version is published, drop the workaround in `vitest.config.ts` (lines 8-19).
- [ ] **Upstream: js-tooling meta-test helpers** (drift audit 2026-06-06)
  - [ ] [#40 exports-resolution helper](https://github.com/rtorcato/js-tooling/issues/40) — generic `package.json` exports ↔ `src/` folder sync test.
  - [ ] [#41 ssr-safety helper](https://github.com/rtorcato/js-tooling/issues/41) — generic Node-import-without-DOM test.
- [ ] **Upstream: js-tooling [#42 unified `verify` script + pre-push hook scaffold](https://github.com/rtorcato/js-tooling/issues/42).**
- [ ] **Upstream: js-tooling [#43 tree-shake verification template](https://github.com/rtorcato/js-tooling/issues/43)** for subpath-export libraries.
- [ ] **Upstream: js-tooling [#44 library style guide](https://github.com/rtorcato/js-tooling/issues/44)** (JSDoc shape + `expectTypeOf` patterns + `is<Name>Available()` naming).

## Nice to have

- [ ] **Optionally add `starlight-typedoc`** to auto-generate per-module API pages from JSDoc. Currently the docs site uses a hand-maintained module table; the typedoc plugin would add full per-function pages with type signatures. Plugin: https://starlight-typedoc.vercel.app/
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **CODEOWNERS file.** Auto-assigns reviewer on PRs. Mostly useful if/when external contributors arrive.
- [ ] **Enable GitHub Discussions.** Better than Issues for "how do I use this?" questions. Free to enable in repo Settings.
- [ ] **Pre-release dist-tag (`beta` / `next`) for breaking changes during v0.x.** Lets you test breaking changes without forcing the `latest` tag. Configure semantic-release branches accordingly.
