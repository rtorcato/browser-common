import { describe, expect, it } from 'vitest'
import { decodeUTF8, encodeUTF8, isTextDecoderSupported, isTextEncoderSupported } from './'

describe('encodingapis', () => {
	it('should detect TextEncoder support', () => {
		expect(typeof isTextEncoderSupported()).toBe('boolean')
	})

	it('should detect TextDecoder support', () => {
		expect(typeof isTextDecoderSupported()).toBe('boolean')
	})

	it('should encode and decode UTF-8 correctly', () => {
		if (isTextEncoderSupported() && isTextDecoderSupported()) {
			const str = 'hello world'
			const bytes = encodeUTF8(str)
			expect(bytes).toBeInstanceOf(Uint8Array)
			const decoded = decodeUTF8(bytes)
			expect(decoded).toBe(str)
		}
	})

	it('should throw if TextEncoder is not supported', () => {
		const original = globalThis.TextEncoder
		// @ts-expect-error
		globalThis.TextEncoder = undefined
		expect(() => encodeUTF8('test')).toThrow()
		globalThis.TextEncoder = original
	})

	it('should throw if TextDecoder is not supported', () => {
		const original = globalThis.TextDecoder
		// @ts-expect-error
		globalThis.TextDecoder = undefined
		expect(() => decodeUTF8(new Uint8Array([116, 101, 115, 116]))).toThrow()
		globalThis.TextDecoder = original
	})
})
