# Contributing to browser-common

Thanks for your interest. This is a small library of TypeScript wrappers around browser Web APIs — contributions of any size are welcome.

## Prerequisites

- Node.js ≥22 (a `.nvmrc` is checked in)
- pnpm (managed via Corepack or installed globally)
- git

## Setup

```bash
git clone https://github.com/rtorcato/browser-common.git
cd browser-common
pnpm install
```

## Workflow

1. **Branch name**: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, or `chore/<topic>`.
2. **Make your change.**
3. **Verify locally** — use the `/verify` Claude skill or run:
   ```bash
   pnpm check:fix && pnpm typecheck && pnpm test --run && pnpm exec knip
   ```
4. **Commit using Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`, etc.). The husky `commit-msg` hook validates the format.
5. **Open a PR against `main`.** CI runs Biome, typecheck, tests (Node 22 + 24), build, commitlint, and CodeQL.

## Adding a new module

There's a Claude skill (`/new-module`) that scaffolds this, or by hand:

1. Create `src/<name>/index.ts` with named exports following the contract: `is<Name>Available()` returning `boolean`, operations returning `null`/`false` on unsupported environments (never throw).
2. Add a corresponding entry to the `exports` field in `package.json`.
3. Add `src/<name>/<name>.test.ts` with at least a smoke test.

## Style

Tabs for indentation, single quotes, no semicolons, 100-character lines. Enforced by Biome — `pnpm check:fix` will format for you.

## Releases

Releases are cut automatically by semantic-release on push to `main`. Commit message types drive the version bump (`fix:` → patch, `feat:` → minor, `BREAKING CHANGE:` → major). Don't tag manually.

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE).
