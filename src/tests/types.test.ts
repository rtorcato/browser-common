import { describe, expectTypeOf, it } from 'vitest'
import { copyToClipboard, readFromClipboard } from '../clipboard/index.js'
import { serializeForm } from '../forms/index.js'
import { getCurrentPosition, watchPosition } from '../geolocation/index.js'
import { observeIntersection } from '../intersection/index.js'
import { getUserMedia } from '../mediadevices/index.js'
import { observeMutations } from '../mutationobserver/index.js'
import { requestNotificationPermission } from '../notifications/index.js'
import { observeResize } from '../resizeobserver/index.js'

describe('forms', () => {
	it('serializeForm: HTMLFormElement => Record<string, string>', () => {
		expectTypeOf(serializeForm).parameters.toEqualTypeOf<[HTMLFormElement]>()
		expectTypeOf(serializeForm).returns.toEqualTypeOf<Record<string, string>>()
	})
})

describe('geolocation', () => {
	it('getCurrentPosition: (options?) => Promise<GeolocationPosition>', () => {
		expectTypeOf(getCurrentPosition).parameters.toEqualTypeOf<[PositionOptions?]>()
		expectTypeOf(getCurrentPosition).returns.toEqualTypeOf<Promise<GeolocationPosition>>()
	})

	it('watchPosition: (success, error?, options?) => number | undefined', () => {
		expectTypeOf(watchPosition).parameters.toEqualTypeOf<
			[PositionCallback, PositionErrorCallback?, PositionOptions?]
		>()
		expectTypeOf(watchPosition).returns.toEqualTypeOf<number | undefined>()
	})
})

describe('intersection / mutation / resize observers', () => {
	it('observeIntersection returns IntersectionObserver', () => {
		expectTypeOf(observeIntersection).parameters.toEqualTypeOf<
			[Element, IntersectionObserverCallback, IntersectionObserverInit?]
		>()
		expectTypeOf(observeIntersection).returns.toEqualTypeOf<IntersectionObserver>()
	})

	it('observeMutations returns MutationObserver', () => {
		expectTypeOf(observeMutations).parameters.toEqualTypeOf<
			[Node, MutationCallback, MutationObserverInit?]
		>()
		expectTypeOf(observeMutations).returns.toEqualTypeOf<MutationObserver>()
	})

	it('observeResize returns ResizeObserver', () => {
		expectTypeOf(observeResize).parameters.toEqualTypeOf<
			[Element, ResizeObserverCallback, ResizeObserverOptions?]
		>()
		expectTypeOf(observeResize).returns.toEqualTypeOf<ResizeObserver>()
	})
})

describe('clipboard', () => {
	it('copyToClipboard: (text: string) => Promise<boolean>', () => {
		expectTypeOf(copyToClipboard).parameters.toEqualTypeOf<[string]>()
		expectTypeOf(copyToClipboard).returns.toEqualTypeOf<Promise<boolean>>()
	})

	it('readFromClipboard: () => Promise<string | null>', () => {
		expectTypeOf(readFromClipboard).parameters.toEqualTypeOf<[]>()
		expectTypeOf(readFromClipboard).returns.toEqualTypeOf<Promise<string | null>>()
	})
})

describe('mediadevices', () => {
	it('getUserMedia: (constraints) => Promise<MediaStream>', () => {
		expectTypeOf(getUserMedia).parameters.toEqualTypeOf<[MediaStreamConstraints]>()
		expectTypeOf(getUserMedia).returns.toEqualTypeOf<Promise<MediaStream>>()
	})
})

describe('notifications', () => {
	it('requestNotificationPermission: () => Promise<NotificationPermission>', () => {
		expectTypeOf(requestNotificationPermission).parameters.toEqualTypeOf<[]>()
		expectTypeOf(requestNotificationPermission).returns.toEqualTypeOf<
			Promise<NotificationPermission>
		>()
	})
})
