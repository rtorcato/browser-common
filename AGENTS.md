<!-- Mirrors skills/browser-common/SKILL.md — keep both in sync (update in the same PR that changes the public API). -->


# Using @rtorcato/browser-common

`@rtorcato/browser-common` is a tree-shakeable, ESM-only, zero-runtime-dependency library of typed wrappers around 40+ browser Web APIs. One subpath export per API.

## Rules

1. **Import from the subpath, never the package root.** Each module is a separate export, so bundlers ship only what you use.
   ```ts
   // ✅ do
   import { copyToClipboard } from '@rtorcato/browser-common/clipboard'
   // ❌ don't — defeats tree-shaking
   import { copyToClipboard } from '@rtorcato/browser-common'
   ```

2. **Always feature-guard with the module's `is<Name>Available()` before use.** Every module exports one. Wrappers already no-op (return `null`/`false`/empty) on unsupported runtimes, but guarding lets you branch or fall back explicitly.
   ```ts
   import { isGeolocationAvailable, getCurrentPosition } from '@rtorcato/browser-common/geolocation'
   if (isGeolocationAvailable()) {
     const pos = await getCurrentPosition()
   }
   ```

3. **Secure-context + permission APIs.** These require HTTPS (or `localhost`) and often an explicit permission grant: `clipboard`, `geolocation`, `mediadevices`, `notifications`, `serviceworkers`. Request permission where the API needs it — e.g. `requestNotificationPermission()`, and `requestMotionPermission()` for iOS 13+ `motion`/`orientation`.

4. **SSR / Node is safe.** Imports are side-effect-free and calls no-op when `window` is absent, so you don't need `typeof window` guards around imports. Still guard behavior that expects a real result.

5. **Limited browser support (guard is mandatory):** Chromium-only — `backgroundtasks`, `filesystem` (File System Access), `idle` (Idle Detection). Not in Safari — `battery`, `vibrate`. Firefox desktop — no `webshare`.

## Module → subpath → exports

Import from `@rtorcato/browser-common/<module>`.

| Module | Exports |
|---|---|
| alert | showAlert, showConfirm, showPrompt |
| backgroundtasks | isBackgroundSyncAvailable, isBackgroundFetchAvailable, registerBackgroundSync, registerBackgroundFetch |
| battery | isBatteryApiAvailable, getBatteryManager, onBatteryLevelChange, onBatteryChargingChange |
| canvas | createCanvas, getCanvasContext2D, clearCanvas, drawImageOnCanvas, canvasToDataURL, fillCanvas |
| clipboard | isClipboardApiAvailable, readFromClipboard, copyElementTextToClipboard, copyToClipboard |
| common | isBrowser, getUserAgent, isMobile, getBrowserLanguage |
| cookies | setCookie, getCookie, deleteCookie, hasCookie, getAllCookies |
| dom | $, $$, createElement, removeElement, setAttributes, addClass, removeClass, toggleClass, hasClass, getData, setData |
| draganddrop | enableFileDrop, makeDraggable, enableTextDrop, disableDragAndDrop |
| encodingapis | isTextEncoderAvailable, isTextDecoderAvailable, encodeUTF8, decodeUTF8 |
| filesystem | isFileSystemApiAvailable, pickFiles, saveFile, readFileAsText, readFileAsArrayBuffer, writeTextToFile, writeDataToFile |
| focus | focusFirst, focusLast, focusNext, focusPrev, focusBySelector |
| forms | serializeForm, resetForm, setFormValues, isFormValid, onFormSubmit |
| fullscreen | enterFullscreen, exitFullscreen, isFullscreen, onFullscreenChange |
| geolocation | isGeolocationAvailable, getCurrentPosition, watchPosition, clearWatch |
| history | pushState, replaceState, goBack, goForward, go, onPopState |
| htmlmedia | playMedia, pauseMedia, setCurrentTime, setVolume, setMuted, loadMediaSource, onMediaEvent |
| idle | isIdleDetectionApiAvailable, onIdle, cancelIdle, detectIdle |
| iframe | isIframe, getIframeWindow, getIframeDocument, postMessageToIframe, setIframeSrc, reloadIframe, isIframeLoaded, onIframeLoad |
| intersection | observeIntersection, unobserveIntersection, disconnectIntersectionObserver, observeOnce |
| keyboard | isKey, isModifierKey, isPrintableKey, onShortcut, preventKeyDefault |
| localstorage | isLocalStorageAvailable, setLocalStorage, getLocalStorage, removeLocalStorage, clearLocalStorage |
| location | getCurrentLocation, redirectTo, reloadPage, getPathname, getSearch, getHash |
| mediadevices | isMediaDevicesAvailable, getMediaDevices, getUserMedia, stopMediaStream, getMediaPermissionStatus |
| motion | isDeviceMotionAvailable, onDeviceMotion, isGenericSensorApiAvailable, requestMotionPermission |
| mutationobserver | observeMutations, disconnectMutationObserver, observeMutationOnce |
| notifications | isNotificationAvailable, requestNotificationPermission, showNotification, notifyIfPermitted |
| orientation | isDeviceOrientationAvailable, onDeviceOrientation, getScreenOrientationType, lockScreenOrientation, unlockScreenOrientation |
| performance | isPerformanceApiAvailable, now, getPerformanceEntriesByType, mark, measure |
| permissions | isPermissionsApiAvailable, queryPermission, onPermissionChange |
| pointerevents | isPointerEventsAvailable, onPointer, getPointerType, isPrimaryPointer |
| print | printPage, printElementById, isPrintAvailable |
| resizeobserver | observeResize, disconnectResizeObserver, observeResizeOnce |
| screen | getScreenWidth, getScreenHeight, getViewportWidth, getViewportHeight, isLandscape, isPortrait, enterFullscreen, exitFullscreen, isFullscreen |
| selectionapi | isSelectionApiAvailable, getSelection, getSelectedText, clearSelection, selectElementText |
| serviceworkers | isServiceWorkerAvailable, registerServiceWorker, unregisterAllServiceWorkers, getServiceWorkerRegistration, postMessageToServiceWorker |
| sessionstorage | isSessionStorageAvailable, setSessionStorage, getSessionStorage, removeSessionStorage, clearSessionStorage |
| touchevents | isTouchEventsAvailable, onTouch, getTouchPoints, getTouchCount |
| vibrate | isVibrationApiAvailable, vibrate, stopVibration, vibratePulse, vibrateNotification |
| visualviewport | isVisualViewportAvailable, getVisualViewportInfo, onVisualViewportChange |
| weblocks | withLock, isWebLocksAvailable |
| webshare | isWebShareAvailable, share, isFileShareAvailable |
| websockets | isWebSocketAvailable, createWebSocket, sendWebSocketMessage, closeWebSocket |
| window | openWindow, closeWindow, focusWindow, blurWindow, scrollToTop, scrollToBottom, reloadWindow, getWindowSize, onWindowResize |

For browser-support details and the full API, see <https://rtorcato.github.io/browser-common/> or the package README.
