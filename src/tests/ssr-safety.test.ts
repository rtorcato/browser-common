// @vitest-environment node

import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = fileURLToPath(new URL('../', import.meta.url))

const moduleDirs = readdirSync(srcDir, { withFileTypes: true })
	.filter((d) => d.isDirectory() && d.name !== 'tests')
	.map((d) => d.name)
	.sort()

describe('SSR / Node safety', () => {
	it('discovers at least one module', () => {
		expect(moduleDirs.length).toBeGreaterThan(0)
	})

	for (const dir of moduleDirs) {
		it(`imports ${dir} without throwing in Node (no window/document/navigator)`, async () => {
			await expect(import(`../${dir}/index.ts`)).resolves.toBeDefined()
		})
	}
})
