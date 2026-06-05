/**
 * Checks if WebSockets are available in the current browser.
 * @returns {boolean} True if available, false otherwise.
 */
export function isWebSocketAvailable(): boolean {
	return typeof window !== 'undefined' && 'WebSocket' in window
}

/** @deprecated Use {@link isWebSocketAvailable} instead. Will be removed in the next major. */
export const isWebSocketSupported = isWebSocketAvailable

/**
 * Creates a new WebSocket connection and attaches event listeners.
 * @param url The WebSocket server URL.
 * @param protocols Optional subprotocols.
 * @param handlers Optional event handlers (open, message, error, close).
 * @returns The created WebSocket instance.
 */
export function createWebSocket(
	url: string,
	protocols?: string | string[],
	handlers?: {
		onOpen?: (event: Event) => void
		onMessage?: (event: MessageEvent) => void
		onError?: (event: Event) => void
		onClose?: (event: CloseEvent) => void
	}
): WebSocket {
	const ws = protocols ? new WebSocket(url, protocols) : new WebSocket(url)
	if (handlers) {
		if (handlers.onOpen) ws.addEventListener('open', handlers.onOpen)
		if (handlers.onMessage) ws.addEventListener('message', handlers.onMessage)
		if (handlers.onError) ws.addEventListener('error', handlers.onError)
		if (handlers.onClose) ws.addEventListener('close', handlers.onClose)
	}
	return ws
}

/**
 * Sends a message through a WebSocket if it is open.
 * @param ws The WebSocket instance.
 * @param data The data to send.
 * @returns {boolean} True if sent, false otherwise.
 */
export function sendWebSocketMessage(ws: WebSocket, data: string | Blob | BufferSource): boolean {
	if (ws.readyState === WebSocket.OPEN) {
		ws.send(data)
		return true
	}
	return false
}

/**
 * Closes a WebSocket connection if it is open or connecting.
 * @param ws The WebSocket instance.
 * @param code Optional close code.
 * @param reason Optional close reason.
 */
export function closeWebSocket(ws: WebSocket, code?: number, reason?: string): void {
	if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
		ws.close(code, reason)
	}
}
