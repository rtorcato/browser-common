/**
 * Selects a single element by CSS selector.
 * @param selector The CSS selector.
 * @param parent The parent element to search within (defaults to document).
 * @returns The first matching element or null.
 * @example
 * ```ts
 * import { $ } from '@rtorcato/browser-common/dom'
 * const btn = $('button.primary')
 * ```
 */
export function $(selector: string, parent: Document | Element = document): Element | null {
	return parent.querySelector(selector)
}

/**
 * Selects all elements matching a CSS selector.
 * @param selector The CSS selector.
 * @param parent The parent element to search within (defaults to document).
 * @returns An array of matching elements.
 * @example
 * ```ts
 * import { $$ } from '@rtorcato/browser-common/dom'
 * const items = $$('.item')
 * ```
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
 * @example
 * ```ts
 * import { createElement } from '@rtorcato/browser-common/dom'
 * const btn = createElement('button', { className: 'primary' }, 'Save')
 * ```
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
 * @example
 * ```ts
 * import { removeElement } from '@rtorcato/browser-common/dom'
 * removeElement(document.querySelector('.toast')!)
 * ```
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
 * @example
 * ```ts
 * import { setAttributes } from '@rtorcato/browser-common/dom'
 * setAttributes(input, { type: 'email', required: 'true' })
 * ```
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
 * @example
 * ```ts
 * import { addClass } from '@rtorcato/browser-common/dom'
 * addClass(el, 'active', 'highlighted')
 * ```
 */
export function addClass(el: Element, ...classes: string[]): void {
	el.classList.add(...classes)
}

/**
 * Removes one or more classes from an element.
 * @param el The element.
 * @param classes The classes to remove.
 * @example
 * ```ts
 * import { removeClass } from '@rtorcato/browser-common/dom'
 * removeClass(el, 'hidden')
 * ```
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
 * @example
 * ```ts
 * import { toggleClass } from '@rtorcato/browser-common/dom'
 * const isOpen = toggleClass(panel, 'open')
 * ```
 */
export function toggleClass(el: Element, className: string, force?: boolean): boolean {
	return el.classList.toggle(className, force)
}

/**
 * Checks if an element has a specific class.
 * @param el The element.
 * @param className The class to check.
 * @returns True if the element has the class, false otherwise.
 * @example
 * ```ts
 * import { hasClass } from '@rtorcato/browser-common/dom'
 * if (hasClass(el, 'active')) doSomething()
 * ```
 */
export function hasClass(el: Element, className: string): boolean {
	return el.classList.contains(className)
}

/**
 * Gets the value of a data-* attribute from an element.
 * @param el The element.
 * @param key The data attribute key (without 'data-').
 * @returns The value or undefined.
 * @example
 * ```ts
 * import { getData } from '@rtorcato/browser-common/dom'
 * const id = getData(el, 'userId')
 * ```
 */
export function getData(el: HTMLElement, key: string): string | undefined {
	return el.dataset ? el.dataset[key] : undefined
}

/**
 * Sets the value of a data-* attribute on an element.
 * @param el The element.
 * @param key The data attribute key (without 'data-').
 * @param value The value to set.
 * @example
 * ```ts
 * import { setData } from '@rtorcato/browser-common/dom'
 * setData(el, 'userId', '42')
 * ```
 */
export function setData(el: HTMLElement, key: string, value: string): void {
	if (el.dataset) {
		el.dataset[key] = value
	} else {
		el.setAttribute(`data-${key}`, value)
	}
}
