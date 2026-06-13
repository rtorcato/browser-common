import base from '@rtorcato/js-tooling/vitest/config'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
	base,
	defineConfig({
		test: {
			// Playwright specs live under apps/docs/tests/ and use
			// @playwright/test, not Vitest. Excluding them here prevents Vitest
			// from picking them up and erroring on `test.describe()` calls.
			exclude: ['**/node_modules/**', '**/dist/**', 'apps/docs/tests/**'],
			coverage: {
				// Floor matches current baseline minus ~1 pt — fail on regression,
				// pass currently. Tighten as behavior tests cover more modules.
				thresholds: {
					statements: 18,
					branches: 13,
					functions: 18,
					lines: 19,
				},
			},
		},
	})
)
