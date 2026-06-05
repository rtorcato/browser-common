import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
	copyElementTextToClipboard,
	copyToClipboard,
	isClipboardApiAvailable,
	readFromClipboard,
} from '.'

const setNavigator = (value: unknown) => {
	Object.defineProperty(globalThis, 'navigator', {
		value,
		configurable: true,
		writable: true,
	})
}

let originalNavigator: Navigator | undefined

beforeEach(() => {
	originalNavigator = globalThis.navigator
})

afterEach(() => {
	setNavigator(originalNavigator)
})

describe('isClipboardApiAvailable', () => {
	it('returns true when navigator.clipboard exists', () => {
		setNavigator({ clipboard: { writeText: vi.fn(), readText: vi.fn() } })
		expect(isClipboardApiAvailable()).toBe(true)
	})

	it('returns false when navigator.clipboard is missing', () => {
		setNavigator({})
		expect(isClipboardApiAvailable()).toBe(false)
	})

	it('returns false when navigator itself is undefined', () => {
		setNavigator(undefined)
		expect(isClipboardApiAvailable()).toBe(false)
	})
})

describe('copyToClipboard', () => {
	it('calls navigator.clipboard.writeText and returns true on success', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined)
		setNavigator({ clipboard: { writeText } })

		const ok = await copyToClipboard('hello world')

		expect(writeText).toHaveBeenCalledWith('hello world')
		expect(writeText).toHaveBeenCalledOnce()
		expect(ok).toBe(true)
	})

	it('returns false when navigator.clipboard.writeText rejects', async () => {
		const writeText = vi.fn().mockRejectedValue(new Error('NotAllowedError'))
		setNavigator({ clipboard: { writeText } })

		const ok = await copyToClipboard('blocked')

		expect(ok).toBe(false)
	})

	it('returns false when clipboard API is unavailable', async () => {
		setNavigator({})
		expect(await copyToClipboard('x')).toBe(false)
	})
})

describe('readFromClipboard', () => {
	it('returns text from navigator.clipboard.readText', async () => {
		const readText = vi.fn().mockResolvedValue('pasted content')
		setNavigator({ clipboard: { readText } })

		const text = await readFromClipboard()

		expect(readText).toHaveBeenCalledOnce()
		expect(text).toBe('pasted content')
	})

	it('returns null when readText rejects (permission denied)', async () => {
		const readText = vi.fn().mockRejectedValue(new Error('NotAllowedError'))
		setNavigator({ clipboard: { readText } })

		expect(await readFromClipboard()).toBeNull()
	})

	it('returns null when clipboard API is unavailable', async () => {
		setNavigator({})
		expect(await readFromClipboard()).toBeNull()
	})
})

describe('copyElementTextToClipboard', () => {
	it('forwards element.textContent to clipboard.writeText', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined)
		setNavigator({ clipboard: { writeText } })
		const element = { textContent: 'inner text' } as unknown as Element

		const ok = await copyElementTextToClipboard(element)

		expect(writeText).toHaveBeenCalledWith('inner text')
		expect(ok).toBe(true)
	})

	it('falls back to empty string when textContent is null', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined)
		setNavigator({ clipboard: { writeText } })
		const element = { textContent: null } as unknown as Element

		await copyElementTextToClipboard(element)

		expect(writeText).toHaveBeenCalledWith('')
	})
})
