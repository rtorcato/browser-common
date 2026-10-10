// Remark plugin: renders browser-support tables from @mdn/browser-compat-data
// (versions, notes, partial support) and web-features (Baseline status) at
// docs build time, so nothing here is hand-maintained except which BCD keys
// each module wraps.
//
// Markers, each on a line of its own:
//   ::browser-support[clipboard]   per-module table
//   ::browser-support[matrix]      one row per module, with Baseline
//
// An unknown module or BCD key fails the build, so a BCD bump that renames a
// key surfaces here instead of silently dropping a table.

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const bcd = require('@mdn/browser-compat-data')
const { features } = require('web-features/data.json')

/** Module name → the BCD keys of the Web API it wraps. The first key is the one the matrix shows. */
export const MODULE_APIS = {
	alert: ['api.Window.alert', 'api.Window.confirm', 'api.Window.prompt'],
	backgroundtasks: ['api.SyncManager'],
	battery: ['api.Navigator.getBattery'],
	broadcastchannel: ['api.BroadcastChannel'],
	canvas: ['api.HTMLCanvasElement', 'api.CanvasRenderingContext2D'],
	clipboard: ['api.Clipboard.writeText', 'api.Clipboard.readText'],
	common: ['api.Navigator.userAgent', 'api.Navigator.language'],
	cookies: ['api.Document.cookie'],
	dom: ['api.Document.querySelector', 'api.Document.createElement'],
	draganddrop: ['api.DataTransfer', 'api.HTMLElement.draggable'],
	encodingapis: ['api.TextEncoder', 'api.TextDecoder'],
	filesystem: ['api.Window.showOpenFilePicker', 'api.Window.showSaveFilePicker'],
	focus: ['api.HTMLElement.focus', 'api.Document.activeElement'],
	forms: ['api.FormData', 'api.HTMLFormElement.reportValidity'],
	fullscreen: ['api.Element.requestFullscreen', 'api.Document.exitFullscreen'],
	geolocation: ['api.Geolocation.getCurrentPosition', 'api.Geolocation.watchPosition'],
	history: ['api.History.pushState', 'api.History.replaceState'],
	htmlmedia: ['api.HTMLMediaElement.play', 'api.HTMLMediaElement.pause'],
	idle: ['api.IdleDetector', 'api.Window.requestIdleCallback'],
	iframe: ['api.HTMLIFrameElement.contentWindow'],
	intersection: ['api.IntersectionObserver'],
	keyboard: ['api.KeyboardEvent.key'],
	localstorage: ['api.Window.localStorage'],
	location: ['api.Location'],
	mediadevices: ['api.MediaDevices.getUserMedia', 'api.MediaDevices.enumerateDevices'],
	motion: ['api.DeviceMotionEvent', 'api.DeviceMotionEvent.requestPermission_static'],
	mutationobserver: ['api.MutationObserver'],
	notifications: ['api.Notification', 'api.Notification.requestPermission_static'],
	orientation: ['api.DeviceOrientationEvent', 'api.ScreenOrientation'],
	performance: ['api.Performance.mark', 'api.Performance.measure'],
	permissions: ['api.Permissions.query'],
	pointerevents: ['api.PointerEvent'],
	print: ['api.Window.print'],
	resizeobserver: ['api.ResizeObserver'],
	screen: ['api.Screen'],
	screencapture: ['api.MediaDevices.getDisplayMedia'],
	selectionapi: ['api.Selection', 'api.Window.getSelection'],
	serviceworkers: ['api.ServiceWorkerContainer.register'],
	sessionstorage: ['api.Window.sessionStorage'],
	touchevents: ['api.TouchEvent'],
	urlpattern: ['api.URLPattern'],
	vibrate: ['api.Navigator.vibrate'],
	viewtransitions: ['api.Document.startViewTransition'],
	visibility: ['api.Document.visibilityState', 'api.Document.visibilitychange_event'],
	visualviewport: ['api.VisualViewport'],
	webanimations: ['api.Element.animate'],
	webauthn: ['api.PublicKeyCredential', 'api.CredentialsContainer.create'],
	weblocks: ['api.LockManager.request'],
	webshare: ['api.Navigator.share', 'api.Navigator.canShare'],
	websockets: ['api.WebSocket'],
	window: ['api.Window.scrollTo', 'api.Window.open'],
}

const BROWSERS = [
	['chrome', 'Chrome'],
	['edge', 'Edge'],
	['firefox', 'Firefox'],
	['safari', 'Safari'],
	['safari_ios', 'iOS Safari'],
]

const BASELINE = {
	high: 'Widely available',
	low: 'Newly available',
	false: 'Limited',
}

// BCD key → Baseline status, from every feature's per-key breakdown.
const baselineByKey = new Map()
for (const feature of Object.values(features)) {
	for (const [key, status] of Object.entries(feature.status?.by_compat_key ?? {})) {
		baselineByKey.set(key, status.baseline)
	}
}

function compatFor(key) {
	const compat = key.split('.').reduce((node, part) => node?.[part], bcd)?.__compat
	if (!compat) throw new Error(`remark-browser-support: no BCD entry for "${key}"`)
	return compat
}

export function baselineFor(key) {
	return baselineByKey.has(key) ? BASELINE[String(baselineByKey.get(key))] : '—'
}

// ponytail: a char scan, not a tag regex, so no `<` or `>` can survive (CodeQL js/incomplete-multi-character-sanitization).
const stripMarkup = (text) => {
	let out = ''
	let inTag = false
	for (const c of text) {
		if (c === '<') inTag = true
		else if (c === '>') inTag = false
		else if (!inTag) out += c
	}
	return out.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()
}

/** One browser's support as `{ text, notes }`, from BCD's current (first unflagged) statement. */
export function supportCell(compat, browser) {
	const statements = [compat.support[browser] ?? []].flat()
	const statement = statements.find((s) => !s.flags)
	if (!statement && statements.length) return { text: '❌ flag only', notes: [] }
	const notes = [statement?.notes ?? []].flat().map(stripMarkup)
	const added = statement?.version_added
	if (added == null) return { text: '?', notes }
	if (added === false) return { text: '❌', notes }
	if (statement.version_removed)
		return { text: `❌ removed in ${statement.version_removed}`, notes }
	const partial = statement.partial_implementation || statement.prefix || statement.alternative_name
	const version = added === 'preview' ? 'preview' : `${added}+`
	return { text: `${partial ? '◐ partial' : '✅'} ${version}`, notes }
}

// ponytail: keyword scan of BCD notes plus BCD's sparse secure_context_required
// subfeatures. BCD has no structured field for gestures/permissions; switch to
// one if it ever grows it.
export function requirementsFor(keys) {
	const found = new Set()
	for (const key of keys) {
		const parent = key.split('.').slice(0, 2).join('.')
		for (const k of [key, parent]) {
			const node = k.split('.').reduce((n, part) => n?.[part], bcd)
			if (node?.secure_context_required) found.add('secure context (HTTPS)')
		}
		const compat = compatFor(key)
		const notes = BROWSERS.flatMap(([b]) => supportCell(compat, b).notes).join(' ')
		if (/secure context|HTTPS/i.test(notes)) found.add('secure context (HTTPS)')
		if (/user gesture|user activation|transient activation/i.test(notes))
			found.add('a user gesture')
		if (/permission/i.test(notes)) found.add('a permission grant')
	}
	return [...found]
}

// --- mdast builders -------------------------------------------------------

const text = (value) => ({ type: 'text', value })
const code = (value) => ({ type: 'inlineCode', value })
const link = (url, children) => ({ type: 'link', url, children })
const cell = (...children) => ({ type: 'tableCell', children })
const row = (cells) => ({ type: 'tableRow', children: cells })
const table = (header, rows) => ({
	type: 'table',
	align: header.map(() => null),
	children: [row(header.map((h) => cell(text(h)))), ...rows],
})
const paragraph = (...children) => ({ type: 'paragraph', children })

const caniuseUrl = (key) => `https://caniuse.com/mdn-${key.replaceAll('.', '_').toLowerCase()}`

/** The per-module section: support table, footnoted notes, requirements, sources. */
export function moduleNodes(name) {
	const keys = MODULE_APIS[name]
	if (!keys) throw new Error(`remark-browser-support: unknown module "${name}"`)

	const footnotes = [] // [note, [browser labels]]
	const footnoteRef = (note, label) => {
		let i = footnotes.findIndex(([n]) => n === note)
		if (i === -1) i = footnotes.push([note, []]) - 1
		if (!footnotes[i][1].includes(label)) footnotes[i][1].push(label)
		return i + 1
	}

	const rows = keys.map((key) => {
		const compat = compatFor(key)
		const name = key.replace(/^api\./, '').replace(/_static$/, '')
		return row([
			cell(compat.mdn_url ? link(compat.mdn_url, [code(name)]) : code(name)),
			...BROWSERS.map(([b, label]) => {
				const { text: t, notes } = supportCell(compat, b)
				const refs = notes.map((n) => footnoteRef(n, label))
				return cell(text(refs.length ? `${t} [${refs.join(',')}]` : t))
			}),
			cell(text(baselineFor(key))),
		])
	})

	const nodes = [
		{ type: 'heading', depth: 2, children: [text('Browser support')] },
		table(['API', ...BROWSERS.map(([, l]) => l), 'Baseline'], rows),
	]
	if (footnotes.length) {
		nodes.push({
			type: 'list',
			ordered: true,
			spread: false,
			children: footnotes.map(([note, labels]) => ({
				type: 'listItem',
				spread: false,
				children: [paragraph(text(`${labels.join(', ')}: ${note}`))],
			})),
		})
	}
	const needs = requirementsFor(keys)
	if (needs.length) {
		nodes.push(
			paragraph({ type: 'strong', children: [text('Needs:')] }, text(` ${needs.join(', ')}`))
		)
	}
	nodes.push(
		paragraph(
			text('✅ supported · ◐ partial · ❌ not supported · [n] see note. Generated from '),
			link('https://github.com/mdn/browser-compat-data', [text('MDN browser-compat-data')]),
			text(' and '),
			link('https://web-platform-dx.github.io/web-features/', [text('web-features')]),
			text('. caniuse: '),
			...keys.flatMap((key, i) => [
				...(i ? [text(' · ')] : []),
				link(caniuseUrl(key), [code(key.replace(/^api\./, ''))]),
			])
		)
	)
	return nodes
}

/** One row per module: its primary API, Baseline status, and per-browser versions. */
export function matrixNodes() {
	const rows = Object.entries(MODULE_APIS).map(([name, [key]]) => {
		const compat = compatFor(key)
		return row([
			cell(link(`/docs/modules/${name}`, [code(name)])),
			cell(text(baselineFor(key))),
			...BROWSERS.map(([b]) => cell(text(supportCell(compat, b).text))),
		])
	})
	return [table(['Module', 'Baseline', ...BROWSERS.map(([, l]) => l)], rows)]
}

// Docusaurus strips HTML comments from .md before remark runs, so the marker is
// a leaf directive (remark-directive ships with Docusaurus for admonitions).
export default function remarkBrowserSupport() {
	return (tree) => {
		tree.children = tree.children.flatMap((node) => {
			if (node.type !== 'leafDirective' || node.name !== 'browser-support') return [node]
			const target = node.children[0]?.value?.trim()
			return target === 'matrix' ? matrixNodes() : moduleNodes(target)
		})
	}
}
