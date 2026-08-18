// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { createCredential, getCredential, isWebAuthnAvailable } from '../webauthn/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

const publicKeyOptions = {
	publicKey: { challenge: new Uint8Array([1, 2, 3]) },
} as unknown as CredentialCreationOptions

describe('webauthn', () => {
	it('isWebAuthnAvailable reflects navigator.credentials presence', () => {
		vi.stubGlobal('navigator', {})
		expect(isWebAuthnAvailable()).toBe(false)
		vi.stubGlobal('navigator', { credentials: {} })
		expect(isWebAuthnAvailable()).toBe(true)
	})

	it('createCredential forwards the options and resolves with the new credential', async () => {
		const credential = { id: 'passkey', type: 'public-key' }
		const create = vi.fn().mockResolvedValue(credential)
		vi.stubGlobal('navigator', { credentials: { create } })

		await expect(createCredential(publicKeyOptions)).resolves.toBe(credential)
		expect(create).toHaveBeenCalledWith(publicKeyOptions)
	})

	it('getCredential forwards the options and resolves with the stored credential', async () => {
		const credential = { id: 'passkey', type: 'public-key' }
		const get = vi.fn().mockResolvedValue(credential)
		vi.stubGlobal('navigator', { credentials: { get } })

		await expect(getCredential(publicKeyOptions)).resolves.toBe(credential)
		expect(get).toHaveBeenCalledWith(publicKeyOptions)
	})

	it('both entry points throw synchronously when credentials are unsupported', () => {
		vi.stubGlobal('navigator', {})
		expect(() => createCredential(publicKeyOptions)).toThrow('Credential Management')
		expect(() => getCredential(publicKeyOptions)).toThrow('Credential Management')
	})
})
