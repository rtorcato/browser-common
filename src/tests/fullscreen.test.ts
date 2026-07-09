// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	enterFullscreen,
	exitFullscreen,
	isFullscreen,
	onFullscreenChange,
} from '../fullscreen/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubDocument(over: Record<string, unknown> = {}) {
	const documentElement = { requestFullscreen: vi.fn().mockResolvedValue(undefined) }
	const add = vi.fn()
	const remove = vi.fn()
	const doc = {
		documentElement,
		exitFullscreen: vi.fn().mockResolvedValue(undefined),
		fullscreenElement: null,
		addEventListener: add,
		removeEventListener: remove,
		...over,
	}
	vi.stubGlobal('document', doc)
	return { doc, documentElement, add, remove }
}

describe('fullscreen (browser present)', () => {
	it('enterFullscreen targets documentElement by default, or the given element', () => {
		const { documentElement } = stubDocument()
		enterFullscreen()
		expect(documentElement.requestFullscreen).toHaveBeenCalled()

		const el = { requestFullscreen: vi.fn().mockResolvedValue(undefined) } as never
		enterFullscreen(el)
		expect(
			(el as { requestFullscreen: ReturnType<typeof vi.fn> }).requestFullscreen
		).toHaveBeenCalled()
	})

	it('exitFullscreen delegates to document.exitFullscreen', () => {
		const { doc } = stubDocument()
		exitFullscreen()
		expect(doc.exitFullscreen).toHaveBeenCalled()
	})

	it('isFullscreen reflects document.fullscreenElement', () => {
		stubDocument({ fullscreenElement: null })
		expect(isFullscreen()).toBe(false)
		stubDocument({ fullscreenElement: {} })
		expect(isFullscreen()).toBe(true)
	})

	it('onFullscreenChange wires and unwires the event', () => {
		const { add, remove } = stubDocument()
		const cb = () => {}
		const off = onFullscreenChange(cb)
		expect(add).toHaveBeenCalledWith('fullscreenchange', cb)
		off()
		expect(remove).toHaveBeenCalledWith('fullscreenchange', cb)
	})
})

describe('fullscreen (SSR / no document)', () => {
	it('returns undefined and a safe remover without throwing', () => {
		expect(enterFullscreen()).toBeUndefined()
		expect(exitFullscreen()).toBeUndefined()
		expect(isFullscreen()).toBeUndefined()
		expect(() => onFullscreenChange(() => {})()).not.toThrow()
	})
})
