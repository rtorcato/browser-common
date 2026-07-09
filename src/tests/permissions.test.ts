// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isPermissionsApiAvailable,
	onPermissionChange,
	queryPermission,
} from '../permissions/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('permissions', () => {
	it('isPermissionsApiAvailable reflects navigator.permissions presence', () => {
		expect(isPermissionsApiAvailable()).toBe(false)
		vi.stubGlobal('navigator', { permissions: { query: () => Promise.resolve({}) } })
		expect(isPermissionsApiAvailable()).toBe(true)
	})

	it('queryPermission returns the resolved state', async () => {
		const query = vi.fn().mockResolvedValue({ state: 'granted' })
		vi.stubGlobal('navigator', { permissions: { query } })
		expect(await queryPermission('geolocation')).toBe('granted')
		expect(query).toHaveBeenCalledWith({ name: 'geolocation' })
	})

	it('queryPermission returns undefined when unsupported', async () => {
		expect(await queryPermission('geolocation')).toBeUndefined()
	})

	it('queryPermission swallows a rejecting query', async () => {
		vi.stubGlobal('navigator', {
			permissions: { query: () => Promise.reject(new Error('bad name')) },
		})
		expect(await queryPermission('geolocation')).toBeUndefined()
	})

	it('onPermissionChange wires and unwires the change event', () => {
		const add = vi.fn()
		const remove = vi.fn()
		const status = { addEventListener: add, removeEventListener: remove } as never
		const cb = () => {}
		const off = onPermissionChange(status, cb)
		expect(add).toHaveBeenCalledWith('change', cb)
		off()
		expect(remove).toHaveBeenCalledWith('change', cb)
	})
})
