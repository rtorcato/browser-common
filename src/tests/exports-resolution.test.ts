import { fileURLToPath } from 'node:url'
import { runExportsResolutionTest } from '@rtorcato/repo-tooling/tests/exports-resolution'

runExportsResolutionTest({
	packageJsonPath: fileURLToPath(new URL('../../package.json', import.meta.url)),
	srcDir: fileURLToPath(new URL('../', import.meta.url)),
	excludeDirs: ['tests'],
})
