// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	getPointerType,
	isPointerEventsAvailable,
	isPrimaryPointer,
	onPointer,
} from '../pointerevents/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('pointerevents', () => {
	it('isPointerEventsAvailable reflects window.PointerEvent presence', () => {
		expect(isPointerEventsAvailable()).toBe(false)
		vi.stubGlobal('window', { PointerEvent: class {} })
		expect(isPointerEventsAvailable()).toBe(true)
	})

	it('getPointerType narrows to known device types, else empty string', () => {
		expect(getPointerType({ pointerType: 'pen' } as PointerEvent)).toBe('pen')
		expect(getPointerType({ pointerType: 'mouse' } as PointerEvent)).toBe('mouse')
		expect(getPointerType({ pointerType: 'weird' } as unknown as PointerEvent)).toBe('')
	})

	it('isPrimaryPointer is strict about the isPrimary flag', () => {
		expect(isPrimaryPointer({ isPrimary: true } as PointerEvent)).toBe(true)
		expect(isPrimaryPointer({ isPrimary: false } as PointerEvent)).toBe(false)
	})

	it('onPointer attaches and detaches the same wrapped listener', () => {
		const add = vi.fn()
		const remove = vi.fn()
		const element = { addEventListener: add, removeEventListener: remove } as unknown as Element
		const off = onPointer(element, 'pointerdown', () => {})
		expect(add).toHaveBeenCalledWith('pointerdown', expect.any(Function), undefined)
		const wrapped = add.mock.calls[0]?.[1]
		off()
		expect(remove).toHaveBeenCalledWith('pointerdown', wrapped, undefined)
	})
})
