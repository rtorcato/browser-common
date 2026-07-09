// @vitest-environment node

import { describe, expect, it, vi } from 'vitest'
import {
	loadMediaSource,
	onMediaEvent,
	pauseMedia,
	playMedia,
	setCurrentTime,
	setMuted,
	setVolume,
} from '../htmlmedia/index'

function fakeMedia() {
	return {
		play: vi.fn().mockResolvedValue(undefined),
		pause: vi.fn(),
		load: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		currentTime: 0,
		volume: 1,
		muted: false,
		src: '',
	}
}

describe('htmlmedia', () => {
	it('play / pause delegate to the element', async () => {
		const media = fakeMedia()
		await playMedia(media as unknown as HTMLMediaElement)
		pauseMedia(media as unknown as HTMLMediaElement)
		expect(media.play).toHaveBeenCalled()
		expect(media.pause).toHaveBeenCalled()
	})

	it('setCurrentTime / setMuted set the properties', () => {
		const media = fakeMedia()
		setCurrentTime(media as unknown as HTMLMediaElement, 30)
		setMuted(media as unknown as HTMLMediaElement, true)
		expect(media.currentTime).toBe(30)
		expect(media.muted).toBe(true)
	})

	it('setVolume clamps to the 0..1 range', () => {
		const media = fakeMedia()
		setVolume(media as unknown as HTMLMediaElement, 1.5)
		expect(media.volume).toBe(1)
		setVolume(media as unknown as HTMLMediaElement, -0.5)
		expect(media.volume).toBe(0)
		setVolume(media as unknown as HTMLMediaElement, 0.3)
		expect(media.volume).toBe(0.3)
	})

	it('loadMediaSource sets src, loads, and autoplays when asked', () => {
		const media = fakeMedia()
		loadMediaSource(media as unknown as HTMLMediaElement, '/song.mp3', true)
		expect(media.src).toBe('/song.mp3')
		expect(media.load).toHaveBeenCalled()
		expect(media.play).toHaveBeenCalled()
	})

	it('loadMediaSource skips play without autoplay', () => {
		const media = fakeMedia()
		loadMediaSource(media as unknown as HTMLMediaElement, '/song.mp3')
		expect(media.play).not.toHaveBeenCalled()
	})

	it('onMediaEvent wires and unwires the listener', () => {
		const media = fakeMedia()
		const handler = () => {}
		const off = onMediaEvent(media as unknown as HTMLMediaElement, 'ended', handler)
		expect(media.addEventListener).toHaveBeenCalledWith('ended', handler)
		off()
		expect(media.removeEventListener).toHaveBeenCalledWith('ended', handler)
	})
})
