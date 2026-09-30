import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getBrowserLanguage,
	getPlatform,
	getUserAgent,
	isAndroid,
	isBrowser,
	isIOS,
	isMobile,
} from '.'

describe('common', () => {
	it('isBrowser is a boolean', () => {
		expect(typeof isBrowser).toBe('boolean')
	})

	it('isMobile returns boolean', () => {
		expect(typeof isMobile()).toBe('boolean')
	})

	it('getUserAgent and getBrowserLanguage return strings or undefined', () => {
		expect(['string', 'undefined']).toContain(typeof getUserAgent())
		expect(['string', 'undefined']).toContain(typeof getBrowserLanguage())
	})
})

describe('getPlatform', () => {
	afterEach(() => {
		vi.unstubAllGlobals()
	})

	const stub = (userAgent: string, maxTouchPoints = 0, userAgentData?: { platform: string }) =>
		vi.stubGlobal('navigator', { userAgent, maxTouchPoints, userAgentData })

	const cases: [string, string, number, string][] = [
		[
			'iPhone',
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
			5,
			'ios',
		],
		[
			'iPad (desktop-mode UA)',
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
			5,
			'ios',
		],
		[
			'Android Chrome',
			'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36',
			5,
			'android',
		],
		[
			'macOS Safari',
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
			0,
			'macos',
		],
		[
			'Windows Edge',
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
			0,
			'windows',
		],
		[
			'Linux desktop',
			'Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0',
			0,
			'linux',
		],
	]

	it.each(cases)('%s', (_name, ua, touch, expected) => {
		stub(ua, touch)
		expect(getPlatform()).toBe(expected)
		expect(isIOS()).toBe(expected === 'ios')
		expect(isAndroid()).toBe(expected === 'android')
	})

	it('prefers userAgentData.platform', () => {
		stub('Mozilla/5.0 (X11; Linux x86_64)', 0, { platform: 'Android' })
		expect(getPlatform()).toBe('android')
		stub('Mozilla/5.0 (Windows NT 10.0)', 0, { platform: 'macOS' })
		expect(getPlatform()).toBe('macos')
	})

	it('returns unknown outside a browser', () => {
		vi.stubGlobal('navigator', undefined)
		expect(getPlatform()).toBe('unknown')
		expect(isIOS()).toBe(false)
	})
})
