/**
 * Checks if the URLPattern API is available in the current environment.
 * @returns {boolean} True if available, false otherwise.
 * @example
 * ```ts
 * import { isURLPatternAvailable } from '@rtorcato/browser-common/urlpattern'
 * if (isURLPatternAvailable()) useNativeRouter()
 * ```
 */
export function isURLPatternAvailable(): boolean {
	return typeof globalThis !== 'undefined' && 'URLPattern' in globalThis
}

/**
 * Creates a URLPattern for matching URLs.
 * @param input The pattern input (string or URLPatternInit).
 * @param baseURL Optional base URL when `input` is a relative string.
 * @returns A URLPattern instance.
 * @throws If URLPattern is unsupported in the current environment.
 * @example
 * ```ts
 * import { createURLPattern } from '@rtorcato/browser-common/urlpattern'
 * const pattern = createURLPattern({ pathname: '/users/:id' })
 * const match = pattern.exec('https://example.com/users/42')
 * ```
 */
export function createURLPattern(input: URLPatternInput, baseURL?: string): URLPattern {
	if (!isURLPatternAvailable()) {
		throw new Error('createURLPattern requires an environment with URLPattern support')
	}
	return baseURL === undefined ? new URLPattern(input) : new URLPattern(input, baseURL)
}

/**
 * Tests whether a URL matches a pattern, returning the match result or null.
 * @param pattern The pattern input (string or URLPatternInit).
 * @param input The URL to test.
 * @returns The URLPatternResult if it matches, otherwise null.
 * @throws If URLPattern is unsupported in the current environment.
 * @example
 * ```ts
 * import { matchURLPattern } from '@rtorcato/browser-common/urlpattern'
 * const result = matchURLPattern({ pathname: '/users/:id' }, 'https://example.com/users/42')
 * result?.pathname.groups.id // '42'
 * ```
 */
export function matchURLPattern(pattern: URLPatternInput, input: string): URLPatternResult | null {
	return createURLPattern(pattern).exec(input)
}
