/**
 * Checks if the View Transitions API is supported in the current environment.
 * @returns {boolean} True if `document.startViewTransition` exists, false otherwise.
 * @example
 * ```ts
 * import { isViewTransitionsSupported } from '@rtorcato/browser-common/viewtransitions'
 * if (isViewTransitionsSupported()) enableFancyTransitions()
 * ```
 */
export function isViewTransitionsSupported(): boolean {
	return typeof document !== 'undefined' && typeof document.startViewTransition === 'function'
}

/**
 * Runs a DOM update inside a view transition when supported, otherwise runs it
 * directly. Always resolves once the update callback has completed, so callers
 * never need to branch on support.
 * @param updateCallback The DOM-mutating callback to run.
 * @returns A promise that resolves when the update has been applied.
 * @example
 * ```ts
 * import { startViewTransition } from '@rtorcato/browser-common/viewtransitions'
 * await startViewTransition(() => updateDOM())
 * ```
 */
export async function startViewTransition(
	updateCallback: () => void | Promise<void>
): Promise<void> {
	if (!isViewTransitionsSupported()) {
		await updateCallback()
		return
	}
	const transition = document.startViewTransition(updateCallback)
	// Wait for the DOM update to be applied; the animation itself may still run.
	await transition.updateCallbackDone
}
