# browser-common docs

Astro Starlight site for [@rtorcato/browser-common](https://www.npmjs.com/package/@rtorcato/browser-common). Deployed to GitHub Pages at https://rtorcato.github.io/browser-common via `.github/workflows/docs.yml`.

## Develop

```bash
# from repo root
pnpm install
pnpm --filter @rtorcato/browser-common-docs dev
```

Open http://localhost:4321/browser-common/.

## Build locally

```bash
pnpm --filter @rtorcato/browser-common-docs build
pnpm --filter @rtorcato/browser-common-docs preview
```

## Structure

- `src/content/docs/index.mdx` — landing page
- `src/content/docs/guides/` — installation, contract, browser-support
- `src/content/docs/reference/` — module reference (all 42 subpath imports)
- `astro.config.mjs` — Starlight config + sidebar

Sidebar groups auto-populate from the `guides/` and `reference/` directories. Add a new `.md`/`.mdx` file with frontmatter and it shows up.
