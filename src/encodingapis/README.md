# Encoding APIs Utilities

This module provides utility functions for working with the [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) and [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) APIs in the browser or Node.js.

## Features

- Check if TextEncoder and TextDecoder are supported.
- Encode strings to UTF-8 byte arrays.
- Decode UTF-8 byte arrays to strings.

## API

### `isTextEncoderAvailable(): boolean`
Returns `true` if the TextEncoder API is available.

### `isTextDecoderAvailable(): boolean`
Returns `true` if the TextDecoder API is available.

### `encodeUTF8(input: string): Uint8Array`
Encodes a string into a UTF-8 byte array. Throws if not supported.

### `decodeUTF8(bytes: Uint8Array): string`
Decodes a UTF-8 byte array into a string. Throws if not supported.

## Example

```typescript
import { encodeUTF8, decodeUTF8 } from "./encodingapis";

const bytes = encodeUTF8("hello world");
const str = decodeUTF8(bytes); // "hello world"
```
