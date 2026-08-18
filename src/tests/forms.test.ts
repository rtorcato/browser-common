// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import { isFormValid, onFormSubmit, resetForm, serializeForm, setFormValues } from '../forms/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

function fakeForm(fields: Record<string, { value: string }> = {}) {
	const handlers: Record<string, (event: Event) => void> = {}
	const form = {
		elements: { namedItem: (name: string) => fields[name] ?? null },
		reset: vi.fn(),
		checkValidity: vi.fn().mockReturnValue(false),
		addEventListener: (type: string, handler: (event: Event) => void) => {
			handlers[type] = handler
		},
		removeEventListener: vi.fn(),
	}
	return { handlers, form: form as unknown as HTMLFormElement, spies: form }
}

describe('forms', () => {
	it('serializeForm stringifies every FormData entry keyed by field name', () => {
		let source: unknown = null
		const entries: [string, unknown][] = [
			['name', 'Ada'],
			['age', 36],
		]
		class FakeFormData {
			constructor(form: unknown) {
				source = form
			}
			forEach(callback: (value: unknown, key: string) => void) {
				for (const [key, value] of entries) callback(value, key)
			}
		}
		vi.stubGlobal('FormData', FakeFormData)

		const { form } = fakeForm()
		expect(serializeForm(form)).toEqual({ name: 'Ada', age: '36' })
		expect(source).toBe(form)
	})

	it('setFormValues writes matching fields and skips names the form does not have', () => {
		const name = { value: '' }
		const email = { value: 'old@example.com' }
		const { form } = fakeForm({ name, email })

		setFormValues(form, { name: 'Ada', email: 'ada@example.com', nope: 'ignored' })

		expect(name.value).toBe('Ada')
		expect(email.value).toBe('ada@example.com')
	})

	it('onFormSubmit suppresses the native submit and forwards the event', () => {
		const { form, handlers, spies } = fakeForm()
		const callback = vi.fn()
		const off = onFormSubmit(form, callback)

		const preventDefault = vi.fn()
		const event = { preventDefault } as unknown as SubmitEvent
		const handler = handlers.submit
		handler(event)

		expect(preventDefault).toHaveBeenCalledTimes(1)
		expect(callback).toHaveBeenCalledWith(event)

		off()
		expect(spies.removeEventListener).toHaveBeenCalledWith('submit', handler)
	})

	it('resetForm and isFormValid delegate to the form element', () => {
		const { form, spies } = fakeForm()
		resetForm(form)
		expect(spies.reset).toHaveBeenCalledTimes(1)
		expect(isFormValid(form)).toBe(false)
		expect(spies.checkValidity).toHaveBeenCalledTimes(1)
	})
})
