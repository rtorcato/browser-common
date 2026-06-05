/**
 * Checks if a given element is an iframe.
 * @param el The element to check.
 * @returns {boolean}
 * @example
 * ```ts
 * import { isIframe } from '@rtorcato/browser-common/iframe'
 * if (isIframe(el)) console.log(el.src)
 * ```
 */

export function isIframe(el: unknown): el is HTMLIFrameElement {
	return el instanceof HTMLIFrameElement
}

/**
 * Returns the contentWindow of an iframe, or null if not available.
 * @param iframe The iframe element.
 * @returns {Window|null}
 * @example
 * ```ts
 * import { getIframeWindow } from '@rtorcato/browser-common/iframe'
 * const win = getIframeWindow(iframe)
 * ```
 */
export function getIframeWindow(iframe: HTMLIFrameElement): Window | null {
	return iframe?.contentWindow ?? null
}

/**
 * Returns the contentDocument of an iframe, or null if not available.
 * @param iframe The iframe element.
 * @returns {Document|null}
 * @example
 * ```ts
 * import { getIframeDocument } from '@rtorcato/browser-common/iframe'
 * const doc = getIframeDocument(iframe)
 * ```
 */
export function getIframeDocument(iframe: HTMLIFrameElement): Document | null {
	return iframe?.contentDocument ?? null
}

/**
 * Posts a message to the iframe's contentWindow.
 * @param iframe The iframe element.
 * @param message The message to send.
 * @param targetOrigin The target origin (default: '*').
 * @example
 * ```ts
 * import { postMessageToIframe } from '@rtorcato/browser-common/iframe'
 * postMessageToIframe(iframe, { type: 'ping' }, 'https://example.com')
 * ```
 */
export function postMessageToIframe(
	iframe: HTMLIFrameElement,
	message: unknown,
	targetOrigin: string = '*'
): void {
	const win = getIframeWindow(iframe)
	if (win) {
		win.postMessage(message, targetOrigin)
	}
}

/**
 * Sets the src of an iframe safely.
 * @param iframe The iframe element.
 * @param url The URL to set as src.
 * @example
 * ```ts
 * import { setIframeSrc } from '@rtorcato/browser-common/iframe'
 * setIframeSrc(iframe, '/embed.html')
 * ```
 */
export function setIframeSrc(iframe: HTMLIFrameElement, url: string): void {
	iframe.src = url
}

/**
 * Reloads the iframe content.
 * @param iframe The iframe element.
 * @example
 * ```ts
 * import { reloadIframe } from '@rtorcato/browser-common/iframe'
 * reloadIframe(iframe)
 * ```
 */
export function reloadIframe(iframe: HTMLIFrameElement): void {
	const win = getIframeWindow(iframe)
	if (win) {
		win.location.reload()
	} else {
		// fallback: reset src
		const src = iframe.src
		iframe.src = ''
		iframe.src = src
	}
}

/**
 * Returns true if the iframe is loaded (readyState is 'complete').
 * @param iframe The iframe element.
 * @returns {boolean}
 * @example
 * ```ts
 * import { isIframeLoaded } from '@rtorcato/browser-common/iframe'
 * if (isIframeLoaded(iframe)) handleReady()
 * ```
 */
export function isIframeLoaded(iframe: HTMLIFrameElement): boolean {
	const doc = getIframeDocument(iframe)
	return !!doc && doc.readyState === 'complete'
}

/**
 * Adds a load event listener to the iframe.
 * @param iframe The iframe element.
 * @param callback The function to call when loaded.
 * @example
 * ```ts
 * import { onIframeLoad } from '@rtorcato/browser-common/iframe'
 * onIframeLoad(iframe, () => console.log('loaded'))
 * ```
 */
export function onIframeLoad(iframe: HTMLIFrameElement, callback: () => void): void {
	iframe.addEventListener('load', callback)
}
