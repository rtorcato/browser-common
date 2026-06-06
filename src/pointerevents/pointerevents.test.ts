import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getPointerType, isPointerEventsAvailable, isPrimaryPointer, onPointer } from '.'

const setWindow = (value: unknown) => {
	Object.defineProperty(globalThis, 'window', {
		value,
		configurable: true,
		writable: true,
	})
}

let originalWindow: Window | undefined

beforeEach(() => {
	originalWindow = globalThis.window
})

afterEach(() => {
	setWindow(originalWindow)
})

describe('isPointerEventsAvailable', () => {
	it('returns true when PointerEvent exists on window', () => {
		setWindow({ PointerEvent: class {} })
		expect(isPointerEventsAvailable()).toBe(true)
	})

	it('returns false when PointerEvent is missing', () => {
		setWindow({})
		expect(isPointerEventsAvailable()).toBe(false)
	})

	it('returns false when window itself is undefined', () => {
		setWindow(undefined)
		expect(isPointerEventsAvailable()).toBe(false)
	})
})

describe('onPointer', () => {
	it('attaches listener and returns an unsubscribe function', () => {
		const addEventListener = vi.fn()
		const removeEventListener = vi.fn()
		const element = { addEventListener, removeEventListener } as unknown as Element
		const handler = vi.fn()

		const off = onPointer(element, 'pointerdown', handler)

		expect(addEventListener).toHaveBeenCalledOnce()
		expect(addEventListener).toHaveBeenCalledWith('pointerdown', expect.any(Function), undefined)

		off()
		expect(removeEventListener).toHaveBeenCalledOnce()
		expect(removeEventListener.mock.calls[0][0]).toBe('pointerdown')
	})

	it('forwards the underlying event to the handler', () => {
		let registered: ((e: Event) => void) | undefined
		const element = {
			addEventListener: (_: string, fn: (e: Event) => void) => {
				registered = fn
			},
			removeEventListener: vi.fn(),
		} as unknown as Element
		const handler = vi.fn()

		onPointer(element, 'pointermove', handler)
		const fakeEvent = { pointerType: 'pen' } as unknown as Event
		registered?.(fakeEvent)

		expect(handler).toHaveBeenCalledWith(fakeEvent)
	})
})

describe('getPointerType', () => {
	it('returns "mouse" / "pen" / "touch" for known types', () => {
		expect(getPointerType({ pointerType: 'mouse' } as PointerEvent)).toBe('mouse')
		expect(getPointerType({ pointerType: 'pen' } as PointerEvent)).toBe('pen')
		expect(getPointerType({ pointerType: 'touch' } as PointerEvent)).toBe('touch')
	})

	it('returns empty string for unknown pointer types', () => {
		expect(getPointerType({ pointerType: 'weird' } as unknown as PointerEvent)).toBe('')
		expect(getPointerType({ pointerType: '' } as PointerEvent)).toBe('')
	})
})

describe('isPrimaryPointer', () => {
	it('returns true when event.isPrimary is true', () => {
		expect(isPrimaryPointer({ isPrimary: true } as PointerEvent)).toBe(true)
	})

	it('returns false otherwise', () => {
		expect(isPrimaryPointer({ isPrimary: false } as PointerEvent)).toBe(false)
		expect(isPrimaryPointer({} as PointerEvent)).toBe(false)
	})
})
