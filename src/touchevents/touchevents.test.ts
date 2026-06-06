import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getTouchCount, getTouchPoints, isTouchEventsAvailable, onTouch } from '.'

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

describe('isTouchEventsAvailable', () => {
	it('returns true when TouchEvent exists on window', () => {
		setWindow({ TouchEvent: class {} })
		expect(isTouchEventsAvailable()).toBe(true)
	})

	it('returns false when TouchEvent is missing', () => {
		setWindow({})
		expect(isTouchEventsAvailable()).toBe(false)
	})

	it('returns false when window itself is undefined', () => {
		setWindow(undefined)
		expect(isTouchEventsAvailable()).toBe(false)
	})
})

describe('onTouch', () => {
	it('attaches listener and returns an unsubscribe function', () => {
		const addEventListener = vi.fn()
		const removeEventListener = vi.fn()
		const element = { addEventListener, removeEventListener } as unknown as Element
		const handler = vi.fn()

		const off = onTouch(element, 'touchstart', handler, { passive: true })

		expect(addEventListener).toHaveBeenCalledWith('touchstart', expect.any(Function), {
			passive: true,
		})

		off()
		expect(removeEventListener.mock.calls[0][0]).toBe('touchstart')
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

		onTouch(element, 'touchmove', handler)
		const fakeEvent = { touches: { length: 0 } } as unknown as Event
		registered?.(fakeEvent)

		expect(handler).toHaveBeenCalledWith(fakeEvent)
	})
})

describe('getTouchPoints', () => {
	it('returns {x, y} for every active touch', () => {
		const event = {
			touches: {
				length: 2,
				0: { clientX: 10, clientY: 20 },
				1: { clientX: 30, clientY: 40 },
			},
		} as unknown as TouchEvent

		expect(getTouchPoints(event)).toEqual([
			{ x: 10, y: 20 },
			{ x: 30, y: 40 },
		])
	})

	it('returns an empty array when there are no active touches', () => {
		const event = { touches: { length: 0 } } as unknown as TouchEvent
		expect(getTouchPoints(event)).toEqual([])
	})
})

describe('getTouchCount', () => {
	it('returns touches.length', () => {
		const event = { touches: { length: 3 } } as unknown as TouchEvent
		expect(getTouchCount(event)).toBe(3)
	})

	it('returns 0 when no active touches', () => {
		const event = { touches: { length: 0 } } as unknown as TouchEvent
		expect(getTouchCount(event)).toBe(0)
	})
})
