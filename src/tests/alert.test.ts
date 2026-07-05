// @vitest-environment node

import { expect, test } from 'vitest'
import { showAlert, showConfirm, showPrompt } from '../alert/index'

test('alert helpers throw a useful error outside a browser', () => {
	expect(() => showAlert('hi')).toThrow('requires a browser environment')
	expect(() => showConfirm('ok?')).toThrow('requires a browser environment')
	expect(() => showPrompt('name?')).toThrow('requires a browser environment')
})
