import { describe, expect, it } from 'vitest'
import { decodeUTF8, encodeUTF8, isTextDecoderAvailable, isTextEncoderAvailable } from './'

describe('encodingapis', () => {
	it('should detect TextEncoder support', () => {
		expect(typeof isTextEncoderAvailable()).toBe('boolean')
	})

	it('should detect TextDecoder support', () => {
		expect(typeof isTextDecoderAvailable()).toBe('boolean')
	})

	it('should encode and decode UTF-8 correctly', () => {
		if (isTextEncoderAvailable() && isTextDecoderAvailable()) {
			const str = 'hello world'
			const bytes = encodeUTF8(str)
			expect(bytes).toBeInstanceOf(Uint8Array)
			const decoded = decodeUTF8(bytes)
			expect(decoded).toBe(str)
		}
	})

	it('should throw if TextEncoder is not supported', () => {
		const original = globalThis.TextEncoder
		// @ts-expect-error — deleting a required global to simulate an unsupported environment
		globalThis.TextEncoder = undefined
		expect(() => encodeUTF8('test')).toThrow()
		globalThis.TextEncoder = original
	})

	it('should throw if TextDecoder is not supported', () => {
		const original = globalThis.TextDecoder
		// @ts-expect-error — deleting a required global to simulate an unsupported environment
		globalThis.TextDecoder = undefined
		expect(() => decodeUTF8(new Uint8Array([116, 101, 115, 116]))).toThrow()
		globalThis.TextDecoder = original
	})
})
