/**
 * Selects a single element by CSS selector.
 * @param selector The CSS selector.
 * @param parent The parent element to search within (defaults to document).
 * @returns The first matching element or null.
 */
export function $(selector: string, parent: Document | Element = document): Element | null {
	return parent.querySelector(selector)
}

/**
 * Selects all elements matching a CSS selector.
 * @param selector The CSS selector.
 * @param parent The parent element to search within (defaults to document).
 * @returns An array of matching elements.
 */
export function $$(selector: string, parent: Document | Element = document): Element[] {
	return Array.from(parent.querySelectorAll(selector))
}

/**
 * Creates a new DOM element with optional properties and children.
 * @param tag The tag name.
 * @param props Optional properties/attributes.
 * @param children Optional child elements or strings.
 * @returns The created element.
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	props: Partial<HTMLElementTagNameMap[K]> = {},
	...children: (HTMLElement | string)[]
): HTMLElementTagNameMap[K] {
	const el = document.createElement(tag)
	Object.assign(el, props)
	for (const child of children) {
		el.append(child)
	}
	return el
}

/**
 * Removes an element from the DOM.
 * @param el The element to remove.
 */
export function removeElement(el: Element): void {
	if (el.parentNode) {
		el.parentNode.removeChild(el)
	}
}

/**
 * Sets multiple attributes on an element.
 * @param el The element.
 * @param attrs An object of attribute key-value pairs.
 */
export function setAttributes(el: Element, attrs: Record<string, string>): void {
	for (const [key, value] of Object.entries(attrs)) {
		el.setAttribute(key, value)
	}
}

/**
 * Adds one or more classes to an element.
 * @param el The element.
 * @param classes The classes to add.
 */
export function addClass(el: Element, ...classes: string[]): void {
	el.classList.add(...classes)
}

/**
 * Removes one or more classes from an element.
 * @param el The element.
 * @param classes The classes to remove.
 */
export function removeClass(el: Element, ...classes: string[]): void {
	el.classList.remove(...classes)
}

/**
 * Toggles a class on an element.
 * @param el The element.
 * @param className The class to toggle.
 * @param force Optional boolean to force add/remove.
 * @returns True if the class is now present, false otherwise.
 */
export function toggleClass(el: Element, className: string, force?: boolean): boolean {
	return el.classList.toggle(className, force)
}

/**
 * Checks if an element has a specific class.
 * @param el The element.
 * @param className The class to check.
 * @returns True if the element has the class, false otherwise.
 */
export function hasClass(el: Element, className: string): boolean {
	return el.classList.contains(className)
}

/**
 * Gets the value of a data-* attribute from an element.
 * @param el The element.
 * @param key The data attribute key (without 'data-').
 * @returns The value or undefined.
 */
export function getData(el: HTMLElement, key: string): string | undefined {
	return el.dataset ? el.dataset[key] : undefined
}

/**
 * Sets the value of a data-* attribute on an element.
 * @param el The element.
 * @param key The data attribute key (without 'data-').
 * @param value The value to set.
 */
export function setData(el: HTMLElement, key: string, value: string): void {
	if (el.dataset) {
		el.dataset[key] = value
	} else {
		el.setAttribute(`data-${key}`, value)
	}
}
