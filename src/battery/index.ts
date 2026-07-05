/**
 * Checks if the Battery Status API is available in the current environment.
 * @example
 * ```ts
 * import { isBatteryApiAvailable } from '@rtorcato/browser-common/battery'
 * if (isBatteryApiAvailable()) showBatteryUI()
 * ```
 */
export function isBatteryApiAvailable(): boolean {
	return typeof navigator !== 'undefined' && 'getBattery' in navigator
}

/**
 * Gets the BatteryManager object if available.
 * @returns A promise resolving to the BatteryManager, or undefined if not supported.
 */

// Type definition for BatteryManager if not present in the environment
interface BatteryManager extends EventTarget {
	charging: boolean
	chargingTime: number
	dischargingTime: number
	level: number
	onchargingchange: ((this: BatteryManager, ev: Event) => any) | null
	onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null
	ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null
	onlevelchange: ((this: BatteryManager, ev: Event) => any) | null
}

/**
 * Gets the BatteryManager object if available.
 * @returns A promise resolving to the BatteryManager, or undefined if not supported.
 * @example
 * ```ts
 * import { getBatteryManager } from '@rtorcato/browser-common/battery'
 * const battery = await getBatteryManager()
 * console.log(battery?.level)
 * ```
 */
export async function getBatteryManager(): Promise<BatteryManager | undefined> {
	if (!isBatteryApiAvailable()) return undefined
	try {
		// @ts-expect-error — navigator.getBattery not in lib.dom (Chromium-only; spec dormant)
		return await navigator.getBattery()
	} catch {
		return undefined
	}
}

/**
 * Adds a listener for battery level changes.
 * @param battery The BatteryManager object.
 * @param callback The callback to run on level change.
 * @returns A function to remove the event listener.
 * @example
 * ```ts
 * import { getBatteryManager, onBatteryLevelChange } from '@rtorcato/browser-common/battery'
 * const battery = await getBatteryManager()
 * const off = battery && onBatteryLevelChange(battery, () => console.log(battery.level))
 * off?.()
 * ```
 */
export function onBatteryLevelChange(battery: BatteryManager, callback: () => void): () => void {
	battery.addEventListener('levelchange', callback)
	return () => battery.removeEventListener('levelchange', callback)
}

/**
 * Adds a listener for charging state changes.
 * @param battery The BatteryManager object.
 * @param callback The callback to run on charging change.
 * @returns A function to remove the event listener.
 * @example
 * ```ts
 * import { getBatteryManager, onBatteryChargingChange } from '@rtorcato/browser-common/battery'
 * const battery = await getBatteryManager()
 * const off = battery && onBatteryChargingChange(battery, () => console.log(battery.charging))
 * off?.()
 * ```
 */
export function onBatteryChargingChange(battery: BatteryManager, callback: () => void): () => void {
	battery.addEventListener('chargingchange', callback)
	return () => battery.removeEventListener('chargingchange', callback)
}
