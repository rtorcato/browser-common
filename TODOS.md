# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active

- [ ] **Bump `@rtorcato/js-tooling` to `^2.9.0` and migrate to upstream helpers.** v2.8.1 fixes the vitest coverage-glob bug ([#39](https://github.com/rtorcato/js-tooling/issues/39)) — drop the workaround in `vitest.config.ts` (lines 8-19). v2.9.0 ships [`@rtorcato/js-tooling/tests/exports-resolution`](https://github.com/rtorcato/js-tooling/issues/40) and [`/tests/ssr-safety`](https://github.com/rtorcato/js-tooling/issues/41) — replace the bespoke files in `src/tests/`.
- [ ] **Upstream: js-tooling [#42 unified `verify` script + pre-push hook scaffold](https://github.com/rtorcato/js-tooling/issues/42).**
- [ ] **Upstream: js-tooling [#43 tree-shake verification template](https://github.com/rtorcato/js-tooling/issues/43)** for subpath-export libraries.

## Nice to have

- [ ] **Optionally add `starlight-typedoc`** to auto-generate per-module API pages from JSDoc. Currently the docs site uses a hand-maintained module table; the typedoc plugin would add full per-function pages with type signatures. Plugin: https://starlight-typedoc.vercel.app/
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **CODEOWNERS file.** Auto-assigns reviewer on PRs. Mostly useful if/when external contributors arrive.
- [ ] **Enable GitHub Discussions.** Better than Issues for "how do I use this?" questions. Free to enable in repo Settings.
- [ ] **Pre-release dist-tag (`beta` / `next`) for breaking changes during v0.x.** Lets you test breaking changes without forcing the `latest` tag. Configure semantic-release branches accordingly.
