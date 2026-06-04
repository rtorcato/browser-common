# [0.2.0](https://github.com/rtorcato/browser-common/compare/v0.1.0...v0.2.0) (2026-06-04)


### Features

* **docs:** add Astro Starlight site at apps/docs ([a453a4a](https://github.com/rtorcato/browser-common/commit/a453a4a855958ad5484f42f7d4fb0c9920855f3e))

# 0.1.0 (2026-06-04)

Initial pre-stable release.

### Features

* 42 subpath-exported modules wrapping browser Web APIs (clipboard, geolocation, observers, storage, etc.)
* `is<Name>Available()` guard per module — operations no-op on unsupported environments
* ESM-only, `sideEffects: false`, fully tree-shakeable
* Bundle-size budgets enforced in CI via `size-limit`
* Type-safe with declaration files for every subpath

This is a `v0.x` release — API is subject to change. Behavior tests cover `encodingapis` and `webshare`; other modules have smoke tests only. Graduate to `v1.0.0` once behavior tests cover the full surface.

See https://github.com/rtorcato/browser-common for module index and browser support matrix.
