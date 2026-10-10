// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isKey,
	isModifierKey,
	isPrintableKey,
	onShortcut,
	preventKeyDefault,
} from '../keyboard/index'

// Minimal KeyboardEvent stand-in — the module reads .key/.ctrlKey/.metaKey and
// uses `instanceof KeyboardEvent`, so instances must match the stubbed global.
class FakeKeyboardEvent {
	key: string
	ctrlKey: boolean
	metaKey: boolean
	preventDefault = vi.fn()
	constructor(init: { key: string; ctrlKey?: boolean; metaKey?: boolean }) {
		this.key = init.key
		this.ctrlKey = !!init.ctrlKey
		this.metaKey = !!init.metaKey
	}
}

const ke = (init: { key: string; ctrlKey?: boolean; metaKey?: boolean }) =>
	new FakeKeyboardEvent(init) as unknown as KeyboardEvent

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('keyboard predicates', () => {
	it('isKey compares case-insensitively', () => {
		expect(isKey(ke({ key: 'Enter' }), 'enter')).toBe(true)
		expect(isKey(ke({ key: 'a' }), 'b')).toBe(false)
	})

	it('isModifierKey detects the four modifiers', () => {
		expect(isModifierKey(ke({ key: 'Shift' }))).toBe(true)
		expect(isModifierKey(ke({ key: 'Meta' }))).toBe(true)
		expect(isModifierKey(ke({ key: 'a' }))).toBe(false)
	})

	it('isPrintableKey is true only for a single non-control char', () => {
		expect(isPrintableKey(ke({ key: 'a' }))).toBe(true)
		expect(isPrintableKey(ke({ key: 'a', ctrlKey: true }))).toBe(false)
		expect(isPrintableKey(ke({ key: 'Enter' }))).toBe(false)
	})
})

describe('keyboard subscriptions', () => {
	function fakeTarget() {
		const handlers: Record<string, (e: unknown) => void> = {}
		return {
			target: {
				addEventListener: (t: string, h: (e: unknown) => void) => {
					handlers[t] = h
				},
				removeEventListener: vi.fn(),
			} as unknown as HTMLElement,
			handlers,
		}
	}

	it('onShortcut fires only when every key is held down', () => {
		vi.stubGlobal('KeyboardEvent', FakeKeyboardEvent)
		vi.stubGlobal('window', {
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		} as unknown as Window)
		const { target, handlers } = fakeTarget()
		const cb = vi.fn()
		onShortcut(['Control', 's'], cb, target)

		handlers.keydown(new FakeKeyboardEvent({ key: 'Control' }))
		expect(cb).not.toHaveBeenCalled()
		handlers.keydown(new FakeKeyboardEvent({ key: 's' }))
		expect(cb).toHaveBeenCalledTimes(1)

		// releasing a key clears it from the combo
		handlers.keyup(new FakeKeyboardEvent({ key: 's' }))
		handlers.keydown(new FakeKeyboardEvent({ key: 'x' }))
		expect(cb).toHaveBeenCalledTimes(1)
	})

	it('preventKeyDefault calls preventDefault on the matching key', () => {
		vi.stubGlobal('KeyboardEvent', FakeKeyboardEvent)
		const { target, handlers } = fakeTarget()
		preventKeyDefault('Enter', target)
		const event = new FakeKeyboardEvent({ key: 'Enter' })
		handlers.keydown(event)
		expect(event.preventDefault).toHaveBeenCalled()
	})

	it('onShortcut clears pressed keys on window blur', () => {
		vi.stubGlobal('KeyboardEvent', FakeKeyboardEvent)
		const windowHandlers: Record<string, (e: unknown) => void> = {}
		const windowStub = {
			addEventListener: (t: string, h: (e: unknown) => void) => {
				windowHandlers[t] = h
			},
			removeEventListener: vi.fn(),
		} as unknown as Window
		vi.stubGlobal('window', windowStub)
		const targetHandlers: Record<string, (e: unknown) => void> = {}
		const target = {
			addEventListener: (t: string, h: (e: unknown) => void) => {
				targetHandlers[t] = h
			},
			removeEventListener: vi.fn(),
		} as unknown as HTMLElement
		const cb = vi.fn()
		onShortcut(['Control', 's'], cb, target)

		targetHandlers.keydown(new FakeKeyboardEvent({ key: 'Control' }))
		targetHandlers.keydown(new FakeKeyboardEvent({ key: 's' }))
		expect(cb).toHaveBeenCalledTimes(1)

		// blur event clears the pressed set
		if (windowHandlers.blur) {
			windowHandlers.blur({})
		}
		targetHandlers.keydown(new FakeKeyboardEvent({ key: 's' }))
		expect(cb).toHaveBeenCalledTimes(1)
	})

	it('onShortcut clears pressed keys on Meta keyup (macOS fix)', () => {
		vi.stubGlobal('KeyboardEvent', FakeKeyboardEvent)
		const windowStub = {
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		} as unknown as Window
		vi.stubGlobal('window', windowStub)
		const targetHandlers: Record<string, (e: unknown) => void> = {}
		const target = {
			addEventListener: (t: string, h: (e: unknown) => void) => {
				targetHandlers[t] = h
			},
			removeEventListener: vi.fn(),
		} as unknown as HTMLElement
		const cb = vi.fn()
		onShortcut(['Meta', 's'], cb, target)

		// Press Meta and s; callback fires
		targetHandlers.keydown(new FakeKeyboardEvent({ key: 'Meta' }))
		targetHandlers.keydown(new FakeKeyboardEvent({ key: 's' }))
		expect(cb).toHaveBeenCalledTimes(1)

		// Release Meta (on macOS, s may not have fired keyup while Meta was held)
		// This should clear the entire pressed set
		targetHandlers.keyup(new FakeKeyboardEvent({ key: 'Meta' }))

		// Now pressing Meta alone should not fire the callback
		// (s should no longer be in the pressed set)
		targetHandlers.keydown(new FakeKeyboardEvent({ key: 'Meta' }))
		expect(cb).toHaveBeenCalledTimes(1)
	})
})
