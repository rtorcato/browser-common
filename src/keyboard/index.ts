/**
 * Checks if a KeyboardEvent matches a given key (case-insensitive).
 * @param event The KeyboardEvent.
 * @param key The key to check (e.g., 'Enter', 'a').
 * @returns {boolean}
 * @example
 * ```ts
 * import { isKey } from '@rtorcato/browser-common/keyboard'
 * input.addEventListener('keydown', (e) => { if (isKey(e, 'Enter')) submit() })
 * ```
 */
export function isKey(event: KeyboardEvent, key: string): boolean {
	return event.key.toLowerCase() === key.toLowerCase()
}

/**
 * Checks if a KeyboardEvent is a modifier key (Shift, Ctrl, Alt, Meta).
 * @param event The KeyboardEvent.
 * @returns {boolean}
 * @example
 * ```ts
 * import { isModifierKey } from '@rtorcato/browser-common/keyboard'
 * window.addEventListener('keydown', (e) => { if (!isModifierKey(e)) handle(e) })
 * ```
 */
export function isModifierKey(event: KeyboardEvent): boolean {
	return (
		event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta'
	)
}

/**
 * Returns true if the event is a printable character (not a control or modifier key).
 * @param event The KeyboardEvent.
 * @returns {boolean}
 * @example
 * ```ts
 * import { isPrintableKey } from '@rtorcato/browser-common/keyboard'
 * input.addEventListener('keydown', (e) => { if (isPrintableKey(e)) typeChar(e.key) })
 * ```
 */
export function isPrintableKey(event: KeyboardEvent): boolean {
	return event.key.length === 1 && !event.ctrlKey && !event.metaKey
}

/**
 * Adds a keyboard shortcut listener to an element or the window.
 * @param keys Array of keys (e.g., ['Control', 's'])
 * @param callback Function to call when shortcut is pressed.
 * @param target The event target (default: window).
 * @returns {() => void} Unsubscribe function.
 * @example
 * ```ts
 * import { onShortcut } from '@rtorcato/browser-common/keyboard'
 * const off = onShortcut(['Control', 's'], (e) => { e.preventDefault(); save() })
 * off()
 * ```
 */
export function onShortcut(
	keys: string[],
	callback: (event: KeyboardEvent) => void,
	target: Window | HTMLElement = window
): () => void {
	const pressed = new Set<string>()
	function down(e: Event) {
		if (e instanceof KeyboardEvent) {
			pressed.add(e.key.toLowerCase())
			if (keys.every((k) => pressed.has(k.toLowerCase()))) {
				callback(e)
			}
		}
	}
	function up(e: Event) {
		if (e instanceof KeyboardEvent) {
			pressed.delete(e.key.toLowerCase())
		}
	}
	target.addEventListener('keydown', down)
	target.addEventListener('keyup', up)
	return () => {
		target.removeEventListener('keydown', down)
		target.removeEventListener('keyup', up)
	}
}

/**
 * Prevents default action for a given key (e.g., prevent form submit on Enter).
 * @param key The key to prevent.
 * @param target The event target (default: window).
 * @returns {() => void} Unsubscribe function.
 * @example
 * ```ts
 * import { preventKeyDefault } from '@rtorcato/browser-common/keyboard'
 * const off = preventKeyDefault('Enter', input)
 * off()
 * ```
 */
export function preventKeyDefault(key: string, target: Window | HTMLElement = window): () => void {
	function handler(e: Event) {
		if (e instanceof KeyboardEvent && isKey(e, key)) {
			e.preventDefault()
		}
	}
	target.addEventListener('keydown', handler)
	return () => target.removeEventListener('keydown', handler)
}
