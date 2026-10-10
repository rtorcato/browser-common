/**
 * Wires dragover/dragleave/drop on a drop target and returns a cleanup function.
 */
function enableDropTarget(element: HTMLElement, onDrop: (e: DragEvent) => void): () => void {
	const over = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.add('dragover')
	}
	const leave = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.remove('dragover')
	}
	const drop = (e: Event) => {
		e.preventDefault()
		e.stopPropagation()
		element.classList.remove('dragover')
		onDrop(e as DragEvent)
	}
	element.addEventListener('dragover', over)
	element.addEventListener('dragleave', leave)
	element.addEventListener('drop', drop)
	return () => {
		element.removeEventListener('dragover', over)
		element.removeEventListener('dragleave', leave)
		element.removeEventListener('drop', drop)
		element.classList.remove('dragover')
	}
}

/**
 * Adds drag-and-drop event listeners to an element for basic file drop support.
 * @param element The element to attach listeners to.
 * @param onDrop Callback for when files are dropped.
 * @returns {() => void} A function that removes the listeners.
 * @example
 * ```ts
 * import { enableFileDrop } from '@rtorcato/browser-common/draganddrop'
 * const off = enableFileDrop(dropzone, (files) => upload(files))
 * off()
 * ```
 */
export function enableFileDrop(
	element: HTMLElement,
	onDrop: (files: FileList) => void
): () => void {
	return enableDropTarget(element, (e) => {
		const files = e.dataTransfer?.files
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
 * @returns {() => void} A function that removes the listener and the `draggable` attribute.
 * @example
 * ```ts
 * import { makeDraggable } from '@rtorcato/browser-common/draganddrop'
 * const off = makeDraggable(card, 'card-42')
 * off()
 * ```
 */
export function makeDraggable(
	element: HTMLElement,
	data: string,
	effectAllowed: DataTransfer['effectAllowed'] = 'move'
): () => void {
	const start = (e: Event) => {
		const dt = (e as DragEvent).dataTransfer
		if (dt) {
			dt.setData('text/plain', data)
			dt.effectAllowed = effectAllowed
		}
	}
	element.setAttribute('draggable', 'true')
	element.addEventListener('dragstart', start)
	return () => {
		element.removeEventListener('dragstart', start)
		element.removeAttribute('draggable')
	}
}

/**
 * Adds a drop target for plain text data.
 * @param element The element to act as a drop target.
 * @param onDrop Callback for when text is dropped.
 * @returns {() => void} A function that removes the listeners.
 * @example
 * ```ts
 * import { enableTextDrop } from '@rtorcato/browser-common/draganddrop'
 * const off = enableTextDrop(zone, (text) => console.log(text))
 * off()
 * ```
 */
export function enableTextDrop(element: HTMLElement, onDrop: (text: string) => void): () => void {
	return enableDropTarget(element, (e) => {
		const text = e.dataTransfer?.getData('text/plain')
		if (text) onDrop(text)
	})
}

/**
 * Removes drag-and-drop event listeners from an element.
 * @param element The element to remove listeners from.
 * @deprecated Call the cleanup function returned by `enableFileDrop`, `enableTextDrop` or
 * `makeDraggable` instead. This replaces the element with a clone, which strips every listener
 * on it (including other code's) and leaves existing references pointing at a detached node.
 * @example
 * ```ts
 * import { disableDragAndDrop } from '@rtorcato/browser-common/draganddrop'
 * disableDragAndDrop(dropzone)
 * ```
 */
export function disableDragAndDrop(element: HTMLElement): void {
	element.replaceWith(element.cloneNode(true))
}
