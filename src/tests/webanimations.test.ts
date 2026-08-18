// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { animateElement, isWebAnimationsAvailable } from '../webanimations/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

const keyframes = [{ opacity: 0 }, { opacity: 1 }]

describe('webanimations', () => {
	it('isWebAnimationsAvailable requires animate on Element.prototype', () => {
		vi.stubGlobal('Element', undefined)
		expect(isWebAnimationsAvailable()).toBe(false)
		vi.stubGlobal('Element', { prototype: {} })
		expect(isWebAnimationsAvailable()).toBe(false)
		vi.stubGlobal('Element', { prototype: { animate: () => {} } })
		expect(isWebAnimationsAvailable()).toBe(true)
	})

	it('animateElement returns null and leaves the element untouched when unsupported', () => {
		vi.stubGlobal('Element', undefined)
		const animate = vi.fn()
		expect(animateElement({ animate } as unknown as Element, keyframes, 300)).toBeNull()
		expect(animate).not.toHaveBeenCalled()
	})

	it('animateElement forwards keyframes and timing and returns the Animation', () => {
		vi.stubGlobal('Element', { prototype: { animate: () => {} } })
		const animation = { id: 'fade' }
		const animate = vi.fn().mockReturnValue(animation)

		const result = animateElement({ animate } as unknown as Element, keyframes, 300)

		expect(result).toBe(animation)
		expect(animate).toHaveBeenCalledWith(keyframes, 300)
	})

	it('animateElement passes a full timing object through unchanged', () => {
		vi.stubGlobal('Element', { prototype: { animate: () => {} } })
		const animate = vi.fn()
		const options = { duration: 300, easing: 'ease-out', iterations: 2 }
		animateElement({ animate } as unknown as Element, keyframes, options)
		expect(animate).toHaveBeenCalledWith(keyframes, options)
	})
})
