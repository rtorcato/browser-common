import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://rtorcato.github.io',
	base: '/browser-common',
	integrations: [
		starlight({
			title: 'browser-common',
			description: 'Small, tree-shakeable TypeScript wrappers around 40+ browser Web APIs.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/rtorcato/browser-common' },
				{
					icon: 'npm',
					label: 'npm',
					href: 'https://www.npmjs.com/package/@rtorcato/browser-common',
				},
			],
			sidebar: [
				{
					label: 'Guides',
					items: [{ autogenerate: { directory: 'guides' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
})
