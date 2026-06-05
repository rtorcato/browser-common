/**
 * Adds drag-and-drop event listeners to an element for basic file drop support.
 * @param element The element to attach listeners to.
 * @param onDrop Callback for when files are dropped.
 * @example
 * ```ts
 * import { enableFileDrop } from '@rtorcato/browser-common/draganddrop'
 * enableFileDrop(dropzone, (files) => upload(files))
 * ```
 */
export function enableFileDrop(element: HTMLElement, onDrop: (files: FileList) => void): void {
	element.addEventListener('dragover', (e) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.add('dragover')
	})
	element.addEventListener('dragleave', (e) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.remove('dragover')
	})
	element.addEventListener('drop', (e) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.remove('dragover')
		const files = (e as DragEvent).dataTransfer?.files
		if (files && files.length > 0) {
			onDrop(files)
		}
	})
}

/**
 * Sets up an element as draggable and attaches dragstart event.
 * @param element The element to make draggable.
 * @param data The data to set for the drag event.
 * @param effectAllowed The allowed drag effect (e.g., 'move', 'copy').
 * @example
 * ```ts
 * import { makeDraggable } from '@rtorcato/browser-common/draganddrop'
 * makeDraggable(card, 'card-42')
 * ```
 */
export function makeDraggable(
	element: HTMLElement,
	data: string,
	effectAllowed: DataTransfer['effectAllowed'] = 'move'
): void {
	element.setAttribute('draggable', 'true')
	element.addEventListener('dragstart', (e) => {
		const dt = (e as DragEvent).dataTransfer
		if (dt) {
			dt.setData('text/plain', data)
			dt.effectAllowed = effectAllowed
		}
	})
}

/**
 * Adds a drop target for plain text data.
 * @param element The element to act as a drop target.
 * @param onDrop Callback for when text is dropped.
 * @example
 * ```ts
 * import { enableTextDrop } from '@rtorcato/browser-common/draganddrop'
 * enableTextDrop(zone, (text) => console.log(text))
 * ```
 */
export function enableTextDrop(element: HTMLElement, onDrop: (text: string) => void): void {
	element.addEventListener('dragover', (e) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.add('dragover')
	})
	element.addEventListener('dragleave', (e) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.remove('dragover')
	})
	element.addEventListener('drop', (e) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.remove('dragover')
		const dt = (e as DragEvent).dataTransfer
		if (dt) {
			const text = dt.getData('text/plain')
			if (text) onDrop(text)
		}
	})
}

/**
 * Removes drag-and-drop event listeners from an element.
 * @param element The element to remove listeners from.
 * @example
 * ```ts
 * import { disableDragAndDrop } from '@rtorcato/browser-common/draganddrop'
 * disableDragAndDrop(dropzone)
 * ```
 */
export function disableDragAndDrop(element: HTMLElement): void {
	// This is a simple implementation; for more complex cases, store references to handlers.
	element.replaceWith(element.cloneNode(true))
}
