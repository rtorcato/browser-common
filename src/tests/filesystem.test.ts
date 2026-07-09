// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isFileSystemApiAvailable,
	pickFiles,
	readFileAsText,
	writeTextToFile,
} from '../filesystem/index'

afterEach(() => {
	vi.unstubAllGlobals()
})

describe('filesystem', () => {
	it('isFileSystemApiAvailable reflects window.showOpenFilePicker presence', () => {
		expect(isFileSystemApiAvailable()).toBe(false)
		vi.stubGlobal('window', { showOpenFilePicker: () => {} })
		expect(isFileSystemApiAvailable()).toBe(true)
	})

	it('pickFiles resolves handles to File objects', async () => {
		const file = { name: 'a.txt' }
		const handle = { getFile: vi.fn().mockResolvedValue(file) }
		vi.stubGlobal('window', {
			showOpenFilePicker: vi.fn().mockResolvedValue([handle]),
		})
		expect(await pickFiles({ multiple: true })).toEqual([file])
	})

	it('pickFiles throws when the API is unavailable', async () => {
		await expect(pickFiles()).rejects.toThrow('not available')
	})

	it('readFileAsText delegates to File.text()', async () => {
		const file = { text: vi.fn().mockResolvedValue('contents') } as unknown as File
		expect(await readFileAsText(file)).toBe('contents')
	})

	it('writeTextToFile writes then closes the stream', async () => {
		const write = vi.fn().mockResolvedValue(undefined)
		const close = vi.fn().mockResolvedValue(undefined)
		const stream = { write, close } as unknown as FileSystemWritableFileStream
		await writeTextToFile(stream, 'hello')
		expect(write).toHaveBeenCalledWith('hello')
		expect(close).toHaveBeenCalled()
	})
})
