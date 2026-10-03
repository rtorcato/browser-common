import { describe, expect, it } from 'vitest'
import { isBackgroundFetchAvailable, isBackgroundSyncAvailable } from '../../backgroundtasks/index'
import { isBatteryApiAvailable } from '../../battery/index'
import { isBroadcastChannelAvailable } from '../../broadcastchannel/index'
import { isClipboardApiAvailable } from '../../clipboard/index'
import { isBrowser } from '../../common/index'
import { isTextDecoderAvailable, isTextEncoderAvailable } from '../../encodingapis/index'
import { isFileSystemApiAvailable } from '../../filesystem/index'
import { isGeolocationAvailable } from '../../geolocation/index'
import { isIdleDetectionApiAvailable } from '../../idle/index'
import { isLocalStorageAvailable } from '../../localstorage/index'
import { isMediaDevicesAvailable } from '../../mediadevices/index'
import { isDeviceMotionAvailable, isGenericSensorApiAvailable } from '../../motion/index'
import { isNotificationAvailable } from '../../notifications/index'
import { isDeviceOrientationAvailable } from '../../orientation/index'
import { isPerformanceApiAvailable } from '../../performance/index'
import { isPermissionsApiAvailable } from '../../permissions/index'
import { isPointerEventsAvailable } from '../../pointerevents/index'
import { isPrintAvailable } from '../../print/index'
import { isScreenCaptureAvailable } from '../../screencapture/index'
import { isSelectionApiAvailable } from '../../selectionapi/index'
import { isServiceWorkerAvailable } from '../../serviceworkers/index'
import { isSessionStorageAvailable } from '../../sessionstorage/index'
import { isTouchEventsAvailable } from '../../touchevents/index'
import { isURLPatternAvailable } from '../../urlpattern/index'
import { isVibrationApiAvailable } from '../../vibrate/index'
import { isViewTransitionsSupported } from '../../viewtransitions/index'
import { isVisualViewportAvailable } from '../../visualviewport/index'
import { isWebAnimationsAvailable } from '../../webanimations/index'
import { isWebAuthnAvailable } from '../../webauthn/index'
import { isWebLocksAvailable } from '../../weblocks/index'
import { isFileShareAvailable, isWebShareAvailable } from '../../webshare/index'
import { isWebSocketAvailable } from '../../websockets/index'

// Real headless Chromium on localhost (a secure context). Every API listed here
// ships in Chromium, so a guard returning false means the guard is wrong.
const supported = {
	isBackgroundFetchAvailable,
	isBackgroundSyncAvailable,
	isBroadcastChannelAvailable,
	isClipboardApiAvailable,
	isDeviceMotionAvailable,
	isDeviceOrientationAvailable,
	isGeolocationAvailable,
	isLocalStorageAvailable,
	isMediaDevicesAvailable,
	isNotificationAvailable,
	isPerformanceApiAvailable,
	isPermissionsApiAvailable,
	isPointerEventsAvailable,
	isPrintAvailable,
	isScreenCaptureAvailable,
	isSelectionApiAvailable,
	isServiceWorkerAvailable,
	isSessionStorageAvailable,
	isTextDecoderAvailable,
	isTextEncoderAvailable,
	isURLPatternAvailable,
	isViewTransitionsSupported,
	isVisualViewportAvailable,
	isWebAnimationsAvailable,
	isWebAuthnAvailable,
	isWebLocksAvailable,
	isWebSocketAvailable,
}

// ponytail: availability here depends on platform, flags or headless mode, so
// only the contract (no throw, returns a boolean) is pinned. Promote one to
// `supported` once CI shows it is stable.
const platformDependent = {
	isBatteryApiAvailable,
	isFileShareAvailable,
	isFileSystemApiAvailable,
	isGenericSensorApiAvailable,
	isIdleDetectionApiAvailable,
	isTouchEventsAvailable,
	isVibrationApiAvailable,
	isWebShareAvailable,
}

describe('API guards in real Chromium', () => {
	it('runs in a browser, not a shim', () => {
		expect(isBrowser).toBe(true)
		expect(navigator.userAgent).not.toMatch(/jsdom|happy-?dom/i)
	})

	it.each(Object.entries(supported))('%s() is true', (_, guard) => {
		expect(guard()).toBe(true)
	})

	it.each(Object.entries(platformDependent))('%s() returns a boolean', (_, guard) => {
		expect(typeof guard()).toBe('boolean')
	})
})
