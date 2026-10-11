// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	disconnectIntersectionObserver,
	observeIntersection,
	observeOnce,
	unobserveIntersection,
} from '../intersection/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('intersection', () => {
	it('observeIntersection creates an observer and observes an element', () => {
		const mockObserve = vi.fn()
		const mockObserver = { observe: mockObserve } as unknown as IntersectionObserver

		vi.stubGlobal(
			'IntersectionObserver',
			vi.fn(function (this: any) {
				return mockObserver
			})
		)

		const element = {} as Element
		observeIntersection(element, vi.fn())

		expect(mockObserve).toHaveBeenCalledWith(element)
	})

	it('unobserveIntersection stops observing an element', () => {
		const mockUnobserve = vi.fn()
		const mockObserver = { unobserve: mockUnobserve } as unknown as IntersectionObserver
		const element = {} as Element

		unobserveIntersection(mockObserver, element)

		expect(mockUnobserve).toHaveBeenCalledWith(element)
	})

	it('disconnectIntersectionObserver disconnects the observer', () => {
		const mockDisconnect = vi.fn()
		const mockObserver = { disconnect: mockDisconnect } as unknown as IntersectionObserver

		disconnectIntersectionObserver(mockObserver)

		expect(mockDisconnect).toHaveBeenCalled()
	})

	it('observeOnce fires callback and disconnects on first intersection', () => {
		const callback = vi.fn()
		let capturedCallback: IntersectionObserverCallback | null = null
		const mockDisconnect = vi.fn()

		vi.stubGlobal(
			'IntersectionObserver',
			vi.fn(function (this: any, cb: IntersectionObserverCallback) {
				capturedCallback = cb
				return {
					observe: vi.fn(),
					disconnect: mockDisconnect,
				}
			})
		)

		const element = {} as Element
		const observer = observeOnce(element, callback) as unknown as {
			disconnect: ReturnType<typeof vi.fn>
		}

		const entries = [{ isIntersecting: true }] as unknown as IntersectionObserverEntry[]
		const mockObs = observer as unknown as IntersectionObserver

		if (capturedCallback) {
			capturedCallback(entries, mockObs)
		}

		expect(callback).toHaveBeenCalledWith(entries, mockObs)
		expect(mockDisconnect).toHaveBeenCalled()
	})

	it('observeOnce does not fire callback on initial non-intersecting entry', () => {
		const callback = vi.fn()
		let capturedCallback: IntersectionObserverCallback | null = null
		const mockDisconnect = vi.fn()

		vi.stubGlobal(
			'IntersectionObserver',
			vi.fn(function (this: any, cb: IntersectionObserverCallback) {
				capturedCallback = cb
				return {
					observe: vi.fn(),
					disconnect: mockDisconnect,
				}
			})
		)

		const element = {} as Element
		observeOnce(element, callback)

		const entries = [{ isIntersecting: false }] as unknown as IntersectionObserverEntry[]
		const mockObs = {} as unknown as IntersectionObserver

		if (capturedCallback) {
			capturedCallback(entries, mockObs)
		}

		expect(callback).not.toHaveBeenCalled()
		expect(mockDisconnect).not.toHaveBeenCalled()
	})
})
