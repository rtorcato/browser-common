---
title: webauthn
sidebar_label: webauthn
---

# webauthn

Register and authenticate passkeys via the Credential Management / WebAuthn
API (`navigator.credentials`).

**Import:** `@rtorcato/browser-common/webauthn`

📖 [MDN: Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) · 📊 [caniuse: webauthn](https://caniuse.com/webauthn)

`createCredential`/`getCredential` need a **secure context** and **throw** where Credential Management is unsupported — guard with `isWebAuthnAvailable()`.

## Example

```ts
import {
  isWebAuthnAvailable,
  createCredential,
  getCredential,
} from '@rtorcato/browser-common/webauthn'

if (isWebAuthnAvailable()) {
  const credential = await createCredential({ publicKey })
  const assertion = await getCredential({ publicKey })
}
```

## Exports

- `isWebAuthnAvailable()` — feature check
- `createCredential(options?)` — registers a new credential via `navigator.credentials.create`
- `getCredential(options?)` — retrieves an existing credential via `navigator.credentials.get`

See the [API reference](/docs/api/webauthn) for full signatures.
