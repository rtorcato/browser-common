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
	vi.stubGlobal('performance', perf)
	return perf
}

describe('performance', () => {
	it('isPerformanceApiAvailable reflects globalThis.performance presence', () => {
		expect(isPerformanceApiAvailable()).toBe(true)
		vi.stubGlobal('performance', undefined)
		expect(isPerformanceApiAvailable()).toBe(false)
	})

	it('now uses performance.now when available', () => {
		stubPerformance()
		expect(now()).toBe(123.4)
	})

	it('now uses page-relative time in Node, not epoch ms', () => {
		expect(now()).toBeLessThan(Date.now() / 2)
	})

	it('now falls back to Date.now without performance', () => {
		vi.stubGlobal('performance', undefined)
		expect(now()).toBeGreaterThanOrEqual(Date.now() - 1000)
	})

	it('getPerformanceEntriesByType delegates, else returns an empty array', () => {
		vi.stubGlobal('performance', undefined)
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
