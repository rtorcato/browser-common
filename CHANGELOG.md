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
