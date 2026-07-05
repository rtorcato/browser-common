---
title: filesystem
sidebar_label: filesystem
---

# filesystem

Reads and writes local files through the File System Access API's open/save
pickers.

**Import:** `@rtorcato/browser-common/filesystem`

📖 [MDN: File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)

The File System Access API is Chromium-only and `pickFiles`/`saveFile` must
be called from a user gesture (e.g. a click handler) — both **throw** a
`File System Access API not available` error where unsupported, so guard
with `isFileSystemApiAvailable()` first.

## Example

```ts
import {
  isFileSystemApiAvailable,
  pickFiles,
  saveFile,
  writeTextToFile,
} from '@rtorcato/browser-common/filesystem'

if (isFileSystemApiAvailable()) {
  const files = await pickFiles({ multiple: true })

  const stream = await saveFile({ suggestedName: 'notes.txt' })
  await writeTextToFile(stream, 'hello')
}
```

## Exports

- `isFileSystemApiAvailable()` — feature check
- `pickFiles(options?)` — prompts the user to select files, returns `File[]`
- `saveFile(options?)` — prompts the user to save a file, returns a writable file stream
- `readFileAsText(file)` — reads a `File` as text
- `readFileAsArrayBuffer(file)` — reads a `File` as an `ArrayBuffer`
- `writeTextToFile(stream, text)` — writes text to a writable stream and closes it
- `writeDataToFile(stream, data)` — writes a `Blob`/`ArrayBuffer` to a writable stream and closes it

See the [API reference](/docs/api/filesystem) for full signatures.
