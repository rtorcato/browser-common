// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	closeWebSocket,
	createWebSocket,
	isWebSocketAvailable,
	sendWebSocketMessage,
} from '../websockets/index'

// Fake standing in for the platform WebSocket, so no real connection is opened.
class FakeWebSocket {
	static CONNECTING = 0
	static OPEN = 1
	url: string
	protocols?: string | string[]
	readyState = FakeWebSocket.OPEN
	send = vi.fn()
	close = vi.fn()
	listeners: Record<string, unknown> = {}
	constructor(url: string, protocols?: string | string[]) {
		this.url = url
		this.protocols = protocols
	}
	addEventListener(type: string, cb: unknown) {
		this.listeners[type] = cb
	}
}

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('websockets', () => {
	it('isWebSocketAvailable reflects window.WebSocket presence', () => {
		expect(isWebSocketAvailable()).toBe(false)
		vi.stubGlobal('window', { WebSocket: FakeWebSocket })
		expect(isWebSocketAvailable()).toBe(true)
	})

	it('createWebSocket passes url/protocols and attaches handlers', () => {
		vi.stubGlobal('WebSocket', FakeWebSocket)
		const onMessage = () => {}
		const ws = createWebSocket('wss://e.com', 'chat', { onMessage }) as unknown as FakeWebSocket
		expect(ws.url).toBe('wss://e.com')
		expect(ws.protocols).toBe('chat')
		expect(ws.listeners.message).toBe(onMessage)
	})

	it('sendWebSocketMessage sends only when the socket is open', () => {
		vi.stubGlobal('WebSocket', FakeWebSocket)
		const ws = new FakeWebSocket('wss://e.com') as unknown as WebSocket
		expect(sendWebSocketMessage(ws, 'hi')).toBe(true)
		expect((ws as unknown as FakeWebSocket).send).toHaveBeenCalledWith('hi')
		;(ws as unknown as FakeWebSocket).readyState = FakeWebSocket.CONNECTING
		expect(sendWebSocketMessage(ws, 'later')).toBe(false)
	})

	it('closeWebSocket closes an open or connecting socket', () => {
		vi.stubGlobal('WebSocket', FakeWebSocket)
		const ws = new FakeWebSocket('wss://e.com') as unknown as WebSocket
		closeWebSocket(ws, 1000, 'done')
		expect((ws as unknown as FakeWebSocket).close).toHaveBeenCalledWith(1000, 'done')
	})
})
