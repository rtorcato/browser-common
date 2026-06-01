# Browser Common

Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs.

[![CI](https://github.com/rtorcato/browser-common/actions/workflows/ci.yml/badge.svg)](https://github.com/rtorcato/browser-common/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@rtorcato%2Fbrowser-common.svg)](https://badge.fury.io/js/@rtorcato%2Fbrowser-common)
[![npm downloads](https://img.shields.io/npm/dm/@rtorcato%2Fbrowser-common)](https://www.npmjs.com/package/@rtorcato/browser-common)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@rtorcato/browser-common)](https://bundlephobia.com/package/@rtorcato/browser-common)
[![Coverage](https://codecov.io/gh/rtorcato/browser-common/branch/main/graph/badge.svg)](https://codecov.io/gh/rtorcato/browser-common)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Typed, ESM-only wrappers for clipboard, geolocation, media devices, storage, observers, and 35+ other Web APIs — each one a separate subpath export so consumers only ship what they use. Every wrapper guards its underlying API, returning `null` or `false` on unsupported browsers instead of throwing. No runtime dependencies, `sideEffects: false`, fully tree-shakeable.

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
| encodingapis | `@rtorcato/browser-common/encodingapis` | `isTextEncoderSupported`, `isTextDecoderSupported`, `encodeUTF8`, `decodeUTF8` |
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
| notifications | `@rtorcato/browser-common/notifications` | `isNotificationSupported`, `requestNotificationPermission`, `showNotification`, `notifyIfPermitted` |
| orientation | `@rtorcato/browser-common/orientation` | `isDeviceOrientationAvailable`, `onDeviceOrientation`, `getScreenOrientationType`, `lockScreenOrientation`, `unlockScreenOrientation` |
| performance | `@rtorcato/browser-common/performance` | `isPerformanceApiAvailable`, `now`, `getPerformanceEntriesByType`, `mark`, `measure` |
| permissions | `@rtorcato/browser-common/permissions` | `isPermissionsApiAvailable`, `queryPermission`, `onPermissionChange` |
| print | `@rtorcato/browser-common/print` | `printPage`, `printElementById`, `isPrintSupported` |
| resizeobserver | `@rtorcato/browser-common/resizeobserver` | `observeResize`, `disconnectResizeObserver`, `observeResizeOnce` |
| screen | `@rtorcato/browser-common/screen` | `getScreenWidth`, `getScreenHeight`, `getViewportWidth`, `getViewportHeight`, `isLandscape`, `isPortrait`, `enterFullscreen`, `exitFullscreen`, `isFullscreen` |
| selectionapi | `@rtorcato/browser-common/selectionapi` | `isSelectionApiAvailable`, `getSelection`, `getSelectedText`, `clearSelection`, `selectElementText` |
| serviceworkers | `@rtorcato/browser-common/serviceworkers` | `isServiceWorkerSupported`, `registerServiceWorker`, `unregisterAllServiceWorkers`, `getServiceWorkerRegistration`, `postMessageToServiceWorker` |
| sessionstorage | `@rtorcato/browser-common/sessionstorage` | `isSessionStorageAvailable`, `setSessionStorage`, `getSessionStorage`, `removeSessionStorage`, `clearSessionStorage` |
| vibrate | `@rtorcato/browser-common/vibrate` | `isVibrationApiAvailable`, `vibrate`, `stopVibration`, `vibratePulse`, `vibrateNotification` |
| visualviewport | `@rtorcato/browser-common/visualviewport` | `isVisualViewportSupported`, `getVisualViewportInfo`, `onVisualViewportChange` |
| weblocks | `@rtorcato/browser-common/weblocks` | `withLock`, `isWebLocksSupported` |
| webshare | `@rtorcato/browser-common/webshare` | `isWebShareSupported`, `share`, `isFileShareSupported` |
| websockets | `@rtorcato/browser-common/websockets` | `isWebSocketSupported`, `createWebSocket`, `sendWebSocketMessage`, `closeWebSocket` |
| window | `@rtorcato/browser-common/window` | `openWindow`, `closeWindow`, `focusWindow`, `blurWindow`, `scrollToTop`, `scrollToBottom`, `reloadWindow`, `getWindowSize`, `onWindowResize` |

## Browser support

Each module checks for its underlying API before calling it (e.g. `typeof navigator !== 'undefined' && !!navigator.clipboard`). When the API is unavailable, support-check functions (`isXxxAvailable`) return `false` and operations return `null`, `false`, or a rejected/empty result — they don't throw. This means it's safe to import any module in SSR / Node contexts; the calls just become no-ops.

For an authoritative reference on the underlying APIs, see [MDN: Web APIs](https://developer.mozilla.org/en-US/docs/Web/API).

## Contributing

Issues and PRs welcome. See [TODOS.md](TODOS.md) for known gaps and good first issues. A `CONTRIBUTING.md` with full guidelines is on the roadmap.

## License

MIT — see [LICENSE](LICENSE).
