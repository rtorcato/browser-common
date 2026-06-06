import { build } from 'esbuild'

const ALLOWED_MODULES = ['clipboard']

const FORBIDDEN_MODULES = [
	'alert',
	'backgroundtasks',
	'battery',
	'canvas',
	'cookies',
	'dom',
	'draganddrop',
	'encodingapis',
	'filesystem',
	'focus',
	'forms',
	'fullscreen',
	'geolocation',
	'history',
	'htmlmedia',
	'idle',
	'iframe',
	'intersection',
	'keyboard',
	'localstorage',
	'location',
	'mediadevices',
	'motion',
	'mutationobserver',
	'notifications',
	'orientation',
	'performance',
	'permissions',
	'print',
	'resizeobserver',
	'screen',
	'selectionapi',
	'serviceworkers',
	'sessionstorage',
	'vibrate',
	'visualviewport',
	'weblocks',
	'webshare',
	'websockets',
	'window',
]

const result = await build({
	entryPoints: ['src/entry.ts'],
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
const leaks = distInputs.filter((p) =>
	FORBIDDEN_MODULES.some((m) => new RegExp(`/dist/${m}/`).test(p))
)
const allowed = distInputs.filter((p) =>
	ALLOWED_MODULES.some((m) => new RegExp(`/dist/${m}/`).test(p))
)

const bundleBytes = result.outputFiles?.[0]?.contents.byteLength ?? 0

console.log(`Bundle size: ${bundleBytes} bytes`)
console.log(`browser-common dist inputs in bundle (${distInputs.length}):`)
for (const p of distInputs) console.log(`  ${p}`)

if (leaks.length > 0) {
	console.error('\n❌ Tree-shaking leak — these modules should not be in a clipboard-only bundle:')
	for (const p of leaks) console.error(`  ${p}`)
	process.exit(1)
}

if (allowed.length === 0) {
	console.error(
		'\n❌ Expected at least one /dist/clipboard/ input — entry may have failed to resolve.'
	)
	process.exit(1)
}

console.log('\n✅ Tree-shaking OK — only clipboard inputs present.')
