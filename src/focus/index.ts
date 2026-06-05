/**
 * Focuses the first focusable element within a container.
 * @param container The container element to search within.
 * @returns {boolean} True if an element was focused, false otherwise.
 * @example
 * ```ts
 * import { focusFirst } from '@rtorcato/browser-common/focus'
 * focusFirst(dialog)
 * ```
 */
export function focusFirst(container: HTMLElement): boolean {
	const focusable = container.querySelector<HTMLElement>(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	)
	if (focusable) {
		focusable.focus()
		return true
	}
	return false
}

/**
 * Focuses the last focusable element within a container.
 * @param container The container element to search within.
 * @returns {boolean} True if an element was focused, false otherwise.
 * @example
 * ```ts
 * import { focusLast } from '@rtorcato/browser-common/focus'
 * focusLast(dialog)
 * ```
 */
export function focusLast(container: HTMLElement): boolean {
	const focusables = container.querySelectorAll<HTMLElement>(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	)
	if (focusables.length) {
		const last = focusables[focusables.length - 1]
		if (last) {
			last.focus()
			return true
		}
	}
	return false
}

/**
 * Focuses the next focusable element after the currently focused element within a container.
 * @param container The container element to search within.
 * @returns {boolean} True if an element was focused, false otherwise.
 * @example
 * ```ts
 * import { focusNext } from '@rtorcato/browser-common/focus'
 * focusNext(form)
 * ```
 */
export function focusNext(container: HTMLElement): boolean {
	const focusables = Array.from(
		container.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
	)
	const index = focusables.indexOf(document.activeElement as HTMLElement)
	if (index > -1 && index < focusables.length - 1) {
		const next = focusables[index + 1]
		if (next) {
			next.focus()
			return true
		}
	}
	return false
}

/**
 * Focuses the previous focusable element before the currently focused element within a container.
 * @param container The container element to search within.
 * @returns {boolean} True if an element was focused, false otherwise.
 * @example
 * ```ts
 * import { focusPrev } from '@rtorcato/browser-common/focus'
 * focusPrev(form)
 * ```
 */
export function focusPrev(container: HTMLElement): boolean {
	const focusables = Array.from(
		container.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		)
	)
	const index = focusables.indexOf(document.activeElement as HTMLElement)
	if (index > 0) {
		const prev = focusables[index - 1]
		if (prev) {
			prev.focus()
			return true
		}
	}
	return false
}

/**
 * Sets focus to a specific element by selector within a container.
 * @param container The container element to search within.
 * @param selector The CSS selector for the element to focus.
 * @returns {boolean} True if an element was focused, false otherwise.
 * @example
 * ```ts
 * import { focusBySelector } from '@rtorcato/browser-common/focus'
 * focusBySelector(form, 'input[name="email"]')
 * ```
 */
export function focusBySelector(container: HTMLElement, selector: string): boolean {
	const el = container.querySelector<HTMLElement>(selector)
	if (el) {
		el.focus()
		return true
	}
	return false
}
