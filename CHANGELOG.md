## [1.2.2](https://github.com/rtorcato/browser-common/compare/v1.2.1...v1.2.2) (2026-07-23)


### Bug Fixes

* **weblocks:** pin absent-locks state for Node 24 ([#101](https://github.com/rtorcato/browser-common/issues/101)) ([6fdceb9](https://github.com/rtorcato/browser-common/commit/6fdceb961a84583d4a2ddefd115f51c5ad277d0a))

## [1.2.1](https://github.com/rtorcato/browser-common/compare/v1.2.0...v1.2.1) (2026-07-09)


### Bug Fixes

* **docs:** silence TS6 baseUrl deprecation in docs tsconfig ([596d1ce](https://github.com/rtorcato/browser-common/commit/596d1cef653535949bedccc2a2a396ddeabf7ad8))

# [1.2.0](https://github.com/rtorcato/browser-common/compare/v1.1.4...v1.2.0) (2026-07-05)


### Features

* add 6 modern Web API wrappers ([d5ce87c](https://github.com/rtorcato/browser-common/commit/d5ce87c2c4821dbaab98f0719d1a5297fb064695)), closes [#39](https://github.com/rtorcato/browser-common/issues/39) [#40](https://github.com/rtorcato/browser-common/issues/40) [#41](https://github.com/rtorcato/browser-common/issues/41)

## [1.1.4](https://github.com/rtorcato/browser-common/compare/v1.1.3...v1.1.4) (2026-07-05)


### Bug Fixes

* **alert:** guard dialogs against non-browser env ([892afb2](https://github.com/rtorcato/browser-common/commit/892afb24e58f271f9d90d88657d2e40c9e73094f)), closes [#36](https://github.com/rtorcato/browser-common/issues/36)

## [1.1.3](https://github.com/rtorcato/browser-common/compare/v1.1.2...v1.1.3) (2026-06-11)


### Bug Fixes

* **docs:** label API Reference sidebar by module name ([684478c](https://github.com/rtorcato/browser-common/commit/684478c75df210dd6985e02a9a6af3b7cf2a512e))

## [1.1.2](https://github.com/rtorcato/browser-common/compare/v1.1.1...v1.1.2) (2026-06-11)


### Bug Fixes

* **build:** ship .d.ts declarations by disabling incremental in build ([1e1ef6b](https://github.com/rtorcato/browser-common/commit/1e1ef6b7678f2ac5af76dabe4a75f2170652cbf4)), closes [package.json#exports](https://github.com/package.json/issues/exports) [#24](https://github.com/rtorcato/browser-common/issues/24)
* **deps:** remove duplicate picomatch key from broken lockfile ([eecafda](https://github.com/rtorcato/browser-common/commit/eecafda9a68c05dfcba7cc95d33e737a96515015))
* **deps:** remove second duplicate picomatch key in snapshots ([a5c101f](https://github.com/rtorcato/browser-common/commit/a5c101f6d60bf5c4a849834bbcab42e43af4dfbb))

## [1.1.1](https://github.com/rtorcato/browser-common/compare/v1.1.0...v1.1.1) (2026-06-06)


### Bug Fixes

* **touchevents:** document TouchList source in get* helpers ([cad22ab](https://github.com/rtorcato/browser-common/commit/cad22ab21f3de915d8282ed53c10805954c3b34f))

# [1.1.0](https://github.com/rtorcato/browser-common/compare/v1.0.1...v1.1.0) (2026-06-06)


### Features

* add pointerevents and touchevents modules ([3d93351](https://github.com/rtorcato/browser-common/commit/3d93351ca72f41fca3797296370f8ef6c13bcf64))

## [1.0.1](https://github.com/rtorcato/browser-common/compare/v1.0.0...v1.0.1) (2026-06-06)


### Bug Fixes

* **print:** remove dead commented code referencing missing module ([39ae5ea](https://github.com/rtorcato/browser-common/commit/39ae5ea15f11c027ea4244e9245b40f42b7f7cdf))

# [1.0.0](https://github.com/rtorcato/browser-common/compare/v0.3.0...v1.0.0) (2026-06-06)


* feat!: graduate to v1.0.0 by removing deprecated is*Supported aliases ([bb7f29e](https://github.com/rtorcato/browser-common/commit/bb7f29e2366c9be592acc9b72985dd53f0fa2685))


### BREAKING CHANGES

* isFileShareSupported, isNotificationSupported,
isPrintSupported, isServiceWorkerSupported, isTextDecoderSupported,
isTextEncoderSupported, isVisualViewportSupported, isWebLocksSupported,
isWebShareSupported, and isWebSocketSupported have been removed. Use
the is*Available counterparts (already exported since v0.3.0).

# [0.3.0](https://github.com/rtorcato/browser-common/compare/v0.2.0...v0.3.0) (2026-06-05)


### Features

* rename is*Supported guards to is*Available for consistency ([e21c24a](https://github.com/rtorcato/browser-common/commit/e21c24a457fc8d9d8641f9c27d8beebb0bb3ecd0))

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
