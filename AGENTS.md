# Repository Guide

## Commands
- Use Bun when installing dependencies; `bun.lock` is the only lockfile.
- Start the dev server with `bun run dev` or `bun run start`.
- Run focused verification with `bun run check` for Svelte + TypeScript and `bun run lint` for Biome.
- Build with `bun run build`; Vite writes production output to `../docs` rather than a local `dist/` directory.
- Format with `bun run format`; this runs `biome check --write .` only over the files included by `biome.jsonc`.

## Project Shape
- This is a single-package Svelte 5 + Vite app, not a monorepo.
- Vite root is `src`, so `src/index.html` and `src/index.ts` are the browser entrypoints.
- `vite.config.ts` sets `base: "./"` for relative asset URLs and uses `svelte({ configFile: "../svelte.config.js" })` because the Vite root is `src`.
- The app is an online collaborative Monaco editor using Yjs, `y-webrtc`, `y-indexeddb`, and `y-monaco`; collaboration starts only when the URL has a 40-character `?room=` value.
- No test runner is configured; use `check`, `lint`, and `build` as the available validation steps.

## Gotchas
- Do not change the build output directory casually: `README.md` points to the GitHub Pages site, and the production build targets `../docs` for that deployment shape.
- Monaco web workers are wired explicitly in `src/index.ts` through `globalThis.MonacoEnvironment`; language-worker imports are required for editor features in Vite.
- The only signaling server is currently `wss://signaling.yjs.dev` in `src/App.svelte`; browser-to-browser sync depends on that public service plus WebRTC.
- Local persistence is keyed by `roomId` through `IndexeddbPersistence`; changing room ID semantics can orphan or mix cached documents.
- `svelte.config.js` suppresses all `a11y-*` Svelte warnings, so `bun run check` will not report those.
- Tailwind is loaded through the Vite plugin and `@import "tailwindcss"` in `src/style.css`; `tailwind.config.js` sets `important: true`.
- Local declaration shims live under `src/types/` for packages with missing/incomplete types; check there before adding broad `any` workarounds.
