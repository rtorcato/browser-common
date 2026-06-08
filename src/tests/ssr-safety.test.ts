// @vitest-environment node

import { fileURLToPath } from 'node:url'
import { runSsrSafetyTest } from '@rtorcato/js-tooling/tests/ssr-safety'

runSsrSafetyTest({
	srcDir: fileURLToPath(new URL('../', import.meta.url)),
	excludeDirs: ['tests'],
})
