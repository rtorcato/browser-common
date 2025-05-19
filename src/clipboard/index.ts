/**
 * Checks if the Clipboard API is available in the browser.
 * @returns {boolean} True if available, false otherwise.
 */
export const isClipboardApiAvailable = (): boolean => {
	return typeof navigator !== 'undefined' && !!navigator.clipboard
}

/**
 * Reads text from the clipboard, if supported by the browser.
 * @returns {Promise<string | null>} The clipboard text, or null if not available.
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
 */
export const copyElementTextToClipboard = async (element: Element): Promise<boolean> => {
	return await copyToClipboard(element.textContent || '')
}
/**
 * Copies a string to the clipboard, if supported by the browser.
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} True if the copy succeeded, false otherwise.
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
