# Browser Common

Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs.

[![CI](https://github.com/rtorcato/browser-common/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/browser-common/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@rtorcato%2Fbrowser-common.svg)](https://badge.fury.io/js/@rtorcato%2Fbrowser-common)
[![npm downloads](https://img.shields.io/npm/dm/@rtorcato%2Fbrowser-common)](https://www.npmjs.com/package/@rtorcato/browser-common)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@rtorcato/browser-common)](https://bundlephobia.com/package/@rtorcato/browser-common)
[![Coverage](https://codecov.io/gh/rtorcato/browser-common/branch/main/graph/badge.svg)](https://codecov.io/gh/rtorcato/browser-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Typed, ESM-only wrappers for clipboard, geolocation, media devices, storage, observers, and 35+ other Web APIs — each one a separate subpath export so consumers only ship what they use. Every wrapper guards its underlying API, returning `null` or `false` on unsupported browsers instead of throwing. No runtime dependencies, `sideEffects: false`, fully tree-shakeable.

**Status:** Stable since v1.0 (2026-06). See [CHANGELOG.md](CHANGELOG.md) for release history.

## Why this over `vueuse/core` or `usehooks-ts`?

Framework-agnostic. If you're in a Vue or React app, those libraries are excellent — use them. But if your code needs to work the same way from a Node script, a service worker, a vanilla-TS module, or alongside *any* framework, `browser-common` ships unopinionated functions with no React/Vue dependency and per-subpath imports that tree-shake to bytes (146-257 B brotlied per module). Smaller surface, broader reach.

## Installation

```bash
pnpm add @rtorcato/browser-common
# or
npm install @rtorcato/browser-common
# or
yarn add @rtorcato/browser-common
```

Requires Node ≥22 for development; the published package targets ES2022 + DOM and runs in any modern browser.

## Usage

Import only the module you need:

```ts
import { isClipboardApiAvailable, copyToClipboard } from '@rtorcato/browser-common/clipboard'

if (isClipboardApiAvailable()) {
	const ok = await copyToClipboard('hello world')
	console.log(ok) // true on success, false otherwise
}
```

## Use with Claude Code

Install the browser-common skill so [Claude Code](https://claude.com/claude-code) uses this library correctly — right subpath import, `is<Name>Available()` guards, and permission/SSR handling:

```bash
/plugin marketplace add rtorcato/browser-common
/plugin install browser-common@browser-common
```

For other AI tools (Cursor, Copilot, Codex), the package ships an [`AGENTS.md`](AGENTS.md) with the same rules — agents that read `AGENTS.md` pick it up from `node_modules`, or copy the rules into your project's agent config.

## Modules

Every module is a separate subpath export — import only what you need.

| Module | Subpath import | Exports |
|---|---|---|
| alert | `@rtorcato/browser-common/alert` | `showAlert`, `showConfirm`, `showPrompt` |
| backgroundtasks | `@rtorcato/browser-common/backgroundtasks` | `isBackgroundSyncAvailable`, `isBackgroundFetchAvailable`, `registerBackgroundSync`, `registerBackgroundFetch` |
| battery | `@rtorcato/browser-common/battery` | `isBatteryApiAvailable`, `getBatteryManager`, `onBatteryLevelChange`, `onBatteryChargingChange` |
| canvas | `@rtorcato/browser-common/canvas` | `createCanvas`, `getCanvasContext2D`, `clearCanvas`, `drawImageOnCanvas`, `canvasToDataURL`, `fillCanvas` |
| clipboard | `@rtorcato/browser-common/clipboard` | `isClipboardApiAvailable`, `readFromClipboard`, `copyElementTextToClipboard`, `copyToClipboard` |
| common | `@rtorcato/browser-common/common` | `isBrowser`, `getUserAgent`, `isMobile`, `getBrowserLanguage` |
| cookies | `@rtorcato/browser-common/cookies` | `setCookie`, `getCookie`, `deleteCookie`, `hasCookie`, `getAllCookies` |
| dom | `@rtorcato/browser-common/dom` | `$`, `$$`, `createElement`, `removeElement`, `setAttributes`, `addClass`, `removeClass`, `toggleClass`, `hasClass`, `getData`, `setData` |
| draganddrop | `@rtorcato/browser-common/draganddrop` | `enableFileDrop`, `makeDraggable`, `enableTextDrop`, `disableDragAndDrop` |
| encodingapis | `@rtorcato/browser-common/encodingapis` | `isTextEncoderAvailable`, `isTextDecoderAvailable`, `encodeUTF8`, `decodeUTF8` |
| filesystem | `@rtorcato/browser-common/filesystem` | `isFileSystemApiAvailable`, `pickFiles`, `saveFile`, `readFileAsText`, `readFileAsArrayBuffer`, `writeTextToFile`, `writeDataToFile` |
| focus | `@rtorcato/browser-common/focus` | `focusFirst`, `focusLast`, `focusNext`, `focusPrev`, `focusBySelector` |
| forms | `@rtorcato/browser-common/forms` | `serializeForm`, `resetForm`, `setFormValues`, `isFormValid`, `onFormSubmit` |
| fullscreen | `@rtorcato/browser-common/fullscreen` | `enterFullscreen`, `exitFullscreen`, `isFullscreen`, `onFullscreenChange` |
| geolocation | `@rtorcato/browser-common/geolocation` | `isGeolocationAvailable`, `getCurrentPosition`, `watchPosition`, `clearWatch` |
| history | `@rtorcato/browser-common/history` | `pushState`, `replaceState`, `goBack`, `goForward`, `go`, `onPopState` |
| htmlmedia | `@rtorcato/browser-common/htmlmedia` | `playMedia`, `pauseMedia`, `setCurrentTime`, `setVolume`, `setMuted`, `loadMediaSource`, `onMediaEvent` |
| idle | `@rtorcato/browser-common/idle` | `isIdleDetectionApiAvailable`, `onIdle`, `cancelIdle`, `detectIdle` |
| iframe | `@rtorcato/browser-common/iframe` | `isIframe`, `getIframeWindow`, `getIframeDocument`, `postMessageToIframe`, `setIframeSrc`, `reloadIframe`, `isIframeLoaded`, `onIframeLoad` |
| intersection | `@rtorcato/browser-common/intersection` | `observeIntersection`, `unobserveIntersection`, `disconnectIntersectionObserver`, `observeOnce` |
| keyboard | `@rtorcato/browser-common/keyboard` | `isKey`, `isModifierKey`, `isPrintableKey`, `onShortcut`, `preventKeyDefault` |
| localstorage | `@rtorcato/browser-common/localstorage` | `isLocalStorageAvailable`, `setLocalStorage`, `getLocalStorage`, `removeLocalStorage`, `clearLocalStorage` |
| location | `@rtorcato/browser-common/location` | `getCurrentLocation`, `redirectTo`, `reloadPage`, `getPathname`, `getSearch`, `getHash` |
| mediadevices | `@rtorcato/browser-common/mediadevices` | `isMediaDevicesAvailable`, `getMediaDevices`, `getUserMedia`, `stopMediaStream`, `getMediaPermissionStatus` |
| motion | `@rtorcato/browser-common/motion` | `isDeviceMotionAvailable`, `onDeviceMotion`, `isGenericSensorApiAvailable`, `requestMotionPermission` |
| mutationobserver | `@rtorcato/browser-common/mutationobserver` | `observeMutations`, `disconnectMutationObserver`, `observeMutationOnce` |
| notifications | `@rtorcato/browser-common/notifications` | `isNotificationAvailable`, `requestNotificationPermission`, `showNotification`, `notifyIfPermitted` |
| orientation | `@rtorcato/browser-common/orientation` | `isDeviceOrientationAvailable`, `onDeviceOrientation`, `getScreenOrientationType`, `lockScreenOrientation`, `unlockScreenOrientation` |
| performance | `@rtorcato/browser-common/performance` | `isPerformanceApiAvailable`, `now`, `getPerformanceEntriesByType`, `mark`, `measure` |
| permissions | `@rtorcato/browser-common/permissions` | `isPermissionsApiAvailable`, `queryPermission`, `onPermissionChange` |
| pointerevents | `@rtorcato/browser-common/pointerevents` | `isPointerEventsAvailable`, `onPointer`, `getPointerType`, `isPrimaryPointer` |
| print | `@rtorcato/browser-common/print` | `printPage`, `printElementById`, `isPrintAvailable` |
| resizeobserver | `@rtorcato/browser-common/resizeobserver` | `observeResize`, `disconnectResizeObserver`, `observeResizeOnce` |
| screen | `@rtorcato/browser-common/screen` | `getScreenWidth`, `getScreenHeight`, `getViewportWidth`, `getViewportHeight`, `isLandscape`, `isPortrait`, `enterFullscreen`, `exitFullscreen`, `isFullscreen` |
| selectionapi | `@rtorcato/browser-common/selectionapi` | `isSelectionApiAvailable`, `getSelection`, `getSelectedText`, `clearSelection`, `selectElementText` |
| serviceworkers | `@rtorcato/browser-common/serviceworkers` | `isServiceWorkerAvailable`, `registerServiceWorker`, `unregisterAllServiceWorkers`, `getServiceWorkerRegistration`, `postMessageToServiceWorker` |
| sessionstorage | `@rtorcato/browser-common/sessionstorage` | `isSessionStorageAvailable`, `setSessionStorage`, `getSessionStorage`, `removeSessionStorage`, `clearSessionStorage` |
| touchevents | `@rtorcato/browser-common/touchevents` | `isTouchEventsAvailable`, `onTouch`, `getTouchPoints`, `getTouchCount` |
| vibrate | `@rtorcato/browser-common/vibrate` | `isVibrationApiAvailable`, `vibrate`, `stopVibration`, `vibratePulse`, `vibrateNotification` |
| visualviewport | `@rtorcato/browser-common/visualviewport` | `isVisualViewportAvailable`, `getVisualViewportInfo`, `onVisualViewportChange` |
| weblocks | `@rtorcato/browser-common/weblocks` | `withLock`, `isWebLocksAvailable` |
| webshare | `@rtorcato/browser-common/webshare` | `isWebShareAvailable`, `share`, `isFileShareAvailable` |
| websockets | `@rtorcato/browser-common/websockets` | `isWebSocketAvailable`, `createWebSocket`, `sendWebSocketMessage`, `closeWebSocket` |
| window | `@rtorcato/browser-common/window` | `openWindow`, `closeWindow`, `focusWindow`, `blurWindow`, `scrollToTop`, `scrollToBottom`, `reloadWindow`, `getWindowSize`, `onWindowResize` |

## Browser support

Every module guards its underlying API with `is<Name>Available()`. Operations return `null` / `false` / empty on unsupported environments — they never throw. This means it's safe to import any module in SSR / Node contexts; calls become no-ops.

The browsers below are the latest stable releases. For an authoritative source on each underlying Web API, see [MDN: Web APIs](https://developer.mozilla.org/en-US/docs/Web/API).

### Universally supported

Available in all evergreen browsers (Chrome, Firefox, Safari, Edge):

`alert`, `canvas`, `clipboard`, `common`, `cookies`, `dom`, `draganddrop`, `encodingapis`, `focus`, `forms`, `fullscreen`, `geolocation`, `history`, `htmlmedia`, `iframe`, `intersection`, `keyboard`, `localstorage`, `location`, `mediadevices`, `motion`, `mutationobserver`, `notifications`, `orientation`, `performance`, `permissions`, `print`, `resizeobserver`, `screen`, `selectionapi`, `serviceworkers`, `sessionstorage`, `visualviewport`, `weblocks`, `websockets`, `window`

A few of these require **HTTPS** at runtime (or `localhost` for dev): `clipboard`, `geolocation`, `mediadevices`, `serviceworkers`, `notifications`.

### Chromium-only

These wrap APIs that ship in Chrome and Edge but not Firefox or Safari. Always check `is<Name>Available()` first; on unsupported browsers it returns `false` and ops no-op.

| Module | Chrome | Edge | Firefox | Safari |
|---|---|---|---|---|
| `backgroundtasks` | ✅ | ✅ | ❌ | ❌ |
| `filesystem` (File System Access) | ✅ 86+ | ✅ 86+ | ❌ | ❌ |
| `idle` (Idle Detection) | ✅ 94+ | ✅ 94+ | ❌ | ❌ |

### Quirks worth knowing

| Module | Note |
|---|---|
| `battery` | Firefox **removed** the Battery Status API in v52. Safari never shipped it. Chrome and Edge only. |
| `vibrate` | Safari (desktop + iOS) never shipped the Vibration API. Chrome, Firefox, Edge only. |
| `webshare` | Wide support on **mobile** (iOS Safari, Android Chrome) and Safari desktop. Firefox desktop never shipped it. |
| `motion` / `orientation` | iOS 13+ Safari requires an explicit user-gesture permission grant before events fire — use `requestMotionPermission()`. |

## Contributing

Issues and PRs welcome. See [open issues](https://github.com/rtorcato/browser-common/issues) for known gaps and good first issues, and [CHANGELOG.md](CHANGELOG.md) for release notes. A `CONTRIBUTING.md` with full guidelines is on the roadmap.

`pnpm verify` runs typecheck, lint, tests, size budgets, and a tree-shaking assertion — see [`apps/treeshake-check`](apps/treeshake-check/README.md) for how the assertion works.

## License

MIT — see [LICENSE](LICENSE).
