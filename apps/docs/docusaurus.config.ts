import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { GITHUB_PROFILE, projectFamilyItems } from '@rtorcato/shared-docs'
import { themes as prismThemes } from 'prism-react-renderer'

// The @rtorcato open-source family, from the shared single source of truth
// (@rtorcato/shared-docs). Surfaced as a navbar "Projects" dropdown (Docusaurus
// renders navbar items in the mobile menu too) and in the footer, so every
// sibling site cross-links to the rest.
const PROJECT_FAMILY = projectFamilyItems()

const config: Config = {
	title: 'browser-common',
	tagline:
		'Small, tree-shakeable TypeScript wrappers around 50+ browser Web APIs — each one a separate subpath export.',
	favicon: 'img/favicon.svg',

	url: 'https://rtorcato.github.io',
	baseUrl: '/browser-common/',

	organizationName: 'rtorcato',
	projectName: 'browser-common',

	onBrokenLinks: 'warn',

	markdown: {
		format: 'detect',
		hooks: {
			onBrokenMarkdownLinks: 'warn',
		},
	},

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	headTags: [
		{
			tagName: 'link',
			attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		},
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossorigin: 'anonymous',
			},
		},
	],

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					// Moved from '/' to '/docs' so the marketing landing
					// (src/pages/index.tsx) owns '/'.
					routeBasePath: '/docs',
					editUrl: 'https://github.com/rtorcato/browser-common/edit/main/apps/docs/',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			'docusaurus-plugin-typedoc',
			{
				entryPoints: ['../../src/*/index.ts'],
				entryPointStrategy: 'expand',
				exclude: ['../../src/tests/**'],
				// typedoc-plugin-markdown is auto-loaded; append our local extension
				// that moves each function's Example block up under its description.
				plugin: ['typedoc-plugin-markdown', `${__dirname}/typedoc-plugin-reorder-example.mjs`],
				tsconfig: '../../tsconfig.json',
				// The library targets the newer DOM lib that ships with its own
				// TypeScript; the docs workspace pins an older TS whose lib.dom.d.ts
				// lacks a few of those types. The library typechecks on its own
				// toolchain, so skip TypeDoc's redundant semantic check here.
				skipErrorChecking: true,
				out: 'docs/api',
				readme: 'none',
				includeVersion: false,
				excludePrivate: true,
				excludeInternal: true,
				excludeExternals: true,
				sort: ['source-order'],
				hidePageTitle: false,
				hideBreadcrumbs: false,
				// One file per module instead of <module>/index.md + <module>/functions/*.md.
				// Flattens the sidebar from "API Reference → module → index → functions → fn"
				// down to "API Reference → module".
				outputFileStrategy: 'modules',
				sidebar: {
					// Let Docusaurus autogenerate the API sidebar from docs/api (see sidebars.ts)
					// rather than TypeDoc emitting a typedoc-sidebar.cjs.
					autoConfiguration: false,
				},
			},
		],
		[
			'@easyops-cn/docusaurus-search-local',
			{
				hashed: true,
				indexDocs: true,
				indexBlog: false,
				docsRouteBasePath: '/docs',
				highlightSearchTermsOnTargetPage: true,
				searchBarShortcutHint: false,
			},
		],
	],

	themeConfig: {
		colorMode: {
			defaultMode: 'dark',
			respectPrefersColorScheme: true,
		},
		navbar: {
			// The "browser-common" wordmark with blue "common" is baked into the
			// SVG logo (light + dark variants), so the title stays empty to avoid
			// rendering it twice.
			title: '',
			logo: {
				alt: 'browser-common',
				src: 'img/logo.svg',
				srcDark: 'img/logo-dark.svg',
				width: 178,
				height: 26,
			},
			items: [
				{ to: '/docs', position: 'left', label: 'Docs' },
				{ to: '/docs/modules/overview', position: 'left', label: 'Modules' },
				{ to: '/docs/api', position: 'left', label: 'API' },
				{
					type: 'dropdown',
					label: 'Projects',
					position: 'left',
					items: [{ label: 'All on GitHub →', href: GITHUB_PROFILE }, ...PROJECT_FAMILY],
				},
				{
					href: 'https://github.com/rtorcato/browser-common',
					label: 'GitHub',
					position: 'right',
				},
				{
					href: 'https://www.npmjs.com/package/@rtorcato/browser-common',
					label: 'npm',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Documentation',
					items: [
						{ label: 'Installation', to: '/docs/guides/installation' },
						{ label: 'The contract', to: '/docs/guides/contract' },
						{ label: 'Browser support', to: '/docs/guides/browser-support' },
						{ label: 'API reference', to: '/docs/api' },
					],
				},
				{
					title: 'Resources',
					items: [
						{ label: 'GitHub', href: 'https://github.com/rtorcato/browser-common' },
						{ label: 'npm', href: 'https://www.npmjs.com/package/@rtorcato/browser-common' },
						{ label: 'Changelog', to: '/docs/changelog' },
					],
				},
				{
					title: 'Projects',
					items: PROJECT_FAMILY,
				},
				{
					title: 'Community',
					items: [
						{ label: '@rtorcato', href: GITHUB_PROFILE },
						{ label: 'Issues', href: 'https://github.com/rtorcato/browser-common/issues' },
						{
							label: 'Discussions',
							href: 'https://github.com/rtorcato/browser-common/discussions',
						},
						{
							label: 'License (MIT)',
							href: 'https://github.com/rtorcato/browser-common/blob/main/LICENSE',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Richard Torcato. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.vsDark,
			darkTheme: prismThemes.vsDark,
			additionalLanguages: ['bash', 'json', 'typescript'],
		},
	} satisfies Preset.ThemeConfig,
}

export default config
