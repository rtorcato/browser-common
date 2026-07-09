// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getVisualViewportInfo,
	isVisualViewportAvailable,
	onVisualViewportChange,
} from '../visualviewport/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubViewport() {
	const add = vi.fn()
	const remove = vi.fn()
	vi.stubGlobal('window', {
		visualViewport: {
			offsetLeft: 0,
			offsetTop: 10,
			width: 375,
			height: 600,
			scale: 1.5,
			addEventListener: add,
			removeEventListener: remove,
		},
	})
	return { add, remove }
}

describe('visualviewport', () => {
	it('isVisualViewportAvailable reflects window.visualViewport presence', () => {
		expect(isVisualViewportAvailable()).toBe(false)
		stubViewport()
		expect(isVisualViewportAvailable()).toBe(true)
	})

	it('getVisualViewportInfo snapshots the viewport properties', () => {
		stubViewport()
		expect(getVisualViewportInfo()).toEqual({
			offsetLeft: 0,
			offsetTop: 10,
			width: 375,
			height: 600,
			scale: 1.5,
		})
	})

	it('getVisualViewportInfo returns null when unavailable', () => {
		expect(getVisualViewportInfo()).toBeNull()
	})

	it('onVisualViewportChange subscribes to resize + scroll and unsubscribes both', () => {
		const { add, remove } = stubViewport()
		const cb = () => {}
		const off = onVisualViewportChange(cb)
		expect(add).toHaveBeenCalledWith('resize', cb)
		expect(add).toHaveBeenCalledWith('scroll', cb)
		off()
		expect(remove).toHaveBeenCalledWith('resize', cb)
		expect(remove).toHaveBeenCalledWith('scroll', cb)
	})

	it('onVisualViewportChange returns a safe no-op remover when unavailable', () => {
		expect(() => onVisualViewportChange(() => {})()).not.toThrow()
	})
})
