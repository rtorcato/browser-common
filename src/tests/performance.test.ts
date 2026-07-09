// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getPerformanceEntriesByType,
	isPerformanceApiAvailable,
	mark,
	measure,
	now,
} from '../performance/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function stubPerformance() {
	const perf = {
		now: vi.fn().mockReturnValue(123.4),
		getEntriesByType: vi.fn().mockReturnValue([{ name: 'x' }]),
		mark: vi.fn(),
		measure: vi.fn(),
	}
	vi.stubGlobal('window', { performance: perf })
	return perf
}

describe('performance', () => {
	it('isPerformanceApiAvailable reflects window.performance presence', () => {
		expect(isPerformanceApiAvailable()).toBe(false)
		stubPerformance()
		expect(isPerformanceApiAvailable()).toBe(true)
	})

	it('now uses performance.now when available', () => {
		stubPerformance()
		expect(now()).toBe(123.4)
	})

	it('now falls back to a numeric timestamp without window', () => {
		expect(typeof now()).toBe('number')
	})

	it('getPerformanceEntriesByType delegates, else returns an empty array', () => {
		expect(getPerformanceEntriesByType('resource')).toEqual([])
		const perf = stubPerformance()
		expect(getPerformanceEntriesByType('resource')).toEqual([{ name: 'x' }])
		expect(perf.getEntriesByType).toHaveBeenCalledWith('resource')
	})

	it('mark / measure delegate to the performance timeline', () => {
		const perf = stubPerformance()
		mark('boot-start')
		measure('work', 'start', 'end')
		expect(perf.mark).toHaveBeenCalledWith('boot-start')
		expect(perf.measure).toHaveBeenCalledWith('work', 'start', 'end')
	})
})
