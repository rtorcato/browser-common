/**
 * Shows a browser alert dialog with a message.
 * @param message The message to display.
 */
export function showAlert(message: string): void {
	window.alert(message)
}

/**
 * Shows a browser confirm dialog and returns true if the user clicks OK.
 * @param message The message to display.
 * @returns {boolean} True if OK was clicked, false if Cancel.
 */
export function showConfirm(message: string): boolean {
	return window.confirm(message)
}

/**
 * Shows a browser prompt dialog and returns the user input or null if cancelled.
 * @param message The message to display.
 * @param defaultValue The default value for the input (optional).
 * @returns {string | null} The user input or null.
 */
export function showPrompt(message: string, defaultValue?: string): string | null {
	return window.prompt(message, defaultValue)
}
