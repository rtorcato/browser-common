// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getIframeDocument,
	getIframeWindow,
	isIframe,
	isIframeLoaded,
	onIframeLoad,
	postMessageToIframe,
	reloadIframe,
	setIframeSrc,
} from '../iframe/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('iframe', () => {
	it('isIframe checks against the HTMLIFrameElement global', () => {
		class FakeHTMLIFrameElement {}
		vi.stubGlobal('HTMLIFrameElement', FakeHTMLIFrameElement)
		expect(isIframe(new FakeHTMLIFrameElement())).toBe(true)
		expect(isIframe({})).toBe(false)
	})

	it('getIframeWindow / getIframeDocument return the content refs or null', () => {
		const win = {} as Window
		const doc = {} as Document
		expect(getIframeWindow({ contentWindow: win } as HTMLIFrameElement)).toBe(win)
		expect(getIframeDocument({ contentDocument: doc } as HTMLIFrameElement)).toBe(doc)
		expect(getIframeWindow({ contentWindow: null } as HTMLIFrameElement)).toBeNull()
	})

	it('postMessageToIframe forwards to the content window', () => {
		const postMessage = vi.fn()
		const iframe = { contentWindow: { postMessage } } as unknown as HTMLIFrameElement
		postMessageToIframe(iframe, { type: 'ping' }, 'https://e.com')
		expect(postMessage).toHaveBeenCalledWith({ type: 'ping' }, 'https://e.com')
	})

	it('setIframeSrc sets the src', () => {
		const iframe = { src: '' } as HTMLIFrameElement
		setIframeSrc(iframe, '/embed.html')
		expect(iframe.src).toBe('/embed.html')
	})

	it('isIframeLoaded is true only when the content document is complete', () => {
		expect(
			isIframeLoaded({ contentDocument: { readyState: 'complete' } } as HTMLIFrameElement)
		).toBe(true)
		expect(
			isIframeLoaded({ contentDocument: { readyState: 'loading' } } as HTMLIFrameElement)
		).toBe(false)
		expect(isIframeLoaded({ contentDocument: null } as HTMLIFrameElement)).toBe(false)
	})

	it('onIframeLoad attaches a load listener', () => {
		const addEventListener = vi.fn()
		const cb = () => {}
		onIframeLoad({ addEventListener } as unknown as HTMLIFrameElement, cb)
		expect(addEventListener).toHaveBeenCalledWith('load', cb)
	})

	it('postMessageToIframe defaults targetOrigin to * and no-ops without a content window', () => {
		const postMessage = vi.fn()
		postMessageToIframe({ contentWindow: { postMessage } } as unknown as HTMLIFrameElement, 'hi')
		expect(postMessage).toHaveBeenCalledWith('hi', '*')

		expect(() =>
			postMessageToIframe({ contentWindow: null } as HTMLIFrameElement, 'hi')
		).not.toThrow()
	})

	it('getIframeWindow / getIframeDocument tolerate a missing iframe', () => {
		const missing = undefined as unknown as HTMLIFrameElement
		expect(getIframeWindow(missing)).toBeNull()
		expect(getIframeDocument(missing)).toBeNull()
		expect(isIframeLoaded(missing)).toBe(false)
	})

	it('reloadIframe reloads via the content window when present', () => {
		const reload = vi.fn()
		const iframe = {
			contentWindow: { location: { reload } },
			src: '/embed.html',
		} as unknown as HTMLIFrameElement
		reloadIframe(iframe)
		expect(reload).toHaveBeenCalledOnce()
		expect(iframe.src).toBe('/embed.html')
	})

	it('reloadIframe falls back to resetting src without a content window', () => {
		const assigned: string[] = []
		const iframe = {
			contentWindow: null,
			get src() {
				return assigned.at(-1) ?? '/embed.html'
			},
			set src(v: string) {
				assigned.push(v)
			},
		} as unknown as HTMLIFrameElement
		reloadIframe(iframe)
		expect(assigned).toEqual(['', '/embed.html'])
	})
})
