// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getBatteryManager,
	isBatteryApiAvailable,
	onBatteryChargingChange,
	onBatteryLevelChange,
} from '../battery/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('battery', () => {
	it('isBatteryApiAvailable reflects navigator.getBattery presence', () => {
		expect(isBatteryApiAvailable()).toBe(false)
		vi.stubGlobal('navigator', { getBattery: () => Promise.resolve({}) })
		expect(isBatteryApiAvailable()).toBe(true)
	})

	it('getBatteryManager resolves the manager when supported', async () => {
		const manager = { level: 0.5, charging: true }
		vi.stubGlobal('navigator', { getBattery: () => Promise.resolve(manager) })
		expect(await getBatteryManager()).toBe(manager)
	})

	it('getBatteryManager returns undefined when unsupported', async () => {
		expect(await getBatteryManager()).toBeUndefined()
	})

	it('getBatteryManager swallows a rejecting getBattery', async () => {
		vi.stubGlobal('navigator', { getBattery: () => Promise.reject(new Error('nope')) })
		expect(await getBatteryManager()).toBeUndefined()
	})

	it('level/charging listeners wire and unwire the right events', () => {
		const add = vi.fn()
		const remove = vi.fn()
		const battery = { addEventListener: add, removeEventListener: remove } as never
		const cb = () => {}

		const offLevel = onBatteryLevelChange(battery, cb)
		expect(add).toHaveBeenCalledWith('levelchange', cb)
		offLevel()
		expect(remove).toHaveBeenCalledWith('levelchange', cb)

		const offCharging = onBatteryChargingChange(battery, cb)
		expect(add).toHaveBeenCalledWith('chargingchange', cb)
		offCharging()
		expect(remove).toHaveBeenCalledWith('chargingchange', cb)
	})
})
