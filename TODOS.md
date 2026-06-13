# TODOs

Tracking remaining work for `@rtorcato/browser-common`. Anything checked off here should leave the codebase in a state where `pnpm check:fix && pnpm typecheck && pnpm test` passes.

## Active

Each item below has a tracking issue. Close items here when the issue closes.

- [ ] [#26](https://github.com/rtorcato/browser-common/issues/26) — Migrate docs to Docusaurus with js-tooling-aligned config
- [ ] [#27](https://github.com/rtorcato/browser-common/issues/27) — Add `are-the-types-wrong` (attw) validation to release pipeline
- [ ] [#28](https://github.com/rtorcato/browser-common/issues/28) — Wire `docusaurus-plugin-typedoc` into apps/docs
- [ ] [#29](https://github.com/rtorcato/browser-common/issues/29) — Add `CODEOWNERS` file
- [ ] [#30](https://github.com/rtorcato/browser-common/issues/30) — Expand `size-limit` coverage to all exported modules
- [ ] [#31](https://github.com/rtorcato/browser-common/issues/31) — Add per-module usage examples to the docs site
- [ ] [#32](https://github.com/rtorcato/browser-common/issues/32) — Add `.js-tooling.json` to record intentional opt-outs
- [ ] [#33](https://github.com/rtorcato/browser-common/issues/33) — Document each `@ts-expect-error` suppression with the spec API
- [ ] [#34](https://github.com/rtorcato/browser-common/issues/34) — Enable GitHub Discussions and link from README + docs

## Deferred

- [ ] **Pre-release dist-tag (`beta` / `next`) for breaking changes.** Lets you test breaking changes without forcing the `latest` tag. Revisit when a breaking change is on the roadmap.
