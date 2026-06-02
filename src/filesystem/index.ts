/**
 * Checks if the File System Access API is available in the browser.
 * @returns {boolean} True if available, false otherwise.
 */
export function isFileSystemApiAvailable(): boolean {
	return typeof window !== 'undefined' && 'showOpenFilePicker' in window
}

/**
 * Prompts the user to select files and returns the selected File objects.
 * @param options File picker options.
 * @returns {Promise<File[]>} The selected files.
 */
// Type definition for OpenFilePickerOptions (from File System Access API)
type OpenFilePickerOptions = {
	types?: Array<{
		description?: string
		accept?: Record<string, string[]>
	}>
	excludeAcceptAllOption?: boolean
	multiple?: boolean
}

// Type definition for SaveFilePickerOptions (from File System Access API)
type SaveFilePickerOptions = {
	types?: Array<{
		description?: string
		accept?: Record<string, string[]>
	}>
	excludeAcceptAllOption?: boolean
	suggestedName?: string
}

export async function pickFiles(options?: OpenFilePickerOptions): Promise<File[]> {
	if (!isFileSystemApiAvailable()) throw new Error('File System Access API not available')
	// @ts-expect-error
	const handles = await window.showOpenFilePicker(options)
	const files = await Promise.all(handles.map((handle: FileSystemFileHandle) => handle.getFile()))
	return files
}

/**
 * Prompts the user to save a file and returns a writable file handle.
 * @param options Save file picker options.
 * @returns {Promise<FileSystemWritableFileStream>} The writable file stream.
 */
export async function saveFile(
	options?: SaveFilePickerOptions
): Promise<FileSystemWritableFileStream> {
	if (!isFileSystemApiAvailable()) throw new Error('File System Access API not available')
	// @ts-expect-error
	const handle = await window.showSaveFilePicker(options)
	return await handle.createWritable()
}

/**
 * Reads the contents of a File as text.
 * @param file The File object to read.
 * @returns {Promise<string>} The file contents as a string.
 */
export function readFileAsText(file: File): Promise<string> {
	return file.text()
}

/**
 * Reads the contents of a File as an ArrayBuffer.
 * @param file The File object to read.
 * @returns {Promise<ArrayBuffer>} The file contents as an ArrayBuffer.
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
	return file.arrayBuffer()
}

/**
 * Writes text to a writable file stream.
 * @param stream The writable file stream.
 * @param text The text to write.
 * @returns {Promise<void>}
 */
export async function writeTextToFile(
	stream: FileSystemWritableFileStream,
	text: string
): Promise<void> {
	await stream.write(text)
	await stream.close()
}

/**
 * Writes a Blob or ArrayBuffer to a writable file stream.
 * @param stream The writable file stream.
 * @param data The Blob or ArrayBuffer to write.
 * @returns {Promise<void>}
 */
export async function writeDataToFile(
	stream: FileSystemWritableFileStream,
	data: Blob | ArrayBuffer
): Promise<void> {
	await stream.write(data)
	await stream.close()
}
