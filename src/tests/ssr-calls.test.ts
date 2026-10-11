// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { createCanvas } from '../canvas/index'
import { deleteCookie, getAllCookies, getCookie, hasCookie, setCookie } from '../cookies/index'
import { $, $$ } from '../dom/index'
import { cancelIdle, onIdle } from '../idle/index'
import { isIframe } from '../iframe/index'
import { observeIntersection, observeOnce } from '../intersection/index'
import { onShortcut, preventKeyDefault } from '../keyboard/index'
import { observeMutationOnce, observeMutations } from '../mutationobserver/index'
import { observeResize, observeResizeOnce } from '../resizeobserver/index'
import {
	blurWindow,
	closeWindow,
	focusWindow,
	getWindowSize,
	onWindowResize,
	openWindow,
	reloadWindow,
	scrollToBottom,
	scrollToTop,
} from '../window/index'

// Real Node globals, nothing stubbed: these must not throw ReferenceError.
describe('SSR calls without browser globals', () => {
	it('has no browser globals to lean on', () => {
		expect(typeof window).toBe('undefined')
		expect(typeof document).toBe('undefined')
	})

	it('cookies no-op and read as empty', () => {
		expect(() => setCookie('a', 'b', 1)).not.toThrow()
		expect(() => deleteCookie('a')).not.toThrow()
		expect(getCookie('a')).toBeNull()
		expect(hasCookie('a')).toBe(false)
		expect(getAllCookies()).toEqual({})
	})

	it('window functions no-op, getWindowSize returns zero size', () => {
		expect(openWindow('https://example.com')).toBeNull()
		for (const fn of [
			closeWindow,
			focusWindow,
			blurWindow,
			scrollToTop,
			scrollToBottom,
			reloadWindow,
		]) {
			expect(() => fn()).not.toThrow()
		}
		expect(getWindowSize()).toEqual({ width: 0, height: 0 })
		const off = onWindowResize(() => {})
		expect(() => off()).not.toThrow()
	})

	it('onIdle does nothing and returns 0; cancelIdle is safe', () => {
		let called = false
		expect(onIdle(() => (called = true))).toBe(0)
		expect(() => cancelIdle(0)).not.toThrow()
		expect(called).toBe(false)
	})

	it('isIframe is false', () => {
		expect(isIframe({})).toBe(false)
	})

	it('dom selectors return empty without a document', () => {
		expect($('div')).toBeNull()
		expect($$('div')).toEqual([])
	})

	it('keyboard listeners default to a no-op cleanup', () => {
		expect(() => onShortcut(['Control', 's'], () => {})()).not.toThrow()
		expect(() => preventKeyDefault('Enter')()).not.toThrow()
	})

	it('constructors that must return a live object throw a clear error', () => {
		const el = {} as Element
		expect(() => createCanvas(1, 1)).toThrow('requires a browser environment')
		expect(() => observeIntersection(el, () => {})).toThrow('requires a browser environment')
		expect(() => observeOnce(el, () => {})).toThrow('requires a browser environment')
		expect(() => observeMutations(el, () => {})).toThrow('requires a browser environment')
		expect(() => observeMutationOnce(el, () => {})).toThrow('requires a browser environment')
		expect(() => observeResize(el, () => {})).toThrow('requires a browser environment')
		expect(() => observeResizeOnce(el, () => {})).toThrow('requires a browser environment')
	})
})
