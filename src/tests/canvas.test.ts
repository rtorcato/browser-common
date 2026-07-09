// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	canvasToDataURL,
	clearCanvas,
	createCanvas,
	drawImageOnCanvas,
	fillCanvas,
	getCanvasContext2D,
} from '../canvas/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function fakeCtx() {
	return {
		clearRect: vi.fn(),
		drawImage: vi.fn(),
		fillRect: vi.fn(),
		save: vi.fn(),
		restore: vi.fn(),
		fillStyle: '',
	}
}

function fakeCanvas(ctx: ReturnType<typeof fakeCtx>) {
	return {
		width: 0,
		height: 0,
		getContext: vi.fn().mockReturnValue(ctx),
		toDataURL: vi.fn().mockReturnValue('data:image/png;base64,x'),
	} as unknown as HTMLCanvasElement
}

describe('canvas', () => {
	it('createCanvas builds a sized canvas element', () => {
		const canvas = fakeCanvas(fakeCtx())
		vi.stubGlobal('document', { createElement: vi.fn().mockReturnValue(canvas) })
		const c = createCanvas(640, 480)
		expect(c.width).toBe(640)
		expect(c.height).toBe(480)
	})

	it('getCanvasContext2D requests the 2d context', () => {
		const ctx = fakeCtx()
		const canvas = fakeCanvas(ctx)
		expect(getCanvasContext2D(canvas)).toBe(ctx)
		expect(canvas.getContext).toHaveBeenCalledWith('2d')
	})

	it('clearCanvas clears the full canvas area', () => {
		const ctx = fakeCtx()
		const canvas = fakeCanvas(ctx)
		;(canvas as { width: number }).width = 100
		;(canvas as { height: number }).height = 50
		clearCanvas(canvas)
		expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 100, 50)
	})

	it('drawImageOnCanvas draws at the given coordinates', () => {
		const ctx = fakeCtx()
		const canvas = fakeCanvas(ctx)
		const image = {} as CanvasImageSource
		drawImageOnCanvas(canvas, image, 10, 20)
		expect(ctx.drawImage).toHaveBeenCalledWith(image, 10, 20)
	})

	it('fillCanvas save/sets color/fills/restore', () => {
		const ctx = fakeCtx()
		const canvas = fakeCanvas(ctx)
		;(canvas as { width: number }).width = 30
		;(canvas as { height: number }).height = 40
		fillCanvas(canvas, '#fafafa')
		expect(ctx.save).toHaveBeenCalled()
		expect(ctx.fillStyle).toBe('#fafafa')
		expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 30, 40)
		expect(ctx.restore).toHaveBeenCalled()
	})

	it('canvasToDataURL forwards type and quality', () => {
		const canvas = fakeCanvas(fakeCtx())
		expect(canvasToDataURL(canvas, 'image/jpeg', 0.8)).toBe('data:image/png;base64,x')
		expect(canvas.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.8)
	})
})
