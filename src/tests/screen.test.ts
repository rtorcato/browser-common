// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getScreenHeight,
	getScreenWidth,
	getViewportHeight,
	getViewportWidth,
	isLandscape,
	isPortrait,
} from '../screen/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubScreen(innerWidth: number, innerHeight: number) {
	vi.stubGlobal('window', {
		screen: { width: 2560, height: 1440 },
		innerWidth,
		innerHeight,
	})
}

describe('screen (browser present)', () => {
	it('reads physical screen and viewport sizes', () => {
		stubScreen(1024, 768)
		expect(getScreenWidth()).toBe(2560)
		expect(getScreenHeight()).toBe(1440)
		expect(getViewportWidth()).toBe(1024)
		expect(getViewportHeight()).toBe(768)
	})

	it('landscape/portrait reflect the viewport aspect', () => {
		stubScreen(1024, 768)
		expect(isLandscape()).toBe(true)
		expect(isPortrait()).toBe(false)

		stubScreen(768, 1024)
		expect(isLandscape()).toBe(false)
		expect(isPortrait()).toBe(true)

		// A square viewport counts as portrait (height >= width).
		stubScreen(800, 800)
		expect(isPortrait()).toBe(true)
		expect(isLandscape()).toBe(false)
	})
})

describe('screen (SSR / no window)', () => {
	it('every reader returns undefined', () => {
		expect(getScreenWidth()).toBeUndefined()
		expect(getViewportWidth()).toBeUndefined()
		expect(isLandscape()).toBeUndefined()
		expect(isPortrait()).toBeUndefined()
	})
})
