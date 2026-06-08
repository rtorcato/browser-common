# treeshake-check

Private workspace that asserts `@rtorcato/browser-common` actually tree-shakes — `sideEffects: false` and per-subpath `exports` are necessary but not sufficient, and easy to break silently. This check bundles a single subpath import via esbuild + `metafile`, then fails if any other dist/ module appears in the bundle inputs.

Prototype for upstream [js-tooling#43](https://github.com/rtorcato/js-tooling/issues/43).

## Run

From the repo root:

```bash
pnpm treeshake
```

`pretreeshake` runs `pnpm build-prod` first, so the dist/ paths the check inspects are always fresh. The check also runs as the final step of `pnpm verify`.

## Configure

`check.mjs` reads everything it needs from a `treeshake` block in this workspace's `package.json`:

```json
"treeshake": {
  "target": "@rtorcato/browser-common",
  "allowed": ["clipboard"],
  "ignored": ["common"]
}
```

- `target` — the package whose tree-shaking is being verified. Must be in this workspace's `dependencies` (resolved via `./node_modules/<target>/package.json`).
- `allowed` — subpaths the bundle **must** include. At least one allowed-subpath dist input must appear, or the check fails.
- `ignored` — subpaths whose presence is tolerated (e.g., genuine shared utilities). Optional, defaults to `[]`.
- `entry` — entry file to bundle. Optional, defaults to `src/entry.ts`.

`forbidden` is **derived**: every subpath in `target.exports` minus `allowed` minus `ignored`. Any forbidden-subpath dist input in the bundle fails the check. This means adding or removing a subpath from `@rtorcato/browser-common` automatically updates the check — no parallel list to maintain.

## Add another subpath to verify

Currently the check only proves `clipboard` tree-shakes cleanly. To also verify, say, `geolocation`:

1. Add a sibling entry file (e.g., `src/entry-geolocation.ts`) that imports only from `@rtorcato/browser-common/geolocation`.
2. Either parameterize this workspace per-entry, or add a second `apps/treeshake-geolocation/` workspace with its own config.

The single-entry shape kept the prototype small. A multi-entry runner is a candidate for the upstream lift.
