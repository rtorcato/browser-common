// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { focusBySelector, focusFirst, focusLast, focusNext, focusPrev } from '../focus/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

const el = () => ({ focus: vi.fn() })

function container(focusables: ReturnType<typeof el>[]) {
	return {
		querySelector: vi.fn().mockReturnValue(focusables[0] ?? null),
		querySelectorAll: vi.fn().mockReturnValue(focusables),
	} as unknown as HTMLElement
}

describe('focus', () => {
	it('focusFirst focuses the first match, or returns false when none', () => {
		const first = el()
		expect(focusFirst(container([first]))).toBe(true)
		expect(first.focus).toHaveBeenCalled()
		expect(focusFirst(container([]))).toBe(false)
	})

	it('focusLast focuses the last match', () => {
		const first = el()
		const last = el()
		expect(focusLast(container([first, last]))).toBe(true)
		expect(last.focus).toHaveBeenCalled()
		expect(first.focus).not.toHaveBeenCalled()
	})

	it('focusBySelector focuses the queried element', () => {
		const target = el()
		const c = { querySelector: vi.fn().mockReturnValue(target) } as unknown as HTMLElement
		expect(focusBySelector(c, 'input')).toBe(true)
		expect(target.focus).toHaveBeenCalled()
	})

	it('focusNext / focusPrev move relative to document.activeElement', () => {
		const a = el()
		const b = el()
		const c = el()
		vi.stubGlobal('document', { activeElement: b })

		expect(focusNext(container([a, b, c]))).toBe(true)
		expect(c.focus).toHaveBeenCalled()

		expect(focusPrev(container([a, b, c]))).toBe(true)
		expect(a.focus).toHaveBeenCalled()
	})

	it('focusNext returns false at the end of the list', () => {
		const a = el()
		const b = el()
		vi.stubGlobal('document', { activeElement: b })
		expect(focusNext(container([a, b]))).toBe(false)
	})
})
