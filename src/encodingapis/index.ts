/**
 * Checks if the TextEncoder API is supported in the current browser.
 */
export function isTextEncoderSupported(): boolean {
	return typeof TextEncoder !== 'undefined'
}

/**
 * Checks if the TextDecoder API is supported in the current browser.
 */
export function isTextDecoderSupported(): boolean {
	return typeof TextDecoder !== 'undefined'
}

/**
 * Encodes a string into a Uint8Array using UTF-8 encoding.
 * @param input - The string to encode.
 * @returns The encoded Uint8Array.
 * @throws If TextEncoder is not supported.
 */
export function encodeUTF8(input: string): Uint8Array {
	if (!isTextEncoderSupported()) {
		throw new Error('TextEncoder is not supported in this environment.')
	}
	return new TextEncoder().encode(input)
}

/**
 * Decodes a Uint8Array into a string using UTF-8 encoding.
 * @param bytes - The Uint8Array to decode.
 * @returns The decoded string.
 * @throws If TextDecoder is not supported.
 */
export function decodeUTF8(bytes: Uint8Array): string {
	if (!isTextDecoderSupported()) {
		throw new Error('TextDecoder is not supported in this environment.')
	}
	return new TextDecoder().decode(bytes)
}
