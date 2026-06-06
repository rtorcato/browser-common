# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active

- [ ] **Upstream: fix `@rtorcato/js-tooling/vitest/config` coverage glob + thresholds** — tracked in [rtorcato/js-tooling#39](https://github.com/rtorcato/js-tooling/issues/39). Once fixed and a new js-tooling version is published, drop the workaround in `vitest.config.ts` (lines 8-19).
- [ ] **Upstream: other browser-common conventions to js-tooling.** Drift audit ([2026-06-06](#)) opened tracking issues for: [#40 exports-resolution helper](https://github.com/rtorcato/js-tooling/issues/40), [#41 ssr-safety helper](https://github.com/rtorcato/js-tooling/issues/41), [#42 verify script + pre-push hook](https://github.com/rtorcato/js-tooling/issues/42), [#43 tree-shake check template](https://github.com/rtorcato/js-tooling/issues/43), [#44 library style guide](https://github.com/rtorcato/js-tooling/issues/44).

## Nice to have

- [ ] **Optionally add `starlight-typedoc`** to auto-generate per-module API pages from JSDoc. Currently the docs site uses a hand-maintained module table; the typedoc plugin would add full per-function pages with type signatures. Plugin: https://starlight-typedoc.vercel.app/
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **CODEOWNERS file.** Auto-assigns reviewer on PRs. Mostly useful if/when external contributors arrive.
- [ ] **Enable GitHub Discussions.** Better than Issues for "how do I use this?" questions. Free to enable in repo Settings.
- [ ] **Pre-release dist-tag (`beta` / `next`) for breaking changes during v0.x.** Lets you test breaking changes without forcing the `latest` tag. Configure semantic-release branches accordingly.
