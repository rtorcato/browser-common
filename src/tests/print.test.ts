// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { isPrintAvailable, printElementById, printPage } from '../print/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('print', () => {
	it('isPrintAvailable reflects window.print presence', () => {
		expect(isPrintAvailable()).toBe(false)
		vi.stubGlobal('window', { print: () => {} })
		expect(isPrintAvailable()).toBe(true)
	})

	it('printPage calls window.print when available, no-ops otherwise', () => {
		const print = vi.fn()
		vi.stubGlobal('window', { print })
		printPage()
		expect(print).toHaveBeenCalled()

		vi.unstubAllGlobals()
		expect(() => printPage()).not.toThrow()
	})

	it('printElementById writes the element and drives the print window', () => {
		const printWindow = {
			document: { write: vi.fn(), close: vi.fn() },
			focus: vi.fn(),
			print: vi.fn(),
			close: vi.fn(),
		}
		vi.stubGlobal('window', { open: vi.fn().mockReturnValue(printWindow) })
		vi.stubGlobal('document', {
			getElementById: vi.fn().mockReturnValue({ outerHTML: '<p>hi</p>' }),
		})

		printElementById('receipt')
		expect(printWindow.document.write).toHaveBeenCalledWith('<p>hi</p>')
		expect(printWindow.print).toHaveBeenCalled()
		expect(printWindow.close).toHaveBeenCalled()
	})

	it('printElementById bails out when the element is missing', () => {
		const open = vi.fn()
		vi.stubGlobal('window', { open })
		vi.stubGlobal('document', { getElementById: vi.fn().mockReturnValue(null) })
		printElementById('nope')
		expect(open).not.toHaveBeenCalled()
	})
})
