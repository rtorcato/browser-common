// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
	isFileSystemApiAvailable,
	pickFiles,
	readFileAsArrayBuffer,
	readFileAsText,
	saveFile,
	writeDataToFile,
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

	it('saveFile opens the save picker and returns a writable stream', async () => {
		const stream = { write: vi.fn() }
		const handle = { createWritable: vi.fn().mockResolvedValue(stream) }
		const showSaveFilePicker = vi.fn().mockResolvedValue(handle)
		vi.stubGlobal('window', { showOpenFilePicker: () => {}, showSaveFilePicker })

		const options = { suggestedName: 'notes.txt' }
		expect(await saveFile(options)).toBe(stream)
		expect(showSaveFilePicker).toHaveBeenCalledWith(options)
	})

	it('saveFile rejects when the API is unavailable', async () => {
		await expect(saveFile()).rejects.toThrow('not available')
	})

	it('pickFiles propagates a picker rejection (e.g. user cancels)', async () => {
		const abort = new Error('The user aborted a request.')
		vi.stubGlobal('window', { showOpenFilePicker: vi.fn().mockRejectedValue(abort) })
		await expect(pickFiles()).rejects.toBe(abort)
	})

	it('readFileAsArrayBuffer delegates to File.arrayBuffer()', async () => {
		const buf = new ArrayBuffer(4)
		const file = { arrayBuffer: vi.fn().mockResolvedValue(buf) } as unknown as File
		expect(await readFileAsArrayBuffer(file)).toBe(buf)
	})

	it('writeDataToFile writes the data then closes the stream', async () => {
		const calls: string[] = []
		const write = vi.fn(async () => {
			calls.push('write')
		})
		const close = vi.fn(async () => {
			calls.push('close')
		})
		const stream = { write, close } as unknown as FileSystemWritableFileStream
		const data = new ArrayBuffer(2)
		await writeDataToFile(stream, data)
		expect(write).toHaveBeenCalledWith(data)
		expect(calls).toEqual(['write', 'close'])
	})
})
