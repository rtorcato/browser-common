// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getVisibilityState,
	isPageVisible,
	isVisibilityAvailable,
	onVisibilityChange,
} from '../visibility/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubDocument(visibilityState: DocumentVisibilityState) {
	const doc = {
		visibilityState,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
	}
	vi.stubGlobal('document', doc)
	return doc
}

describe('visibility', () => {
	it('isVisibilityAvailable reflects document.visibilityState presence', () => {
		expect(isVisibilityAvailable()).toBe(false)
		vi.stubGlobal('document', {})
		expect(isVisibilityAvailable()).toBe(false)
		stubDocument('visible')
		expect(isVisibilityAvailable()).toBe(true)
	})

	it('getVisibilityState and isPageVisible read the current state', () => {
		const doc = stubDocument('visible')
		expect(getVisibilityState()).toBe('visible')
		expect(isPageVisible()).toBe(true)
		doc.visibilityState = 'hidden'
		expect(getVisibilityState()).toBe('hidden')
		expect(isPageVisible()).toBe(false)
	})

	it('getVisibilityState and isPageVisible return null when unavailable', () => {
		expect(getVisibilityState()).toBeNull()
		expect(isPageVisible()).toBeNull()
	})

	it('onVisibilityChange passes the new state and removes the same listener', () => {
		const doc = stubDocument('visible')
		const cb = vi.fn()
		const off = onVisibilityChange(cb)

		expect(doc.addEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
		const handler = doc.addEventListener.mock.calls[0][1]
		doc.visibilityState = 'hidden'
		handler()
		expect(cb).toHaveBeenCalledWith('hidden')

		off()
		expect(doc.removeEventListener).toHaveBeenCalledWith('visibilitychange', handler)
	})

	it('onVisibilityChange returns a safe no-op remover when unavailable', () => {
		expect(() => onVisibilityChange(() => {})()).not.toThrow()
	})
})
