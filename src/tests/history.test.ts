// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { go, goBack, goForward, onPopState, pushState, replaceState } from '../history/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubHistory() {
	const history = {
		pushState: vi.fn(),
		replaceState: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		go: vi.fn(),
	}
	const add = vi.fn()
	const remove = vi.fn()
	vi.stubGlobal('window', { history, addEventListener: add, removeEventListener: remove })
	return { history, add, remove }
}

describe('history (browser present)', () => {
	it('pushState/replaceState reorder args to (state, title, url)', () => {
		const { history } = stubHistory()
		pushState('/page/2', { page: 2 })
		expect(history.pushState).toHaveBeenCalledWith({ page: 2 }, '', '/page/2')
		replaceState('/login', { from: '/x' }, 'Login')
		expect(history.replaceState).toHaveBeenCalledWith({ from: '/x' }, 'Login', '/login')
	})

	it('navigation helpers delegate to history', () => {
		const { history } = stubHistory()
		goBack()
		goForward()
		go(-2)
		expect(history.back).toHaveBeenCalled()
		expect(history.forward).toHaveBeenCalled()
		expect(history.go).toHaveBeenCalledWith(-2)
	})

	it('onPopState wires and unwires the popstate event', () => {
		const { add, remove } = stubHistory()
		const cb = () => {}
		const off = onPopState(cb)
		expect(add).toHaveBeenCalledWith('popstate', cb)
		off()
		expect(remove).toHaveBeenCalledWith('popstate', cb)
	})
})

describe('history (SSR / no window)', () => {
	it('no-ops without throwing and onPopState returns a safe remover', () => {
		expect(() => {
			pushState('/x')
			replaceState('/x')
			goBack()
			goForward()
			go(1)
		}).not.toThrow()
		expect(() => onPopState(() => {})()).not.toThrow()
	})
})
