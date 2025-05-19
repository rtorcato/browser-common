/**
 * Plays a given HTMLMediaElement (audio or video).
 * @param media The media element to play.
 * @returns {Promise<void>} A promise that resolves when playback starts.
 */
export function playMedia(media: HTMLMediaElement): Promise<void> {
	return media.play()
}

/**
 * Pauses a given HTMLMediaElement (audio or video).
 * @param media The media element to pause.
 */
export function pauseMedia(media: HTMLMediaElement): void {
	media.pause()
}

/**
 * Sets the current playback time of a media element.
 * @param media The media element.
 * @param time The time in seconds to set.
 */
export function setCurrentTime(media: HTMLMediaElement, time: number): void {
	media.currentTime = time
}

/**
 * Sets the volume of a media element (0.0 to 1.0).
 * @param media The media element.
 * @param volume The volume level.
 */
export function setVolume(media: HTMLMediaElement, volume: number): void {
	media.volume = Math.max(0, Math.min(1, volume))
}

/**
 * Mutes or unmutes a media element.
 * @param media The media element.
 * @param muted True to mute, false to unmute.
 */
export function setMuted(media: HTMLMediaElement, muted: boolean): void {
	media.muted = muted
}

/**
 * Loads a new source into a media element and optionally plays it.
 * @param media The media element.
 * @param src The source URL.
 * @param autoplay Whether to play after loading (default: false).
 * @returns {Promise<void> | void} A promise if autoplay, otherwise void.
 */
export function loadMediaSource(
	media: HTMLMediaElement,
	src: string,
	autoplay = false
): Promise<void> | void {
	media.src = src
	media.load()
	if (autoplay) {
		return media.play()
	}
}

/**
 * Adds an event listener to a media element and returns a cleanup function.
 * @param media The media element.
 * @param event The event name.
 * @param handler The event handler.
 * @returns {() => void} Cleanup function to remove the listener.
 */
export function onMediaEvent<K extends keyof HTMLMediaElementEventMap>(
	media: HTMLMediaElement,
	event: K,
	handler: (this: HTMLMediaElement, ev: HTMLMediaElementEventMap[K]) => unknown
): () => void {
	media.addEventListener(event, handler)
	return () => media.removeEventListener(event, handler)
}
