/**
 * Checks if the TextEncoder API is available in the current environment.
 * @example
 * ```ts
 * import { isTextEncoderAvailable } from '@rtorcato/browser-common/encodingapis'
 * if (isTextEncoderAvailable()) encode()
 * ```
 */
export function isTextEncoderAvailable(): boolean {
	return typeof TextEncoder !== 'undefined'
}

/**
 * Checks if the TextDecoder API is available in the current environment.
 * @example
 * ```ts
 * import { isTextDecoderAvailable } from '@rtorcato/browser-common/encodingapis'
 * if (isTextDecoderAvailable()) decode()
 * ```
 */
export function isTextDecoderAvailable(): boolean {
	return typeof TextDecoder !== 'undefined'
}

/**
 * Encodes a string into a Uint8Array using UTF-8 encoding.
 * @param input - The string to encode.
 * @returns The encoded Uint8Array.
 * @throws If TextEncoder is not available.
 * @example
 * ```ts
 * import { encodeUTF8 } from '@rtorcato/browser-common/encodingapis'
 * const bytes = encodeUTF8('hello')
 * ```
 */
export function encodeUTF8(input: string): Uint8Array {
	if (!isTextEncoderAvailable()) {
		throw new Error('TextEncoder is not supported in this environment.')
	}
	return new TextEncoder().encode(input)
}

/**
 * Decodes a Uint8Array into a string using UTF-8 encoding.
 * @param bytes - The Uint8Array to decode.
 * @returns The decoded string.
 * @throws If TextDecoder is not available.
 * @example
 * ```ts
 * import { decodeUTF8 } from '@rtorcato/browser-common/encodingapis'
 * const text = decodeUTF8(new Uint8Array([104, 105]))
 * ```
 */
export function decodeUTF8(bytes: Uint8Array): string {
	if (!isTextDecoderAvailable()) {
		throw new Error('TextDecoder is not supported in this environment.')
	}
	return new TextDecoder().decode(bytes)
}
