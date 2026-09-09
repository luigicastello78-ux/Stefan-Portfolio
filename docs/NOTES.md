# Build notes

## @splinetool/runtime is pinned to 1.12.98

Runtime 2.x (2.0.42 at time of writing) references Draco decoder files at
`../libs/draco/*` through `new URL(..., import.meta.url)`, and that `libs`
directory is not published in the package. Turbopack resolves those URLs at
build time and the production build fails with six module-not-found errors.

1.12.98 does not reference them and builds cleanly.

The version is pinned exactly, not caret-ranged. Do not widen it without
rebuilding and confirming `npm run build` still passes.
