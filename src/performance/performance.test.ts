import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getPerformanceEntriesByType, isPerformanceApiAvailable, mark, measure, now } from './index'

describe('performance', () => {
	let originalWindow: Window & typeof globalThis

	beforeEach(() => {
		originalWindow = globalThis.window
		globalThis.window = Object.create(originalWindow)
		globalThis.window.performance = {
			now: vi.fn(() => 123.45),
			getEntriesByType: vi.fn(() => [{ name: 'foo', entryType: 'measure' }]),
			mark: vi.fn(),
			measure: vi.fn(),
		} as unknown as Performance
	})

	afterEach(() => {
		globalThis.window = originalWindow
	})

	it('should detect Performance API support', () => {
		expect(isPerformanceApiAvailable()).toBe(true)
		// @ts-expect-error
		// biome-ignore lint/performance/noDelete: <explanation>
		delete globalThis.window.performance
		expect(isPerformanceApiAvailable()).toBe(false)
	})

	it('should return high-resolution timestamp if available', () => {
		expect(now()).toBe(123.45)
		// @ts-expect-error
		// biome-ignore lint/performance/noDelete: <explanation>
		delete globalThis.window.performance
		const dateNow = Date.now()
		expect(now()).toBeGreaterThanOrEqual(dateNow)
	})

	it('should get performance entries by type', () => {
		expect(getPerformanceEntriesByType('measure')).toEqual([{ name: 'foo', entryType: 'measure' }])
		// @ts-expect-error
		globalThis.window.performance.getEntriesByType = undefined
		expect(getPerformanceEntriesByType('measure')).toEqual([])
	})

	it('should mark and measure if supported', () => {
		const markMock = globalThis.window.performance.mark as (name: string) => void
		const measureMock = globalThis.window.performance.measure as (
			name: string,
			start: string,
			end: string
		) => void
		mark('test-mark')
		expect(markMock).toHaveBeenCalledWith('test-mark')
		measure('test-measure', 'start', 'end')
		expect(measureMock).toHaveBeenCalledWith('test-measure', 'start', 'end')
	})
})
