// @vitest-environment node

import { describe, expect, it, vi } from 'vitest'
import { enableFileDrop, enableTextDrop, makeDraggable } from '../draganddrop/index'

function fakeElement() {
	const handlers: Record<string, (e: unknown) => void> = {}
	const classes = new Set<string>()
	return {
		handlers,
		classes,
		el: {
			addEventListener: (t: string, h: (e: unknown) => void) => {
				handlers[t] = h
			},
			setAttribute: vi.fn(),
			classList: { add: (c: string) => classes.add(c), remove: (c: string) => classes.delete(c) },
		} as unknown as HTMLElement,
	}
}

const dragEvent = (dataTransfer: unknown) => ({
	preventDefault: vi.fn(),
	stopPropagation: vi.fn(),
	dataTransfer,
})

describe('draganddrop', () => {
	it('enableFileDrop toggles the dragover class and forwards dropped files', () => {
		const { el, handlers, classes } = fakeElement()
		const onDrop = vi.fn()
		enableFileDrop(el, onDrop)

		handlers.dragover(dragEvent(null))
		expect(classes.has('dragover')).toBe(true)
		handlers.dragleave(dragEvent(null))
		expect(classes.has('dragover')).toBe(false)

		const files = [{ name: 'a.txt' }]
		handlers.drop(dragEvent({ files }))
		expect(onDrop).toHaveBeenCalledWith(files)
	})

	it('enableFileDrop ignores an empty drop', () => {
		const { el, handlers } = fakeElement()
		const onDrop = vi.fn()
		enableFileDrop(el, onDrop)
		handlers.drop(dragEvent({ files: [] }))
		expect(onDrop).not.toHaveBeenCalled()
	})

	it('makeDraggable marks the element and seeds the drag data', () => {
		const { el, handlers } = fakeElement()
		makeDraggable(el, 'card-42', 'copy')
		expect(el.setAttribute).toHaveBeenCalledWith('draggable', 'true')

		const dt = { setData: vi.fn(), effectAllowed: '' }
		handlers.dragstart({ dataTransfer: dt })
		expect(dt.setData).toHaveBeenCalledWith('text/plain', 'card-42')
		expect(dt.effectAllowed).toBe('copy')
	})

	it('enableTextDrop forwards dropped plain text', () => {
		const { el, handlers } = fakeElement()
		const onDrop = vi.fn()
		enableTextDrop(el, onDrop)
		handlers.drop(dragEvent({ getData: () => 'hello' }))
		expect(onDrop).toHaveBeenCalledWith('hello')
	})
})
