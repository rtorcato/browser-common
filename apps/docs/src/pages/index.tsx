import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import type { ReactElement } from 'react'
import InstallTabs from '@site/src/components/InstallTabs'
import styles from './index.module.css'

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconKey = 'gauge' | 'shield' | 'brackets' | 'globe'

type IconProps = {
	icon: IconKey
	title: string
	className?: string
	size?: number
}

function Icon({ icon, title, className, size = 22 }: IconProps): ReactElement {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			role="img"
		>
			<title>{title}</title>
			{ICONS[icon]}
		</svg>
	)
}

const ICONS: Record<IconKey, ReactElement> = {
	gauge: (
		<>
			<path d="M12 14l4-4" />
			<path d="M3.5 17a9 9 0 0 1 17 0" />
			<circle cx="12" cy="14" r="1.2" fill="currentColor" />
		</>
	),
	shield: (
		<>
			<path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6z" />
			<path d="m9 12 2 2 4-4" />
		</>
	),
	brackets: (
		<>
			<path d="m9 8-5 4 5 4" />
			<path d="m15 8 5 4-5 4" />
		</>
	),
	globe: (
		<>
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18" />
			<path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
		</>
	),
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Pillar = {
	title: string
	desc: string
	icon: IconKey
}

const PILLARS: Pillar[] = [
	{
		title: 'Tiny per-module imports',
		desc: '146–257 B brotlied per subpath. Tree-shake to just the bytes you use.',
		icon: 'gauge',
	},
	{
		title: 'Safe by default',
		desc: 'Every module exports `is<Name>Available()`. Operations never throw on unsupported runtimes.',
		icon: 'shield',
	},
	{
		title: 'TypeScript-first',
		desc: 'Strict types, generics preserved, JSDoc-rich in your IDE. Zero runtime dependencies.',
		icon: 'brackets',
	},
	{
		title: '44 Web APIs covered',
		desc: 'One subpath per spec — clipboard, geolocation, storage, observers, and 40 more.',
		icon: 'globe',
	},
]

type Category = {
	name: string
	count: number
	desc: string
	chips: string[]
}

const CATEGORIES: Category[] = [
	{
		name: 'Storage',
		count: 4,
		desc: 'Local, session, cookies, and the File System Access API.',
		chips: ['localstorage', 'sessionstorage', 'cookies', 'filesystem'],
	},
	{
		name: 'Sensors',
		count: 7,
		desc: 'Battery, geolocation, motion, orientation, idle and screen state.',
		chips: ['battery', 'geolocation', 'motion', 'orientation'],
	},
	{
		name: 'Input',
		count: 8,
		desc: 'Clipboard, drag-and-drop, focus, forms, keyboard, pointer and touch.',
		chips: ['clipboard', 'keyboard', 'pointerevents', 'touchevents'],
	},
	{
		name: 'Media',
		count: 5,
		desc: 'Canvas, HTML media, devices, vibration and web-share.',
		chips: ['canvas', 'htmlmedia', 'mediadevices', 'webshare'],
	},
	{
		name: 'DOM & Navigation',
		count: 6,
		desc: 'DOM helpers, fullscreen, iframe, history, location and window.',
		chips: ['dom', 'fullscreen', 'history', 'window'],
	},
	{
		name: 'Observers',
		count: 4,
		desc: 'IntersectionObserver, MutationObserver, ResizeObserver and PerformanceObserver.',
		chips: ['intersection', 'mutationobserver', 'resizeobserver', 'performance'],
	},
	{
		name: 'Background',
		count: 4,
		desc: 'Background tasks, service workers, web locks and WebSockets.',
		chips: ['backgroundtasks', 'serviceworkers', 'weblocks', 'websockets'],
	},
	{
		name: 'Notifications & UI',
		count: 6,
		desc: 'Alerts, notifications, print, encoding, permissions and shared helpers.',
		chips: ['notifications', 'print', 'permissions', 'alert'],
	},
]

const HERO_CODE = `import {
  isClipboardApiAvailable,
  copyToClipboard,
} from '@rtorcato/browser-common/clipboard'

if (isClipboardApiAvailable()) {
  await copyToClipboard('hello world')
}`

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero(): ReactElement {
	return (
		<header className={styles.hero}>
			<div className={styles.heroGlow} aria-hidden />
			<div className={styles.heroInner}>
				<div className={styles.wordmark}>
					<span className={styles.wmBrowser}>browser</span>
					<span className={styles.wmDash}>-</span>
					<span className={styles.wmCommon}>common</span>
				</div>
				<p className={styles.tagline}>
					Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs.
				</p>

				<div className={styles.heroBody}>
					<CodeWindow />
				</div>

				<div className={styles.heroActions}>
					<div className={styles.heroButtons}>
						<Link
							className={clsx('button button--primary button--lg', styles.cta)}
							to="/docs/guides/installation"
						>
							Get started →
						</Link>
						<Link className={clsx('button button--lg', styles.ctaSecondary)} to="/docs/api">
							Browse the API
						</Link>
					</div>
					<InstallTabs pkg="@rtorcato/browser-common" />
				</div>
			</div>
		</header>
	)
}

function CodeWindow(): ReactElement {
	return (
		<div className={styles.codeWindow}>
			<div className={styles.codeBar}>
				<span className={styles.dot} style={{ background: '#ff5f57' }} />
				<span className={styles.dot} style={{ background: '#febc2e' }} />
				<span className={styles.dot} style={{ background: '#28c840' }} />
				<span className={styles.codeFile}>app.ts</span>
			</div>
			<pre className={styles.codePre}>{HERO_CODE}</pre>
		</div>
	)
}

function Pillars(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.pillarGrid}>
				{PILLARS.map((p) => (
					<div key={p.title} className={styles.pillar}>
						<div className={styles.pillarIcon}>
							<Icon icon={p.icon} title={p.title} size={20} className={styles.pillarIconSvg} />
						</div>
						<div className={styles.pillarTitle}>{p.title}</div>
						<div className={styles.pillarDesc}>{p.desc}</div>
					</div>
				))}
			</div>
		</section>
	)
}

function Categories(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.sectionHead}>
				<div>
					<h2 className={styles.h2}>One subpath per Web API</h2>
					<p className={styles.sub}>
						Eight focused categories. 44 modules. Import exactly what you need.
					</p>
				</div>
				<Link className={styles.viewAll} to="/docs/api">
					View all modules →
				</Link>
			</div>
			<div className={styles.catGrid}>
				{CATEGORIES.map((c) => (
					<Link key={c.name} to="/docs/api" className={styles.card}>
						<div className={styles.cardHead}>
							<div className={styles.cardName}>{c.name}</div>
							<div className={styles.cardCount}>{c.count} modules</div>
						</div>
						<p className={styles.cardDesc}>{c.desc}</p>
						<div className={styles.chips}>
							{c.chips.map((ch) => (
								<span key={ch} className={styles.chip}>
									{ch}
								</span>
							))}
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}

type Sibling = {
	name: string
	tagline: string
	/** Prefer the published docs site; fall back to the GitHub repo when there isn't one yet. */
	href: string
	/** Short label rendered in the card's top-right indicating where the link goes. */
	dest: 'Docs' | 'GitHub'
}

const SIBLINGS: Sibling[] = [
	{
		name: '@rtorcato/js-common',
		tagline: 'Tree-shakeable TypeScript utilities — tiny bundles, full type safety, CLI included.',
		href: 'https://rtorcato.github.io/js-common/',
		dest: 'Docs',
	},
	{
		name: '@rtorcato/js-tooling',
		tagline:
			'Shared Biome, TypeScript, Vitest and semantic-release presets that power the @rtorcato/* family.',
		href: 'https://rtorcato.github.io/js-tooling/',
		dest: 'Docs',
	},
	{
		name: 'rtorcato/swift-common',
		tagline: 'Common Swift utilities — the Apple-platform sibling of js-common and browser-common.',
		href: 'https://github.com/rtorcato/swift-common',
		dest: 'GitHub',
	},
]

function Siblings(): ReactElement {
	return (
		<section className={styles.section}>
			<div className={styles.sectionHead}>
				<div>
					<h2 className={styles.h2}>Sibling projects</h2>
					<p className={styles.sub}>
						More from <code>@rtorcato</code> — same conventions, same release pipeline.
					</p>
				</div>
			</div>
			<div className={styles.siblingGrid}>
				{SIBLINGS.map((s) => (
					<Link key={s.name} href={s.href} className={styles.card}>
						<div className={styles.cardHead}>
							<div className={styles.cardName}>{s.name}</div>
							<div className={styles.cardCount}>{s.dest} ↗</div>
						</div>
						<p className={styles.cardDesc}>{s.tagline}</p>
					</Link>
				))}
			</div>
		</section>
	)
}

export default function Home(): ReactElement {
	return (
		<Layout
			title="browser-common"
			description="Tree-shakeable TypeScript wrappers around 40+ browser Web APIs — tiny bundles, full type safety, safe-by-default."
		>
			<main>
				<Hero />
				<Pillars />
				<Categories />
				<Siblings />
			</main>
		</Layout>
	)
}
