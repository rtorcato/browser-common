// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isNotificationAvailable,
	notifyIfPermitted,
	requestNotificationPermission,
	showNotification,
} from '../notifications/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

// Fake Notification constructor: records each instance, exposes a mutable
// static `permission`, and a `requestPermission` that resolves to `grantTo`.
function stubNotification(permission: NotificationPermission, grantTo = permission) {
	const instances: Array<{ title: string; options?: NotificationOptions }> = []
	class FakeNotification {
		static permission: NotificationPermission = permission
		static requestPermission = vi.fn(async () => {
			FakeNotification.permission = grantTo
			return grantTo
		})
		constructor(
			public title: string,
			public options?: NotificationOptions
		) {
			instances.push(this)
		}
	}
	vi.stubGlobal('Notification', FakeNotification)
	vi.stubGlobal('window', { Notification: FakeNotification })
	return { FakeNotification, instances }
}

describe('notifications (unsupported runtime)', () => {
	it('isNotificationAvailable is false without window or window.Notification', () => {
		expect(isNotificationAvailable()).toBe(false)
		vi.stubGlobal('window', {})
		expect(isNotificationAvailable()).toBe(false)
	})

	it('requestNotificationPermission resolves to denied', async () => {
		await expect(requestNotificationPermission()).resolves.toBe('denied')
	})

	it('showNotification and notifyIfPermitted return null', async () => {
		expect(showNotification('hi')).toBeNull()
		await expect(notifyIfPermitted('hi')).resolves.toBeNull()
	})
})

describe('notifications (supported runtime)', () => {
	it('isNotificationAvailable is true when window.Notification exists', () => {
		stubNotification('default')
		expect(isNotificationAvailable()).toBe(true)
	})

	it('requestNotificationPermission returns the browser result', async () => {
		const { FakeNotification } = stubNotification('default', 'granted')
		await expect(requestNotificationPermission()).resolves.toBe('granted')
		expect(FakeNotification.requestPermission).toHaveBeenCalledOnce()
	})

	it('showNotification constructs a Notification only when granted', () => {
		const { instances } = stubNotification('granted')
		const options = { body: 'Upload complete' }
		const n = showNotification('Done', options)
		expect(n).toBe(instances[0])
		expect(instances[0]).toMatchObject({ title: 'Done', options })
	})

	it.each(['default', 'denied'] as const)('showNotification returns null when %s', (perm) => {
		const { instances } = stubNotification(perm)
		expect(showNotification('Done')).toBeNull()
		expect(instances).toHaveLength(0)
	})

	it('notifyIfPermitted asks when default, then shows once granted', async () => {
		const { FakeNotification, instances } = stubNotification('default', 'granted')
		const n = await notifyIfPermitted('Hello', { body: 'World' })
		expect(FakeNotification.requestPermission).toHaveBeenCalledOnce()
		expect(n).toBe(instances[0])
	})

	it('notifyIfPermitted returns null when the prompt is declined', async () => {
		const { FakeNotification, instances } = stubNotification('default', 'denied')
		await expect(notifyIfPermitted('Hello')).resolves.toBeNull()
		expect(FakeNotification.requestPermission).toHaveBeenCalledOnce()
		expect(instances).toHaveLength(0)
	})

	it('notifyIfPermitted skips the prompt when already granted or denied', async () => {
		const granted = stubNotification('granted')
		expect(await notifyIfPermitted('Hello')).toBe(granted.instances[0])
		expect(granted.FakeNotification.requestPermission).not.toHaveBeenCalled()

		const denied = stubNotification('denied')
		await expect(notifyIfPermitted('Hello')).resolves.toBeNull()
		expect(denied.FakeNotification.requestPermission).not.toHaveBeenCalled()
	})
})
