/**
 * Creates a canvas element with the given width and height.
 * @param width The width of the canvas.
 * @param height The height of the canvas.
 * @returns The created HTMLCanvasElement.
 * @example
 * ```ts
 * import { createCanvas } from '@rtorcato/browser-common/canvas'
 * const canvas = createCanvas(640, 480)
 * document.body.append(canvas)
 * ```
 */
export function createCanvas(width: number, height: number): HTMLCanvasElement {
	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	return canvas
}

/**
 * Gets the 2D rendering context from a canvas element.
 * @param canvas The canvas element.
 * @returns The 2D rendering context, or null if not available.
 * @example
 * ```ts
 * import { createCanvas, getCanvasContext2D } from '@rtorcato/browser-common/canvas'
 * const ctx = getCanvasContext2D(createCanvas(100, 100))
 * ctx?.fillRect(0, 0, 50, 50)
 * ```
 */
export function getCanvasContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
	return canvas.getContext('2d')
}

/**
 * Clears the entire canvas.
 * @param canvas The canvas element to clear.
 * @example
 * ```ts
 * import { clearCanvas } from '@rtorcato/browser-common/canvas'
 * clearCanvas(myCanvas)
 * ```
 */
export function clearCanvas(canvas: HTMLCanvasElement): void {
	const ctx = getCanvasContext2D(canvas)
	if (ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
	}
}

/**
 * Draws an image onto a canvas.
 * @param canvas The canvas element.
 * @param image The image to draw (HTMLImageElement, HTMLCanvasElement, etc.).
 * @param dx The x coordinate.
 * @param dy The y coordinate.
 * @example
 * ```ts
 * import { drawImageOnCanvas } from '@rtorcato/browser-common/canvas'
 * drawImageOnCanvas(myCanvas, image, 10, 20)
 * ```
 */
export function drawImageOnCanvas(
	canvas: HTMLCanvasElement,
	image: CanvasImageSource,
	dx: number,
	dy: number
): void {
	const ctx = getCanvasContext2D(canvas)
	if (ctx) {
		ctx.drawImage(image, dx, dy)
	}
}

/**
 * Converts the canvas content to a data URL (base64 image string).
 * @param canvas The canvas element.
 * @param type The image MIME type (default: 'image/png').
 * @param quality The image quality for image/jpeg or image/webp (0 to 1).
 * @returns The data URL string.
 * @example
 * ```ts
 * import { canvasToDataURL } from '@rtorcato/browser-common/canvas'
 * const png = canvasToDataURL(myCanvas)
 * const jpg = canvasToDataURL(myCanvas, 'image/jpeg', 0.8)
 * ```
 */
export function canvasToDataURL(
	canvas: HTMLCanvasElement,
	type = 'image/png',
	quality?: number
): string {
	return canvas.toDataURL(type, quality)
}

/**
 * Fills the entire canvas with a given color.
 * @param canvas The canvas element.
 * @param color The fill color (CSS color string).
 * @example
 * ```ts
 * import { fillCanvas } from '@rtorcato/browser-common/canvas'
 * fillCanvas(myCanvas, '#fafafa')
 * ```
 */
export function fillCanvas(canvas: HTMLCanvasElement, color: string): void {
	const ctx = getCanvasContext2D(canvas)
	if (ctx) {
		ctx.save()
		ctx.fillStyle = color
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.restore()
	}
}
