// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	decodeUTF8,
	encodeUTF8,
	isTextDecoderAvailable,
	isTextEncoderAvailable,
} from '../encodingapis/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('encodingapis', () => {
	it('reports the APIs available in a TextEncoder-capable runtime (Node)', () => {
		expect(isTextEncoderAvailable()).toBe(true)
		expect(isTextDecoderAvailable()).toBe(true)
	})

	it('encodeUTF8 produces UTF-8 bytes', () => {
		expect(Array.from(encodeUTF8('hi'))).toEqual([104, 105])
	})

	it('round-trips multibyte text through encode/decode', () => {
		const text = 'héllo 🎉'
		expect(decodeUTF8(encodeUTF8(text))).toBe(text)
	})

	it('throws a clear error when TextEncoder is absent', () => {
		vi.stubGlobal('TextEncoder', undefined)
		expect(isTextEncoderAvailable()).toBe(false)
		expect(() => encodeUTF8('x')).toThrow('TextEncoder is not supported')
	})

	it('throws a clear error when TextDecoder is absent', () => {
		vi.stubGlobal('TextDecoder', undefined)
		expect(isTextDecoderAvailable()).toBe(false)
		expect(() => decodeUTF8(new Uint8Array([120]))).toThrow('TextDecoder is not supported')
	})
})
