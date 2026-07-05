/**
 * Checks if the BroadcastChannel API is available in the current environment.
 * @returns {boolean} True if available, false otherwise.
 * @example
 * ```ts
 * import { isBroadcastChannelAvailable } from '@rtorcato/browser-common/broadcastchannel'
 * if (isBroadcastChannelAvailable()) startSync()
 * ```
 */
export function isBroadcastChannelAvailable(): boolean {
	return typeof window !== 'undefined' && 'BroadcastChannel' in window
}

/**
 * A thin wrapper around a BroadcastChannel for same-origin cross-tab messaging.
 */
export type BroadcastChannelWrapper<T = unknown> = {
	/** Registers a listener for messages; returns an unsubscribe function. */
	onMessage: (handler: (data: T) => void) => () => void
	/** Posts a message to all other same-origin contexts on this channel. */
	send: (data: T) => void
	/** Closes the underlying channel. */
	close: () => void
	/** The underlying native BroadcastChannel. */
	channel: BroadcastChannel
}

/**
 * Creates a BroadcastChannel wrapper for same-origin cross-tab messaging.
 * @param name The channel name shared across tabs.
 * @returns A wrapper with onMessage/send/close helpers.
 * @throws If called in a non-browser environment or where BroadcastChannel is unsupported.
 * @example
 * ```ts
 * import { createBroadcastChannel } from '@rtorcato/browser-common/broadcastchannel'
 * const channel = createBroadcastChannel<{ type: string }>('sync')
 * const off = channel.onMessage((data) => console.log(data))
 * channel.send({ type: 'updated' })
 * channel.close()
 * ```
 */
export function createBroadcastChannel<T = unknown>(name: string): BroadcastChannelWrapper<T> {
	if (!isBroadcastChannelAvailable()) {
		throw new Error('createBroadcastChannel requires a browser environment with BroadcastChannel')
	}
	const channel = new BroadcastChannel(name)
	return {
		channel,
		onMessage(handler) {
			const listener = (event: MessageEvent) => handler(event.data as T)
			channel.addEventListener('message', listener)
			return () => channel.removeEventListener('message', listener)
		},
		send(data) {
			channel.postMessage(data)
		},
		close() {
			channel.close()
		},
	}
}
