// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getTouchCount,
	getTouchPoints,
	isTouchEventsAvailable,
	onTouch,
} from '../touchevents/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

const touchEvent = (points: { clientX: number; clientY: number }[]) =>
	({ touches: points }) as unknown as TouchEvent

describe('touchevents', () => {
	it('isTouchEventsAvailable reflects window.TouchEvent presence', () => {
		expect(isTouchEventsAvailable()).toBe(false)
		vi.stubGlobal('window', { TouchEvent: class {} })
		expect(isTouchEventsAvailable()).toBe(true)
	})

	it('getTouchPoints maps active touches to {x, y}', () => {
		const e = touchEvent([
			{ clientX: 10, clientY: 20 },
			{ clientX: 30, clientY: 40 },
		])
		expect(getTouchPoints(e)).toEqual([
			{ x: 10, y: 20 },
			{ x: 30, y: 40 },
		])
	})

	it('getTouchCount counts active touches', () => {
		expect(getTouchCount(touchEvent([]))).toBe(0)
		expect(getTouchCount(touchEvent([{ clientX: 0, clientY: 0 }]))).toBe(1)
	})

	it('onTouch attaches and detaches the same wrapped listener', () => {
		const add = vi.fn()
		const remove = vi.fn()
		const element = { addEventListener: add, removeEventListener: remove } as unknown as Element
		const off = onTouch(element, 'touchmove', () => {}, { passive: true })
		expect(add).toHaveBeenCalledWith('touchmove', expect.any(Function), { passive: true })
		const wrapped = add.mock.calls[0]?.[1]
		off()
		expect(remove).toHaveBeenCalledWith('touchmove', wrapped, { passive: true })
	})
})
