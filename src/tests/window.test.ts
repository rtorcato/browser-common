// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	blurWindow,
	closeWindow,
	focusWindow,
	getWindowSize,
	onWindowResize,
	openWindow,
	reloadWindow,
	scrollToBottom,
	scrollToTop,
} from '../window/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubWindow() {
	const win = {
		open: vi.fn().mockReturnValue(null),
		close: vi.fn(),
		focus: vi.fn(),
		blur: vi.fn(),
		scrollTo: vi.fn(),
		innerWidth: 1024,
		innerHeight: 768,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		location: { reload: vi.fn() },
	}
	vi.stubGlobal('window', win)
	vi.stubGlobal('document', { body: { scrollHeight: 5000 } })
	return win
}

describe('window', () => {
	it('openWindow forwards url/target/features', () => {
		const win = stubWindow()
		openWindow('https://e.com', '_blank', 'width=600')
		expect(win.open).toHaveBeenCalledWith('https://e.com', '_blank', 'width=600')
	})

	it('close / focus / blur / reload delegate to the window', () => {
		const win = stubWindow()
		closeWindow()
		focusWindow()
		blurWindow()
		reloadWindow()
		expect(win.close).toHaveBeenCalled()
		expect(win.focus).toHaveBeenCalled()
		expect(win.blur).toHaveBeenCalled()
		expect(win.location.reload).toHaveBeenCalled()
	})

	it('scrollToTop / scrollToBottom compute the target and behavior', () => {
		const win = stubWindow()
		scrollToTop('smooth')
		expect(win.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
		scrollToBottom()
		expect(win.scrollTo).toHaveBeenCalledWith({ top: 5000, behavior: 'auto' })
	})

	it('getWindowSize reads inner dimensions', () => {
		stubWindow()
		expect(getWindowSize()).toEqual({ width: 1024, height: 768 })
	})

	it('onWindowResize wires and unwires the resize event', () => {
		const win = stubWindow()
		const cb = () => {}
		const off = onWindowResize(cb)
		expect(win.addEventListener).toHaveBeenCalledWith('resize', cb)
		off()
		expect(win.removeEventListener).toHaveBeenCalledWith('resize', cb)
	})
})
