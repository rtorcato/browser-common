---
title: Module reference
description: All 42 subpath imports with their exports.
---

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
| print | `@rtorcato/browser-common/print` | `printPage`, `printElementById`, `isPrintAvailable` |
| resizeobserver | `@rtorcato/browser-common/resizeobserver` | `observeResize`, `disconnectResizeObserver`, `observeResizeOnce` |
| screen | `@rtorcato/browser-common/screen` | `getScreenWidth`, `getScreenHeight`, `getViewportWidth`, `getViewportHeight`, `isLandscape`, `isPortrait`, `enterFullscreen`, `exitFullscreen`, `isFullscreen` |
| selectionapi | `@rtorcato/browser-common/selectionapi` | `isSelectionApiAvailable`, `getSelection`, `getSelectedText`, `clearSelection`, `selectElementText` |
| serviceworkers | `@rtorcato/browser-common/serviceworkers` | `isServiceWorkerAvailable`, `registerServiceWorker`, `unregisterAllServiceWorkers`, `getServiceWorkerRegistration`, `postMessageToServiceWorker` |
| sessionstorage | `@rtorcato/browser-common/sessionstorage` | `isSessionStorageAvailable`, `setSessionStorage`, `getSessionStorage`, `removeSessionStorage`, `clearSessionStorage` |
| vibrate | `@rtorcato/browser-common/vibrate` | `isVibrationApiAvailable`, `vibrate`, `stopVibration`, `vibratePulse`, `vibrateNotification` |
| visualviewport | `@rtorcato/browser-common/visualviewport` | `isVisualViewportAvailable`, `getVisualViewportInfo`, `onVisualViewportChange` |
| weblocks | `@rtorcato/browser-common/weblocks` | `withLock`, `isWebLocksAvailable` |
| webshare | `@rtorcato/browser-common/webshare` | `isWebShareAvailable`, `share`, `isFileShareAvailable` |
| websockets | `@rtorcato/browser-common/websockets` | `isWebSocketAvailable`, `createWebSocket`, `sendWebSocketMessage`, `closeWebSocket` |
| window | `@rtorcato/browser-common/window` | `openWindow`, `closeWindow`, `focusWindow`, `blurWindow`, `scrollToTop`, `scrollToBottom`, `reloadWindow`, `getWindowSize`, `onWindowResize` |

For detailed JSDoc with `@param`/`@returns` on every function, your IDE's hover docs are authoritative — the source lives at [github.com/rtorcato/browser-common/tree/main/src](https://github.com/rtorcato/browser-common/tree/main/src).
