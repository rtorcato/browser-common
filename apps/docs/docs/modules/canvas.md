---
title: canvas
sidebar_label: canvas
---

# canvas

Small helpers for creating a canvas element and drawing to its 2D context.

**Import:** `@rtorcato/browser-common/canvas`

📖 [MDN: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## Example

```ts
import {
  createCanvas,
  fillCanvas,
  drawImageOnCanvas,
  canvasToDataURL,
} from '@rtorcato/browser-common/canvas'

const canvas = createCanvas(640, 480)
document.body.append(canvas)

fillCanvas(canvas, '#fafafa')
drawImageOnCanvas(canvas, image, 10, 20)

const png = canvasToDataURL(canvas)
```

## Exports

- `createCanvas(width, height)` — creates an `HTMLCanvasElement`
- `getCanvasContext2D(canvas)` — returns the 2D rendering context, or `null`
- `clearCanvas(canvas)` — clears the entire canvas
- `drawImageOnCanvas(canvas, image, dx, dy)` — draws an image onto the canvas
- `canvasToDataURL(canvas, type?, quality?)` — converts canvas content to a data URL
- `fillCanvas(canvas, color)` — fills the entire canvas with a color

See the [API reference](/docs/api/canvas) for full signatures.
