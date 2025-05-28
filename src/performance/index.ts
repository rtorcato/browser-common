/**
 * Checks if the Performance API is available in the current environment.
 */
export function isPerformanceApiAvailable(): boolean {
	return typeof window !== 'undefined' && 'performance' in window
}

/**
 * Returns the current high-resolution timestamp (in milliseconds).
 * Falls back to Date.now() if not available.
 */
export function now(): number {
	if (isPerformanceApiAvailable()) {
		return window.performance.now()
	}
	return Date.now()
}

/**
 * Gets all performance entries of a given type (e.g., 'resource', 'mark', 'measure').
 * @param type The entry type.
 * @returns An array of PerformanceEntry objects, or an empty array if not supported.
 */
export function getPerformanceEntriesByType(type: string): PerformanceEntry[] {
	if (isPerformanceApiAvailable() && typeof window.performance.getEntriesByType === 'function') {
		return window.performance.getEntriesByType(type)
	}
	return []
}

/**
 * Marks a named timestamp in the performance timeline.
 * @param name The mark name.
 */
export function mark(name: string): void {
	if (isPerformanceApiAvailable() && typeof window.performance.mark === 'function') {
		window.performance.mark(name)
	}
}

/**
 * Measures the time between two marks.
 * @param name The measure name.
 * @param startMark The starting mark name.
 * @param endMark The ending mark name.
 */
export function measure(name: string, startMark: string, endMark: string): void {
	if (isPerformanceApiAvailable() && typeof window.performance.measure === 'function') {
		window.performance.measure(name, startMark, endMark)
	}
}
