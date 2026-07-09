// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	$,
	$$,
	addClass,
	createElement,
	getData,
	hasClass,
	removeClass,
	removeElement,
	setAttributes,
	setData,
	toggleClass,
} from '../dom/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function fakeClassList() {
	const set = new Set<string>()
	return {
		set,
		list: {
			add: (...c: string[]) => {
				for (const x of c) set.add(x)
			},
			remove: (...c: string[]) => {
				for (const x of c) set.delete(x)
			},
			contains: (c: string) => set.has(c),
			toggle: (c: string, force?: boolean) => {
				const on = force ?? !set.has(c)
				if (on) set.add(c)
				else set.delete(c)
				return on
			},
		},
	}
}

describe('dom queries', () => {
	it('$ and $$ delegate to the parent (or document) query methods', () => {
		const parent = {
			querySelector: vi.fn().mockReturnValue('one'),
			querySelectorAll: vi.fn().mockReturnValue(['a', 'b']),
		} as unknown as Element
		expect($('.x', parent)).toBe('one')
		expect($$('.x', parent)).toEqual(['a', 'b'])
	})
})

describe('dom mutation', () => {
	it('createElement assigns props and appends children', () => {
		const appended: unknown[] = []
		const el = { append: (c: unknown) => appended.push(c) }
		vi.stubGlobal('document', { createElement: vi.fn().mockReturnValue(el) })
		const result = createElement(
			'button',
			{ className: 'primary' } as never,
			'Save'
		) as unknown as {
			className: string
		}
		expect(result.className).toBe('primary')
		expect(appended).toEqual(['Save'])
	})

	it('removeElement detaches via parentNode', () => {
		const removeChild = vi.fn()
		const el = { parentNode: { removeChild } } as unknown as Element
		removeElement(el)
		expect(removeChild).toHaveBeenCalledWith(el)
	})

	it('setAttributes sets each pair', () => {
		const setAttribute = vi.fn()
		setAttributes({ setAttribute } as unknown as Element, { type: 'email', required: 'true' })
		expect(setAttribute).toHaveBeenCalledWith('type', 'email')
		expect(setAttribute).toHaveBeenCalledWith('required', 'true')
	})

	it('class helpers add / remove / toggle / query', () => {
		const { set, list } = fakeClassList()
		const el = { classList: list } as unknown as Element
		addClass(el, 'active', 'highlighted')
		expect(set.has('active')).toBe(true)
		removeClass(el, 'highlighted')
		expect(set.has('highlighted')).toBe(false)
		expect(toggleClass(el, 'open')).toBe(true)
		expect(hasClass(el, 'open')).toBe(true)
		expect(toggleClass(el, 'open')).toBe(false)
	})

	it('getData / setData read and write dataset', () => {
		const el = { dataset: {} as Record<string, string> } as unknown as HTMLElement
		setData(el, 'userId', '42')
		expect(getData(el, 'userId')).toBe('42')
	})
})
