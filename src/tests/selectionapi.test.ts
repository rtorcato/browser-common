// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	clearSelection,
	getSelectedText,
	getSelection,
	isSelectionApiAvailable,
	selectElementText,
} from '../selectionapi/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function fakeSelection(text = '') {
	return {
		toString: () => text,
		removeAllRanges: vi.fn(),
		addRange: vi.fn(),
	}
}

describe('selectionapi (browser present)', () => {
	it('isSelectionApiAvailable reflects window.getSelection', () => {
		expect(isSelectionApiAvailable()).toBe(false)
		vi.stubGlobal('window', { getSelection: () => null })
		expect(isSelectionApiAvailable()).toBe(true)
	})

	it('getSelection / getSelectedText read the current selection', () => {
		const sel = fakeSelection('hello')
		vi.stubGlobal('window', { getSelection: () => sel })
		expect(getSelection()).toBe(sel)
		expect(getSelectedText()).toBe('hello')
	})

	it('clearSelection removes all ranges', () => {
		const sel = fakeSelection()
		vi.stubGlobal('window', { getSelection: () => sel })
		clearSelection()
		expect(sel.removeAllRanges).toHaveBeenCalled()
	})

	it('selectElementText builds a range over the element and selects it', () => {
		const sel = fakeSelection()
		const range = { selectNodeContents: vi.fn() }
		vi.stubGlobal('window', { getSelection: () => sel })
		vi.stubGlobal('document', { createRange: () => range })
		const element = {} as Element
		selectElementText(element)
		expect(sel.removeAllRanges).toHaveBeenCalled()
		expect(range.selectNodeContents).toHaveBeenCalledWith(element)
		expect(sel.addRange).toHaveBeenCalledWith(range)
	})
})

describe('selectionapi (SSR / no window)', () => {
	it('returns safe defaults without throwing', () => {
		expect(getSelection()).toBeNull()
		expect(getSelectedText()).toBe('')
		expect(() => clearSelection()).not.toThrow()
	})
})
