import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
	disconnectIntersectionObserver,
	observeIntersection,
	observeOnce,
	unobserveIntersection,
} from '.'

class MockIntersectionObserver {
	observe = vi.fn()
	unobserve = vi.fn()
	disconnect = vi.fn()
	callback: IntersectionObserverCallback
	options?: IntersectionObserverInit

	constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
		this.callback = callback
		this.options = options
		instances.push(this)
	}
}

let instances: MockIntersectionObserver[]
let originalIO: typeof IntersectionObserver | undefined

beforeEach(() => {
	instances = []
	originalIO = (globalThis as { IntersectionObserver?: typeof IntersectionObserver })
		.IntersectionObserver

	Object.defineProperty(globalThis, 'IntersectionObserver', {
		value: MockIntersectionObserver,
		configurable: true,
		writable: true,
	})
})

afterEach(() => {
	Object.defineProperty(globalThis, 'IntersectionObserver', {
		value: originalIO,
		configurable: true,
		writable: true,
	})
})

const fakeElement = {} as Element

describe('observeIntersection', () => {
	it('constructs an IntersectionObserver with the callback + options and starts observing', () => {
		const callback = vi.fn()
		const options: IntersectionObserverInit = { threshold: 0.5 }

		const observer = observeIntersection(fakeElement, callback, options)

		expect(instances).toHaveLength(1)
		expect(instances[0].callback).toBe(callback)
		expect(instances[0].options).toBe(options)
		expect(instances[0].observe).toHaveBeenCalledWith(fakeElement)
		expect(observer).toBe(instances[0])
	})
})

describe('unobserveIntersection', () => {
	it('calls observer.unobserve(element)', () => {
		const observer = observeIntersection(fakeElement, vi.fn())
		unobserveIntersection(observer, fakeElement)
		expect(instances[0].unobserve).toHaveBeenCalledWith(fakeElement)
	})
})

describe('disconnectIntersectionObserver', () => {
	it('calls observer.disconnect()', () => {
		const observer = observeIntersection(fakeElement, vi.fn())
		disconnectIntersectionObserver(observer)
		expect(instances[0].disconnect).toHaveBeenCalledOnce()
	})
})

describe('observeOnce', () => {
	it('runs the user callback and disconnects after the first intersection', () => {
		const callback = vi.fn()

		observeOnce(fakeElement, callback)
		const inst = instances[0]

		expect(inst.observe).toHaveBeenCalledWith(fakeElement)
		expect(inst.disconnect).not.toHaveBeenCalled()

		const entries = [{ isIntersecting: true } as IntersectionObserverEntry]
		inst.callback(entries, inst as unknown as IntersectionObserver)

		expect(callback).toHaveBeenCalledWith(entries, inst)
		expect(inst.disconnect).toHaveBeenCalledOnce()
	})
})
