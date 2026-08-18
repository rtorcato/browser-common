// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { disconnectResizeObserver, observeResize, observeResizeOnce } from '../resizeobserver/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

/**
 * A ResizeObserver stand-in whose `disconnect` really stops delivery, so
 * "fires once then unhooks" is an assertion about the module, not the fake.
 */
function stubResizeObserver() {
	const observed: { target: unknown; options: unknown }[] = []
	let disconnects = 0
	let live: FakeObserver | undefined

	class FakeObserver {
		disconnected = false
		constructor(public callback: ResizeObserverCallback) {
			live = this
		}
		observe(target: unknown, options: unknown) {
			observed.push({ target, options })
		}
		disconnect() {
			this.disconnected = true
			disconnects += 1
		}
	}

	vi.stubGlobal('ResizeObserver', FakeObserver)

	return {
		observed,
		disconnectCount: () => disconnects,
		emit: (entries: ResizeObserverEntry[]) => {
			if (!live || live.disconnected) return
			live.callback(entries, live as unknown as ResizeObserver)
		},
	}
}

const element = {} as Element
const entry = { contentRect: { width: 320 } } as unknown as ResizeObserverEntry

describe('resizeobserver', () => {
	it('observeResize observes the element, with no options unless given', () => {
		const fake = stubResizeObserver()
		observeResize(element, vi.fn())
		expect(fake.observed).toEqual([{ target: element, options: undefined }])
	})

	it('observeResize passes the box option straight through', () => {
		const fake = stubResizeObserver()
		const options: ResizeObserverOptions = { box: 'border-box' }
		observeResize(element, vi.fn(), options)
		expect(fake.observed).toEqual([{ target: element, options }])
	})

	it('observeResize forwards entries to the caller and keeps observing', () => {
		const fake = stubResizeObserver()
		const callback = vi.fn()
		observeResize(element, callback)
		fake.emit([entry])
		fake.emit([entry])
		expect(callback).toHaveBeenCalledTimes(2)
		expect(callback).toHaveBeenCalledWith([entry], expect.anything())
		expect(fake.disconnectCount()).toBe(0)
	})

	it('observeResizeOnce fires once and then disconnects itself', () => {
		const fake = stubResizeObserver()
		const callback = vi.fn()
		observeResizeOnce(element, callback)
		fake.emit([entry])
		fake.emit([entry])
		expect(callback).toHaveBeenCalledTimes(1)
		expect(callback).toHaveBeenCalledWith([entry], expect.anything())
		expect(fake.disconnectCount()).toBe(1)
	})

	it('disconnectResizeObserver disconnects the observer it is handed', () => {
		const fake = stubResizeObserver()
		disconnectResizeObserver(observeResize(element, vi.fn()))
		expect(fake.disconnectCount()).toBe(1)
	})
})
