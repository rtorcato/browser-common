/**
 * Checks if the Credential Management / WebAuthn API is available.
 * @returns {boolean} True if `navigator.credentials` exists, false otherwise.
 * @example
 * ```ts
 * import { isWebAuthnAvailable } from '@rtorcato/browser-common/webauthn'
 * if (isWebAuthnAvailable()) offerPasskeyLogin()
 * ```
 */
export function isWebAuthnAvailable(): boolean {
	return typeof navigator !== 'undefined' && 'credentials' in navigator
}

/**
 * Creates a new credential (e.g. registers a passkey) via `navigator.credentials.create`.
 * @param options Credential creation options (typically with a `publicKey` field).
 * @returns A promise resolving to the new Credential, or null.
 * @throws If called where the Credential Management API is unsupported.
 * @example
 * ```ts
 * import { createCredential } from '@rtorcato/browser-common/webauthn'
 * const credential = await createCredential({ publicKey })
 * ```
 */
export function createCredential(options?: CredentialCreationOptions): Promise<Credential | null> {
	if (!isWebAuthnAvailable()) {
		throw new Error('createCredential requires a browser environment with Credential Management')
	}
	return navigator.credentials.create(options)
}

/**
 * Requests an existing credential (e.g. authenticates a passkey) via `navigator.credentials.get`.
 * @param options Credential request options (typically with a `publicKey` field).
 * @returns A promise resolving to the retrieved Credential, or null.
 * @throws If called where the Credential Management API is unsupported.
 * @example
 * ```ts
 * import { getCredential } from '@rtorcato/browser-common/webauthn'
 * const credential = await getCredential({ publicKey })
 * ```
 */
export function getCredential(options?: CredentialRequestOptions): Promise<Credential | null> {
	if (!isWebAuthnAvailable()) {
		throw new Error('getCredential requires a browser environment with Credential Management')
	}
	return navigator.credentials.get(options)
}
