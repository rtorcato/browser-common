/**
 * Triggers the browser's print dialog.
 * @returns {void}
 * @example
 * ```ts
 * import { printPage } from '@rtorcato/browser-common/print'
 * printPage()
 * ```
 */
export const printPage = (): void => {
	if (typeof window !== 'undefined' && typeof window.print === 'function') {
		window.print()
	}
}

/**
 * Prints a specific HTML element by its ID.
 * Opens a new window with the element's content and triggers print.
 * @param {string} elementId - The ID of the element to print.
 * @returns {void}
 * @example
 * ```ts
 * import { printElementById } from '@rtorcato/browser-common/print'
 * printElementById('receipt')
 * ```
 */
export const printElementById = (elementId: string): void => {
	if (typeof window === 'undefined' || typeof document === 'undefined') return
	const element = document.getElementById(elementId)
	if (!element) return
	const printWindow = window.open('', '', 'height=600,width=800')
	if (!printWindow) return
	printWindow.document.write('<html><head><title>Print</title>')
	printWindow.document.write('</head><body >')
	printWindow.document.write(element.outerHTML)
	printWindow.document.write('</body></html>')
	printWindow.document.close()
	printWindow.focus()
	printWindow.print()
	printWindow.close()
}

/**
 * Checks if the browser's print function is available.
 * @returns {boolean} True if print is available, false otherwise.
 * @example
 * ```ts
 * import { isPrintAvailable } from '@rtorcato/browser-common/print'
 * if (isPrintAvailable()) showPrintButton()
 * ```
 */
export const isPrintAvailable = (): boolean => {
	return typeof window !== 'undefined' && typeof window.print === 'function'
}
