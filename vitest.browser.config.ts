import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// Runs src/tests/browser/ in real headless Chromium. The default config runs the
// rest of src/tests/ in a DOM shim, which fakes or omits the very APIs these
// guards detect (#198).
export default defineConfig({
	test: {
		include: ['src/tests/browser/**/*.test.ts'],
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			instances: [{ browser: 'chromium' }],
		},
	},
})
