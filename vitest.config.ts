import base from '@rtorcato/repo-tooling/vitest/config'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
	base,
	defineConfig({
		test: {
			// Playwright specs live under apps/docs/tests/ and use
			// @playwright/test, not Vitest. Excluding them here prevents Vitest
			// from picking them up and erroring on `test.describe()` calls.
			// src/tests/browser/ needs real Chromium — see vitest.browser.config.ts.
			exclude: ['**/node_modules/**', '**/dist/**', 'apps/docs/tests/**', 'src/tests/browser/**'],
			coverage: {
				// Floor tracks CI's `test (node 22)` coverage minus ~1-2 pts — fail on
				// regression, pass currently. CI baseline 2026-10-01: 72.81 / 58.47 /
				// 70.96 / 74.77 (local runs report higher; CI is the source of truth).
				// Raise again when coverage climbs.
				thresholds: {
					statements: 71,
					branches: 57,
					functions: 69,
					lines: 73,
				},
			},
		},
	})
)
