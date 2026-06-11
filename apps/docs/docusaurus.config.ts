import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
	title: 'browser-common',
	tagline:
		'Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs — each one a separate subpath export.',
	favicon: 'img/logo.svg',

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

	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					routeBasePath: '/',
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
				sidebar: {
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
				docsRouteBasePath: '/',
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
			title: 'browser-common',
			logo: {
				alt: 'browser-common',
				src: 'img/logo.svg',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'docs',
					position: 'left',
					label: 'Docs',
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
					title: 'Docs',
					items: [
						{ label: 'Installation', to: '/guides/installation' },
						{ label: 'The contract', to: '/guides/contract' },
						{ label: 'Browser support', to: '/guides/browser-support' },
					],
				},
				{
					title: 'More',
					items: [
						{ label: 'GitHub', href: 'https://github.com/rtorcato/browser-common' },
						{
							label: 'npm',
							href: 'https://www.npmjs.com/package/@rtorcato/browser-common',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} Richard Torcato. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
			additionalLanguages: ['bash', 'json', 'typescript'],
		},
	} satisfies Preset.ThemeConfig,
}

export default config
