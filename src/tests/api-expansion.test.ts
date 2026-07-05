// @vitest-environment node

import { expect, test, vi } from 'vitest'
import { isBroadcastChannelAvailable } from '../broadcastchannel/index'
import { isScreenCaptureAvailable } from '../screencapture/index'
import { isURLPatternAvailable } from '../urlpattern/index'
import { isViewTransitionsSupported, startViewTransition } from '../viewtransitions/index'
import { animateElement, isWebAnimationsAvailable } from '../webanimations/index'
import { isWebAuthnAvailable } from '../webauthn/index'

test('feature checks report false in a non-DOM environment', () => {
	expect(isScreenCaptureAvailable()).toBe(false)
	expect(isWebAuthnAvailable()).toBe(false)
	expect(isViewTransitionsSupported()).toBe(false)
	expect(isWebAnimationsAvailable()).toBe(false)
	// BroadcastChannel and URLPattern exist as globals under Node, so we only
	// assert they return a boolean rather than a specific value.
	expect(typeof isBroadcastChannelAvailable()).toBe('boolean')
	expect(typeof isURLPatternAvailable()).toBe('boolean')
})

test('startViewTransition falls back to running the callback when unsupported', async () => {
	const update = vi.fn()
	await startViewTransition(update)
	expect(update).toHaveBeenCalledOnce()
})

test('animateElement returns null when the Web Animations API is unavailable', () => {
	expect(animateElement({} as Element, [{ opacity: 0 }])).toBeNull()
})
