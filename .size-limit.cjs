// Generates a size budget for every subpath export so a bundle regression in
// any module is caught in CI (issue #30). New modules are covered automatically
// as soon as they're added to package.json `exports` — no manual entry needed.
//
// The root '.' barrel is intentionally skipped: it re-exports every module, so
// its size grows legitimately with each new module and isn't a tree-shaking
// target. Per-module budgets below are what protect real consumers.
const pkg = require('./package.json')

// Tighter budgets for modules that should stay especially small.
const OVERRIDES = {
	'./clipboard': '500 B',
	'./geolocation': '500 B',
}
const DEFAULT_LIMIT = '1 kB'

module.exports = Object.entries(pkg.exports)
	.filter(([subpath, conditions]) => subpath !== '.' && conditions && conditions.import)
	.map(([subpath, conditions]) => ({
		name: `@rtorcato/browser-common${subpath.slice(1)}`,
		path: conditions.import.replace(/^\.\//, ''),
		limit: OVERRIDES[subpath] || DEFAULT_LIMIT,
	}))
