import { readFile } from 'node:fs/promises'
import { build } from 'esbuild'

const ownPkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'))
const config = ownPkg.treeshake

if (!config?.target || !Array.isArray(config.allowed) || config.allowed.length === 0) {
	console.error(
		'Missing or invalid `treeshake` config in package.json — need `target` (string) and `allowed` (non-empty array).'
	)
	process.exit(1)
}

const { target, allowed, ignored = [], entry = 'src/entry.ts' } = config

const targetPkgUrl = new URL(`./node_modules/${target}/package.json`, import.meta.url)
const targetPkg = JSON.parse(await readFile(targetPkgUrl, 'utf8'))
const exportKeys = Object.keys(targetPkg.exports ?? {})
	.filter((k) => k !== '.')
	.map((k) => k.replace(/^\.\//, ''))

const allowedSet = new Set(allowed)
const ignoredSet = new Set(ignored)
const forbidden = exportKeys.filter((k) => !allowedSet.has(k) && !ignoredSet.has(k))

const result = await build({
	entryPoints: [entry],
	bundle: true,
	format: 'esm',
	platform: 'browser',
	conditions: ['import', 'browser'],
	write: false,
	metafile: true,
	minify: false,
})

const inputs = Object.keys(result.metafile.inputs)
const distInputs = inputs.filter((p) => p.includes('/dist/'))
const leaks = distInputs.filter((p) => forbidden.some((m) => new RegExp(`/dist/${m}/`).test(p)))
const allowedInputs = distInputs.filter((p) =>
	allowed.some((m) => new RegExp(`/dist/${m}/`).test(p))
)

const bundleBytes = result.outputFiles?.[0]?.contents.byteLength ?? 0
const allowedLabel = allowed.join(', ')

console.log(`Bundle size: ${bundleBytes} bytes`)
console.log(`${target} dist inputs in bundle (${distInputs.length}):`)
for (const p of distInputs) console.log(`  ${p}`)

if (leaks.length > 0) {
	console.error(
		`\n❌ Tree-shaking leak — these modules should not appear in a ${allowedLabel}-only bundle:`
	)
	for (const p of leaks) console.error(`  ${p}`)
	process.exit(1)
}

if (allowedInputs.length === 0) {
	console.error(
		`\n❌ Expected at least one /dist/${allowed[0]}/ input — entry may have failed to resolve.`
	)
	process.exit(1)
}

console.log(`\n✅ Tree-shaking OK — only ${allowedLabel} inputs present.`)
