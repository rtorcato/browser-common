/**
 * Shows a browser alert dialog with a message.
 * @param message The message to display.
 * @example
 * ```ts
 * import { showAlert } from '@rtorcato/browser-common/alert'
 * showAlert('Saved!')
 * ```
 */
export function showAlert(message: string): void {
	if (typeof window === 'undefined') {
		throw new Error('showAlert requires a browser environment')
	}
	window.alert(message)
}

/**
 * Shows a browser confirm dialog and returns true if the user clicks OK.
 * @param message The message to display.
 * @returns {boolean} True if OK was clicked, false if Cancel.
 * @example
 * ```ts
 * import { showConfirm } from '@rtorcato/browser-common/alert'
 * if (showConfirm('Delete item?')) deleteItem()
 * ```
 */
export function showConfirm(message: string): boolean {
	if (typeof window === 'undefined') {
		throw new Error('showConfirm requires a browser environment')
	}
	return window.confirm(message)
}

/**
 * Shows a browser prompt dialog and returns the user input or null if cancelled.
 * @param message The message to display.
 * @param defaultValue The default value for the input (optional).
 * @returns {string | null} The user input or null.
 * @example
 * ```ts
 * import { showPrompt } from '@rtorcato/browser-common/alert'
 * const name = showPrompt('Your name?', 'Anon')
 * ```
 */
export function showPrompt(message: string, defaultValue?: string): string | null {
	if (typeof window === 'undefined') {
		throw new Error('showPrompt requires a browser environment')
	}
	return window.prompt(message, defaultValue)
}
