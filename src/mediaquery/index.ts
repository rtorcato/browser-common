/**
 * Checks if `window.matchMedia` is available in the current environment.
 * @returns {boolean} True if `matchMedia` exists, false otherwise.
 * @example
 * ```ts
 * import { isMediaQueryAvailable } from '@rtorcato/browser-common/mediaquery'
 * if (isMediaQueryAvailable()) applyResponsiveLayout()
 * ```
 */
export function isMediaQueryAvailable(): boolean {
	return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
}

/**
 * Checks whether a CSS media query currently matches.
 * @param query The media query, e.g. `'(min-width: 768px)'`.
 * @returns True or false, or null where `matchMedia` is unavailable.
 * @example
 * ```ts
 * import { matchesMedia } from '@rtorcato/browser-common/mediaquery'
 * if (matchesMedia('(min-width: 768px)')) showSidebar()
 * ```
 */
export function matchesMedia(query: string): boolean | null {
	return isMediaQueryAvailable() ? window.matchMedia(query).matches : null
}

/**
 * Listens for a CSS media query to start or stop matching.
 * @param query The media query to watch.
 * @param callback Called with the new `matches` value on each change.
 * @returns A function that removes the listener (a no-op where unsupported).
 * @example
 * ```ts
 * import { onMediaQueryChange } from '@rtorcato/browser-common/mediaquery'
 * const off = onMediaQueryChange('(min-width: 768px)', (matches) => setWide(matches))
 * off()
 * ```
 */
export function onMediaQueryChange(
	query: string,
	callback: (matches: boolean) => void
): () => void {
	if (!isMediaQueryAvailable()) return () => {}
	const mql = window.matchMedia(query)
	const handler = (e: MediaQueryListEvent) => callback(e.matches)
	// Safari < 14 only has the deprecated addListener/removeListener.
	if (typeof mql.addEventListener !== 'function') {
		mql.addListener(handler)
		return () => mql.removeListener(handler)
	}
	mql.addEventListener('change', handler)
	return () => mql.removeEventListener('change', handler)
}

/**
 * Checks whether the user prefers a dark color scheme.
 * @returns True or false, or null where `matchMedia` is unavailable.
 * @example
 * ```ts
 * import { prefersDarkMode } from '@rtorcato/browser-common/mediaquery'
 * if (prefersDarkMode()) document.documentElement.classList.add('dark')
 * ```
 */
export function prefersDarkMode(): boolean | null {
	return matchesMedia('(prefers-color-scheme: dark)')
}

/**
 * Checks whether the user has asked for reduced motion.
 * @returns True or false, or null where `matchMedia` is unavailable.
 * @example
 * ```ts
 * import { prefersReducedMotion } from '@rtorcato/browser-common/mediaquery'
 * if (!prefersReducedMotion()) playIntroAnimation()
 * ```
 */
export function prefersReducedMotion(): boolean | null {
	return matchesMedia('(prefers-reduced-motion: reduce)')
}
