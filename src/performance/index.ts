/**
 * Checks if the Performance API is available in the current environment.
 * @example
 * ```ts
 * import { isPerformanceApiAvailable } from '@rtorcato/browser-common/performance'
 * if (isPerformanceApiAvailable()) trace()
 * ```
 */
export function isPerformanceApiAvailable(): boolean {
	return typeof globalThis.performance !== 'undefined'
}

/**
 * Returns the current high-resolution timestamp (in milliseconds).
 * Falls back to Date.now() if not available.
 * @example
 * ```ts
 * import { now } from '@rtorcato/browser-common/performance'
 * const start = now()
 * const elapsed = now() - start
 * ```
 */
export function now(): number {
	if (isPerformanceApiAvailable()) {
		return globalThis.performance.now()
	}
	return Date.now()
}

/**
 * Gets all performance entries of a given type (e.g., 'resource', 'mark', 'measure').
 * @param type The entry type.
 * @returns An array of PerformanceEntry objects, or an empty array if not supported.
 * @example
 * ```ts
 * import { getPerformanceEntriesByType } from '@rtorcato/browser-common/performance'
 * const resources = getPerformanceEntriesByType('resource')
 * ```
 */
export function getPerformanceEntriesByType(type: string): PerformanceEntry[] {
	if (
		isPerformanceApiAvailable() &&
		typeof globalThis.performance.getEntriesByType === 'function'
	) {
		return globalThis.performance.getEntriesByType(type)
	}
	return []
}

/**
 * Marks a named timestamp in the performance timeline.
 * @param name The mark name.
 * @example
 * ```ts
 * import { mark } from '@rtorcato/browser-common/performance'
 * mark('boot-start')
 * ```
 */
export function mark(name: string): void {
	if (isPerformanceApiAvailable() && typeof globalThis.performance.mark === 'function') {
		globalThis.performance.mark(name)
	}
}

/**
 * Measures the time between two marks.
 * @param name The measure name.
 * @param startMark The starting mark name.
 * @param endMark The ending mark name.
 * @example
 * ```ts
 * import { mark, measure } from '@rtorcato/browser-common/performance'
 * mark('start'); doWork(); mark('end')
 * measure('work', 'start', 'end')
 * ```
 */
export function measure(name: string, startMark: string, endMark: string): void {
	if (isPerformanceApiAvailable() && typeof globalThis.performance.measure === 'function') {
		globalThis.performance.measure(name, startMark, endMark)
	}
}
