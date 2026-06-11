# browser-common docs

[Docusaurus](https://docusaurus.io/) site for [@rtorcato/browser-common](https://www.npmjs.com/package/@rtorcato/browser-common). Deployed to GitHub Pages at https://rtorcato.github.io/browser-common via `.github/workflows/docs.yml`.

## Develop

```bash
# from repo root
pnpm install
pnpm --filter @rtorcato/browser-common-docs dev
```

Open http://localhost:3000/browser-common/.

## Build locally

```bash
pnpm --filter @rtorcato/browser-common-docs build
pnpm --filter @rtorcato/browser-common-docs serve
```

## Structure

- `docs/index.md` — landing page
- `docs/guides/` — installation, contract, browser-support
- `docs/api/` — **generated** by `docusaurus-plugin-typedoc` from the library JSDoc (gitignored, rebuilt each run)
- `docs/changelog.md` — **synced** from the root `CHANGELOG.md` by `scripts/sync-changelog.mjs` (gitignored, runs as `prebuild`/`predev`/`prestart`)
- `docusaurus.config.ts` — site config, TypeDoc + local-search plugins
- `sidebars.ts` — sidebar layout (Start here / API Reference / Releases)

The API Reference auto-populates from `src/*/index.ts` — adding a new module to the library surfaces it here on the next build. Local full-text search is provided by `@easyops-cn/docusaurus-search-local`.
