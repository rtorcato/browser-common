---
title: htmlmedia
sidebar_label: htmlmedia
---

# htmlmedia

Playback controls and event helpers for `<audio>`/`<video>` elements via
`HTMLMediaElement`.

**Import:** `@rtorcato/browser-common/htmlmedia`

📖 [MDN: HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

## Example

```ts
import { playMedia, setVolume, onMediaEvent } from '@rtorcato/browser-common/htmlmedia'

setVolume(audio, 0.5)
await playMedia(audio)

const off = onMediaEvent(audio, 'ended', () => console.log('done'))
off()
```

## Exports

- `playMedia(media)` — plays the media element, returns the play `Promise`
- `pauseMedia(media)` — pauses the media element
- `setCurrentTime(media, time)` — sets playback position in seconds
- `setVolume(media, volume)` — sets volume, clamped to `0.0`–`1.0`
- `setMuted(media, muted)` — mutes or unmutes
- `loadMediaSource(media, src, autoplay?)` — sets `src`, calls `load()`, optionally plays
- `onMediaEvent(media, event, handler)` — adds an event listener; returns a cleanup function

See the [API reference](/docs/api/htmlmedia) for full signatures.
