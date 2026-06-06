import { copyToClipboard } from '@rtorcato/browser-common/clipboard'

export async function run() {
	return copyToClipboard('hello')
}
