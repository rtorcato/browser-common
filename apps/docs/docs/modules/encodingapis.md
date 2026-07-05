---
title: encodingapis
sidebar_label: encodingapis
---

# encodingapis

Encodes and decodes strings to and from UTF-8 bytes using `TextEncoder`/`TextDecoder`.

**Import:** `@rtorcato/browser-common/encodingapis`

📖 [MDN: TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) · 📊 [caniuse: textencoder](https://caniuse.com/textencoder)

`encodeUTF8`/`decodeUTF8` **throw** where `TextEncoder`/`TextDecoder` are
unsupported — guard with `isTextEncoderAvailable()`/`isTextDecoderAvailable()` first.

## Example

```ts
import {
  isTextEncoderAvailable,
  encodeUTF8,
  decodeUTF8,
} from '@rtorcato/browser-common/encodingapis'

if (isTextEncoderAvailable()) {
  const bytes = encodeUTF8('hello')
  const text = decodeUTF8(bytes)
}
```

## Exports

- `isTextEncoderAvailable()` — feature check for `TextEncoder`
- `isTextDecoderAvailable()` — feature check for `TextDecoder`
- `encodeUTF8(input)` — encodes a string into a `Uint8Array`
- `decodeUTF8(bytes)` — decodes a `Uint8Array` into a string

See the [API reference](/docs/api/encodingapis) for full signatures.
