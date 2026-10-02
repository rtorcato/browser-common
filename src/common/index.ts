/**
 * Checks if the code is running in a browser environment.
 * @returns {boolean} True if running in a browser, false otherwise.
 */
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

/**
 * Returns the browser's user agent string, if available.
 * @returns {string | null} The user agent string or null if not in a browser.
 */
export const getUserAgent = (): string | null => {
	return typeof navigator !== 'undefined' ? navigator.userAgent : null
}

/**
 * Detects if the user is on a mobile device.
 * @returns {boolean} True if the user agent is a mobile device, false otherwise.
 */
export const isMobile = (): boolean => {
	return typeof navigator !== 'undefined'
		? /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		: false
}

/**
 * Returns the browser's preferred language, if available.
 * @returns {string | null} The preferred language or null if not in a browser.
 */
export const getBrowserLanguage = (): string | null => {
	return typeof navigator !== 'undefined' ? navigator.language : null
}

export type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'linux' | 'unknown'

/**
 * Detects the operating system platform. Prefers `navigator.userAgentData.platform`, then
 * falls back to the user agent, checking iOS and Android before macOS and Linux (an iPhone UA
 * says "like Mac OS X", an Android UA says "Linux"). iPadOS 13+ sends a Mac UA, so a Mac UA
 * with touch points is reported as iOS.
 * @returns {Platform} The platform, or 'unknown' outside a browser.
 */
export const getPlatform = (): Platform => {
	if (typeof navigator === 'undefined') return 'unknown'
	const hint = (
		navigator as Navigator & { userAgentData?: { platform?: string } }
	).userAgentData?.platform?.toLowerCase()
	if (hint === 'ios' || hint === 'android' || hint === 'windows' || hint === 'linux') return hint
	if (hint === 'macos') return 'macos'
	const ua = navigator.userAgent ?? ''
	if (/iPhone|iPad|iPod/.test(ua)) return 'ios'
	if (/Android/.test(ua)) return 'android'
	if (/Mac/.test(ua)) return navigator.maxTouchPoints > 1 ? 'ios' : 'macos'
	if (/Windows/.test(ua)) return 'windows'
	if (/Linux/.test(ua)) return 'linux'
	return 'unknown'
}

/** @returns {boolean} True on iOS or iPadOS. */
export const isIOS = (): boolean => getPlatform() === 'ios'

/** @returns {boolean} True on Android. */
export const isAndroid = (): boolean => getPlatform() === 'android'
