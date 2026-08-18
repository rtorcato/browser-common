// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { createBroadcastChannel, isBroadcastChannelAvailable } from '../broadcastchannel/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

type Listener = (event: MessageEvent) => void

function stubBroadcastChannel() {
	const created: string[] = []
	const listeners = new Set<Listener>()
	const posted: unknown[] = []
	let closed = 0

	class FakeChannel {
		constructor(name: string) {
			created.push(name)
		}
		addEventListener(_type: string, handler: Listener) {
			listeners.add(handler)
		}
		removeEventListener(_type: string, handler: Listener) {
			listeners.delete(handler)
		}
		postMessage(data: unknown) {
			posted.push(data)
		}
		close() {
			closed += 1
		}
	}

	vi.stubGlobal('BroadcastChannel', FakeChannel)
	vi.stubGlobal('window', { BroadcastChannel: FakeChannel })

	return {
		created,
		listeners,
		posted,
		closedCount: () => closed,
		emit: (data: unknown) => {
			for (const listener of listeners) listener({ data } as unknown as MessageEvent)
		},
	}
}

describe('broadcastchannel', () => {
	it('isBroadcastChannelAvailable reflects BroadcastChannel on window', () => {
		vi.stubGlobal('window', {})
		expect(isBroadcastChannelAvailable()).toBe(false)
		stubBroadcastChannel()
		expect(isBroadcastChannelAvailable()).toBe(true)
	})

	it('createBroadcastChannel throws when the API is unsupported', () => {
		vi.stubGlobal('window', {})
		expect(() => createBroadcastChannel('sync')).toThrow('BroadcastChannel')
	})

	it('createBroadcastChannel opens a channel under the given name and exposes it', () => {
		const fake = stubBroadcastChannel()
		const wrapper = createBroadcastChannel('sync')
		expect(fake.created).toEqual(['sync'])
		// `channel` must be the live underlying channel, not a copy.
		wrapper.channel.postMessage('direct')
		expect(fake.posted).toEqual(['direct'])
	})

	it('send posts the payload on the underlying channel', () => {
		const fake = stubBroadcastChannel()
		createBroadcastChannel<{ type: string }>('sync').send({ type: 'updated' })
		expect(fake.posted).toEqual([{ type: 'updated' }])
	})

	it('onMessage unwraps event.data and stops delivering after unsubscribe', () => {
		const fake = stubBroadcastChannel()
		const channel = createBroadcastChannel<{ type: string }>('sync')
		const received: { type: string }[] = []
		const off = channel.onMessage((data) => received.push(data))

		fake.emit({ type: 'updated' })
		expect(received).toEqual([{ type: 'updated' }])

		off()
		expect(fake.listeners.size).toBe(0)
		fake.emit({ type: 'ignored' })
		expect(received).toEqual([{ type: 'updated' }])
	})

	it('close closes the underlying channel', () => {
		const fake = stubBroadcastChannel()
		createBroadcastChannel('sync').close()
		expect(fake.closedCount()).toBe(1)
	})
})
