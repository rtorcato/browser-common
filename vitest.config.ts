import base from '@rtorcato/js-tooling/vitest/config'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
	base,
	defineConfig({
		test: {
			coverage: {
				// Override the shared preset's js-tooling-specific include glob.
				include: ['src/**/*.ts'],
				exclude: ['src/tests/**', 'src/**/*.test.ts'],
				// Floor matches current baseline minus ~1 pt — fail on regression,
				// pass currently. Tighten as behavior tests cover more modules.
				thresholds: {
					statements: 10,
					branches: 8,
					functions: 12,
					lines: 11,
				},
			},
		},
	})
)
