// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	disconnectMutationObserver,
	observeMutationOnce,
	observeMutations,
} from '../mutationobserver/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

/**
 * A MutationObserver stand-in whose `disconnect` really stops delivery, so
 * "fires once then unhooks" is an assertion about the module, not the fake.
 */
function stubMutationObserver() {
	const observed: { target: unknown; options: unknown }[] = []
	let disconnects = 0
	let live: FakeObserver | undefined

	class FakeObserver {
		disconnected = false
		constructor(public callback: MutationCallback) {
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

	vi.stubGlobal('MutationObserver', FakeObserver)

	return {
		observed,
		disconnectCount: () => disconnects,
		emit: (records: MutationRecord[]) => {
			if (!live || live.disconnected) return
			live.callback(records, live as unknown as MutationObserver)
		},
	}
}

const node = {} as Node
const record = { type: 'childList' } as unknown as MutationRecord

describe('mutationobserver', () => {
	it('observeMutations observes the node with the documented default options', () => {
		const fake = stubMutationObserver()
		observeMutations(node, vi.fn())
		expect(fake.observed).toEqual([{ target: node, options: { childList: true, subtree: true } }])
	})

	it('observeMutations passes explicit options straight through', () => {
		const fake = stubMutationObserver()
		const options = { attributes: true, attributeFilter: ['class'] }
		observeMutations(node, vi.fn(), options)
		expect(fake.observed).toEqual([{ target: node, options }])
	})

	it('observeMutations forwards records to the caller and keeps observing', () => {
		const fake = stubMutationObserver()
		const callback = vi.fn()
		observeMutations(node, callback)
		fake.emit([record])
		fake.emit([record])
		expect(callback).toHaveBeenCalledTimes(2)
		expect(callback).toHaveBeenCalledWith([record], expect.anything())
		expect(fake.disconnectCount()).toBe(0)
	})

	it('observeMutationOnce fires once and then disconnects itself', () => {
		const fake = stubMutationObserver()
		const callback = vi.fn()
		observeMutationOnce(node, callback)
		fake.emit([record])
		fake.emit([record])
		expect(callback).toHaveBeenCalledTimes(1)
		expect(callback).toHaveBeenCalledWith([record], expect.anything())
		expect(fake.disconnectCount()).toBe(1)
	})

	it('disconnectMutationObserver disconnects the observer it is handed', () => {
		const fake = stubMutationObserver()
		disconnectMutationObserver(observeMutations(node, vi.fn()))
		expect(fake.disconnectCount()).toBe(1)
	})
})
