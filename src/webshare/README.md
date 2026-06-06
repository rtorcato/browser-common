# Web Share API Utilities

This module provides utility functions for working with the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) in the browser.

## Features

- Check if the Web Share API is supported
- Share data (title, text, url, files) using the Web Share API
- Check if file sharing is supported

## API

### `isWebShareAvailable(): boolean`
Returns `true` if the Web Share API is available in the current browser.

### `share(data: ShareData): Promise<void>`
Shares the provided data using the Web Share API. Throws if not supported.

### `isFileShareAvailable(): boolean`
Returns `true` if the Web Share API supports sharing files in the current browser.

## Example

```typescript
import { isWebShareAvailable, share, isFileShareAvailable } from "./webshare";

if (isWebShareAvailable()) {
  await share({ title: "Hello", text: "Check this out!", url: "https://example.com" });
}

if (isFileShareAvailable()) {
  await share({ files: [new File(["content"], "example.txt")] });
}
```
