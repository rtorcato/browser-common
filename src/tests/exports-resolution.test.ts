import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const pkgPath = fileURLToPath(new URL('../../package.json', import.meta.url))
const srcDir = fileURLToPath(new URL('../', import.meta.url))

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { exports: Record<string, unknown> }

const exportSubpaths = new Set(
	Object.keys(pkg.exports)
		.filter((k) => k !== '.')
		.map((k) => k.replace(/^\.\//, ''))
)

const moduleDirs = readdirSync(srcDir, { withFileTypes: true })
	.filter((d) => d.isDirectory() && d.name !== 'tests')
	.map((d) => d.name)
	.sort()

describe('package.json exports map', () => {
	it('has at least one module', () => {
		expect(moduleDirs.length).toBeGreaterThan(0)
	})

	for (const dir of moduleDirs) {
		it(`exposes ./${dir}`, () => {
			expect(exportSubpaths.has(dir)).toBe(true)
		})
	}

	it('has no exports entries pointing at missing src/ folders', () => {
		const moduleDirSet = new Set(moduleDirs)
		const orphans = [...exportSubpaths].filter((k) => !moduleDirSet.has(k))
		expect(orphans).toEqual([])
	})
})
