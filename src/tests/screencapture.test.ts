// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { getDisplayMedia, isScreenCaptureAvailable } from '../screencapture/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('screencapture', () => {
	it('isScreenCaptureAvailable needs mediaDevices.getDisplayMedia, not just mediaDevices', () => {
		vi.stubGlobal('navigator', {})
		expect(isScreenCaptureAvailable()).toBe(false)
		vi.stubGlobal('navigator', { mediaDevices: {} })
		expect(isScreenCaptureAvailable()).toBe(false)
		vi.stubGlobal('navigator', { mediaDevices: { getDisplayMedia: () => {} } })
		expect(isScreenCaptureAvailable()).toBe(true)
	})

	it('getDisplayMedia forwards the constraints and resolves with the stream', async () => {
		const stream = { id: 'display' }
		const spy = vi.fn().mockResolvedValue(stream)
		vi.stubGlobal('navigator', { mediaDevices: { getDisplayMedia: spy } })

		const options = { video: true, audio: false }
		await expect(getDisplayMedia(options)).resolves.toBe(stream)
		expect(spy).toHaveBeenCalledWith(options)
	})

	it('getDisplayMedia rejects (does not throw synchronously) when unsupported', async () => {
		vi.stubGlobal('navigator', { mediaDevices: {} })
		let result: Promise<MediaStream> | undefined
		expect(() => {
			result = getDisplayMedia({ video: true })
		}).not.toThrow()
		await expect(result).rejects.toThrow('Screen Capture')
	})
})
