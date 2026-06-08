# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active



## Nice to have

- [ ] **Optionally add `starlight-typedoc`** to auto-generate per-module API pages from JSDoc. Currently the docs site uses a hand-maintained module table; the typedoc plugin would add full per-function pages with type signatures. Plugin: https://starlight-typedoc.vercel.app/
- [ ] **Expanded usage examples.** Beyond the one quick-start snippet, consider a `docs/examples.md` with one snippet per module group (storage, sensors, UI, etc.).
- [ ] **CODEOWNERS file.** Auto-assigns reviewer on PRs. Mostly useful if/when external contributors arrive.
- [ ] **Enable GitHub Discussions.** Better than Issues for "how do I use this?" questions. Free to enable in repo Settings.
- [ ] **Pre-release dist-tag (`beta` / `next`) for breaking changes during v0.x.** Lets you test breaking changes without forcing the `latest` tag. Configure semantic-release branches accordingly.
