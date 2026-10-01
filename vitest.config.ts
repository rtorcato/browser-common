import base from '@rtorcato/repo-tooling/vitest/config'
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
				// pass currently. Baseline 2026-10-01: 84.11 / 76.6 / 87.45 / 85.19.
				// Raise again when coverage climbs.
				thresholds: {
					statements: 83,
					branches: 75,
					functions: 86,
					lines: 84,
				},
			},
		},
	})
)
