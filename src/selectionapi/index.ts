/**
 * Checks if the Selection API is available in the current environment.
 * @example
 * ```ts
 * import { isSelectionApiAvailable } from '@rtorcato/browser-common/selectionapi'
 * if (isSelectionApiAvailable()) readSelection()
 * ```
 */
export function isSelectionApiAvailable(): boolean {
	return typeof window !== 'undefined' && typeof window.getSelection === 'function'
}

/**
 * Gets the current Selection object, if available.
 * @example
 * ```ts
 * import { getSelection } from '@rtorcato/browser-common/selectionapi'
 * const sel = getSelection()
 * ```
 */
export function getSelection(): Selection | null {
	if (!isSelectionApiAvailable()) return null
	return window.getSelection()
}

/**
 * Gets the currently selected text, if any.
 * @example
 * ```ts
 * import { getSelectedText } from '@rtorcato/browser-common/selectionapi'
 * const text = getSelectedText()
 * ```
 */
export function getSelectedText(): string {
	const sel = getSelection()
	return sel ? sel.toString() : ''
}

/**
 * Clears the current selection, if any.
 * @example
 * ```ts
 * import { clearSelection } from '@rtorcato/browser-common/selectionapi'
 * clearSelection()
 * ```
 */
export function clearSelection(): void {
	const sel = getSelection()
	if (sel) sel.removeAllRanges()
}

/**
 * Selects the text content of a given element.
 * @param element The element whose text content to select.
 * @example
 * ```ts
 * import { selectElementText } from '@rtorcato/browser-common/selectionapi'
 * selectElementText(document.querySelector('#code')!)
 * ```
 */
export function selectElementText(element: Element): void {
	if (!isSelectionApiAvailable()) return
	const sel = window.getSelection()
	if (!sel) return
	sel.removeAllRanges()
	const range = document.createRange()
	range.selectNodeContents(element)
	sel.addRange(range)
}
