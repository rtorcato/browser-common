// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createURLPattern, isURLPatternAvailable, matchURLPattern } from '../urlpattern/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('urlpattern (unsupported runtime)', () => {
	// The guard is `'URLPattern' in globalThis`, so faking absence means actually
	// removing the key (stubbing to `undefined` leaves `in` true). Some Node
	// versions ship URLPattern natively, so capture and restore the original.
	let original: PropertyDescriptor | undefined

	beforeEach(() => {
		original = Reflect.getOwnPropertyDescriptor(globalThis, 'URLPattern')
		Reflect.deleteProperty(globalThis, 'URLPattern')
	})

	afterEach(() => {
		if (original) Object.defineProperty(globalThis, 'URLPattern', original)
	})

	it('reports unavailable and both helpers throw', () => {
		expect(isURLPatternAvailable()).toBe(false)
		expect(() => createURLPattern({ pathname: '/x' })).toThrow('requires an environment')
		expect(() => matchURLPattern({ pathname: '/x' }, 'https://e.com/x')).toThrow(
			'requires an environment'
		)
	})
})

describe('urlpattern (supported runtime)', () => {
	// Minimal fake standing in for the platform URLPattern, recording how the
	// wrapper constructs and delegates to it.
	class FakeURLPattern {
		args: unknown[]
		constructor(...args: unknown[]) {
			this.args = args
		}
		exec(input: string) {
			return input === 'https://e.com/users/42' ? { pathname: { groups: { id: '42' } } } : null
		}
	}

	it('constructs a pattern, passing through input and optional baseURL', () => {
		vi.stubGlobal('URLPattern', FakeURLPattern)
		expect(isURLPatternAvailable()).toBe(true)

		const a = createURLPattern({ pathname: '/users/:id' }) as unknown as FakeURLPattern
		expect(a.args).toEqual([{ pathname: '/users/:id' }])

		const b = createURLPattern('/users/:id', 'https://e.com') as unknown as FakeURLPattern
		expect(b.args).toEqual(['/users/:id', 'https://e.com'])
	})

	it('matchURLPattern delegates to exec, returning the result or null', () => {
		vi.stubGlobal('URLPattern', FakeURLPattern)
		const hit = matchURLPattern({ pathname: '/users/:id' }, 'https://e.com/users/42')
		expect(hit?.pathname.groups.id).toBe('42')
		expect(matchURLPattern({ pathname: '/users/:id' }, 'https://e.com/nope')).toBeNull()
	})
})
