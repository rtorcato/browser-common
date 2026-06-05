/**
 * Checks if the Clipboard API is available in the browser.
 * @returns {boolean} True if available, false otherwise.
 * @example
 * ```ts
 * import { isClipboardApiAvailable } from '@rtorcato/browser-common/clipboard'
 * if (isClipboardApiAvailable()) showCopyButton()
 * ```
 */
export const isClipboardApiAvailable = (): boolean => {
	return typeof navigator !== 'undefined' && !!navigator.clipboard
}

/**
 * Reads text from the clipboard, if supported by the browser.
 * @returns {Promise<string | null>} The clipboard text, or null if not available.
 * @remarks
 * Requires HTTPS or a user-gesture-initiated handler in most browsers.
 * @example
 * ```ts
 * import { readFromClipboard } from '@rtorcato/browser-common/clipboard'
 * const text = await readFromClipboard()
 * ```
 */
export const readFromClipboard = async (): Promise<string | null> => {
	if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.readText) {
		try {
			return await navigator.clipboard.readText()
		} catch {
			return null
		}
	}
	return null
}

/**
 * Copies the text content of a DOM element to the clipboard.
 * @param element The element whose text to copy.
 * @returns {Promise<boolean>} True if the copy succeeded, false otherwise.
 * @example
 * ```ts
 * import { copyElementTextToClipboard } from '@rtorcato/browser-common/clipboard'
 * await copyElementTextToClipboard(document.querySelector('#snippet')!)
 * ```
 */
export const copyElementTextToClipboard = async (element: Element): Promise<boolean> => {
	return await copyToClipboard(element.textContent || '')
}
/**
 * Copies a string to the clipboard, if supported by the browser.
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} True if the copy succeeded, false otherwise.
 * @remarks
 * Requires HTTPS or a user-gesture-initiated handler in most browsers.
 * @example
 * ```ts
 * import { copyToClipboard } from '@rtorcato/browser-common/clipboard'
 * await copyToClipboard('hello')
 * ```
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
	if (typeof navigator !== 'undefined' && navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text)
			return true
		} catch {
			return false
		}
	}
	return false
}
