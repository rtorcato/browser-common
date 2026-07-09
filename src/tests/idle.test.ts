// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cancelIdle, detectIdle, isIdleDetectionApiAvailable, onIdle } from '../idle/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('idle callbacks', () => {
	it('onIdle prefers requestIdleCallback, returning its id', () => {
		const ric = vi.fn().mockReturnValue(42)
		vi.stubGlobal('window', { requestIdleCallback: ric })
		const cb = () => {}
		expect(onIdle(cb, { timeout: 500 })).toBe(42)
		expect(ric).toHaveBeenCalledWith(cb, { timeout: 500 })
	})

	it('onIdle falls back to setTimeout when requestIdleCallback is absent', () => {
		const setTimeoutFn = vi.fn().mockReturnValue(7)
		vi.stubGlobal('window', { setTimeout: setTimeoutFn })
		expect(onIdle(() => {})).toBe(7)
		expect(setTimeoutFn).toHaveBeenCalled()
	})

	it('cancelIdle prefers cancelIdleCallback, else clearTimeout', () => {
		const cancel = vi.fn()
		vi.stubGlobal('window', { cancelIdleCallback: cancel })
		cancelIdle(42)
		expect(cancel).toHaveBeenCalledWith(42)
	})
})

describe('detectIdle (Idle Detection API)', () => {
	it('returns null when unavailable', async () => {
		vi.stubGlobal('window', {})
		expect(await detectIdle(() => {})).toBeNull()
	})

	it('constructs a detector, subscribes, and starts it', async () => {
		const listeners: Record<string, () => void> = {}
		const start = vi.fn().mockResolvedValue(undefined)
		class FakeIdleDetector {
			userState = 'idle'
			screenState = 'unlocked'
			addEventListener(type: string, cb: () => void) {
				listeners[type] = cb
			}
			start = start
		}
		vi.stubGlobal('window', { IdleDetector: FakeIdleDetector })
		expect(isIdleDetectionApiAvailable()).toBe(true)

		const onIdleCb = vi.fn()
		const detector = await detectIdle(onIdleCb)
		expect(detector).not.toBeNull()
		expect(start).toHaveBeenCalledWith({ threshold: 60_000 })

		// idle + unlocked → fires the idle callback
		listeners.change()
		expect(onIdleCb).toHaveBeenCalled()
	})
})
