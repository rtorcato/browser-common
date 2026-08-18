// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { isViewTransitionsSupported, startViewTransition } from '../viewtransitions/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

/** Flush the microtask queue so a pending promise has had every chance to settle. */
const flush = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('viewtransitions', () => {
	it('isViewTransitionsSupported reflects document.startViewTransition', () => {
		vi.stubGlobal('document', {})
		expect(isViewTransitionsSupported()).toBe(false)
		vi.stubGlobal('document', { startViewTransition: () => {} })
		expect(isViewTransitionsSupported()).toBe(true)
	})

	it('startViewTransition runs the update directly when unsupported', async () => {
		vi.stubGlobal('document', {})
		const update = vi.fn()
		await startViewTransition(update)
		expect(update).toHaveBeenCalledTimes(1)
	})

	it('startViewTransition awaits an async update on the fallback path', async () => {
		vi.stubGlobal('document', {})
		const order: string[] = []
		await startViewTransition(async () => {
			await flush()
			order.push('update')
		})
		order.push('after')
		expect(order).toEqual(['update', 'after'])
	})

	it('hands the update to the API rather than running it, and waits for updateCallbackDone', async () => {
		let commit = () => {}
		const updateCallbackDone = new Promise<void>((resolve) => {
			commit = () => resolve()
		})
		// Deliberately does not invoke the callback: the module must delegate, not double-run.
		const start = vi.fn().mockReturnValue({ updateCallbackDone })
		vi.stubGlobal('document', { startViewTransition: start })

		const update = vi.fn()
		const order: string[] = []
		const pending = startViewTransition(update).then(() => {
			order.push('settled')
		})

		expect(start).toHaveBeenCalledWith(update)
		expect(update).not.toHaveBeenCalled()

		await flush()
		expect(order).toEqual([])

		commit()
		await pending
		expect(order).toEqual(['settled'])
	})
})
