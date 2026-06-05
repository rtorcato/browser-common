/**
 * Serializes a form element into an object of key-value pairs.
 * @param form The HTMLFormElement to serialize.
 * @returns An object with form field names and values.
 * @example
 * ```ts
 * import { serializeForm } from '@rtorcato/browser-common/forms'
 * const data = serializeForm(myForm)
 * ```
 */
export function serializeForm(form: HTMLFormElement): Record<string, string> {
	const data: Record<string, string> = {}
	const formData = new FormData(form)
	formData.forEach((value, key) => {
		if (value !== null) {
			data[key] = String(value)
		}
	})
	return data
}

/**
 * Resets a form to its initial values.
 * @param form The HTMLFormElement to reset.
 * @example
 * ```ts
 * import { resetForm } from '@rtorcato/browser-common/forms'
 * resetForm(myForm)
 * ```
 */
export function resetForm(form: HTMLFormElement): void {
	form.reset()
}

/**
 * Sets values on a form from an object.
 * @param form The HTMLFormElement to update.
 * @param values An object of field names and values.
 * @example
 * ```ts
 * import { setFormValues } from '@rtorcato/browser-common/forms'
 * setFormValues(myForm, { name: 'Ada', email: 'a@b.co' })
 * ```
 */
export function setFormValues(form: HTMLFormElement, values: Record<string, string>): void {
	for (const [key, value] of Object.entries(values)) {
		const field = form.elements.namedItem(key) as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement
			| null
		if (field) field.value = value
	}
}

/**
 * Validates a form using the browser's built-in validation.
 * @param form The HTMLFormElement to validate.
 * @returns True if the form is valid, false otherwise.
 * @example
 * ```ts
 * import { isFormValid } from '@rtorcato/browser-common/forms'
 * if (isFormValid(myForm)) submit()
 * ```
 */
export function isFormValid(form: HTMLFormElement): boolean {
	return form.checkValidity()
}

/**
 * Adds a submit event listener to a form with preventDefault and callback.
 * @param form The HTMLFormElement to listen on.
 * @param callback The callback to run on submit.
 * @returns A function to remove the event listener.
 * @example
 * ```ts
 * import { onFormSubmit } from '@rtorcato/browser-common/forms'
 * const off = onFormSubmit(myForm, (e) => console.log('submitted'))
 * off()
 * ```
 */
export function onFormSubmit(
	form: HTMLFormElement,
	callback: (event: SubmitEvent) => void
): () => void {
	const handler = (event: Event) => {
		event.preventDefault()
		callback(event as SubmitEvent)
	}
	form.addEventListener('submit', handler)
	return () => form.removeEventListener('submit', handler)
}
