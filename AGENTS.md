# Repository Guide

## Commands

- Use npm when installing dependencies; `package-lock.json` is the only lockfile.
- Start the dev server with `npm run dev` or `npm run start`.
- Run focused verification with `npm run check` for Vite+ checks plus Svelte + TypeScript, and `npm run lint` for Vite+ linting.
- Build with `npm run build`; Vite+ writes production output to `../docs` rather than a local `dist/` directory.
- Format with `npm run format`; this runs `vp fmt --write` with config in `vite.config.ts`.
- Run the deployed app across two real networks with `npm run test:cross-network -- <ssh-host> [attempts]`; read `e2e/cross-network/README.md` first.

## Project Shape

- This is a single-package Svelte 5 + Vite app, not a monorepo.
- Vite root is `src`, so `src/index.html` and `src/index.ts` are the browser entrypoints.
- `vite.config.ts` sets `base: "./"` for relative asset URLs and uses `svelte({ configFile: "../svelte.config.js" })` because the Vite root is `src`.
- The app is an online collaborative Monaco editor using Yjs, `y-multiprovider`, `y-nostr`, `y-webtorrent`, `y-indexeddb`, and `y-monaco`; collaboration starts only when the URL has a 40-character `?room=` value.
- No unit-test runner is configured; use `check`, `lint`, and `build` for local validation, plus the cross-network harness for signaling/NAT changes.

## Gotchas

- Do not change the build output directory casually: `README.md` points to the GitHub Pages site, and the production build targets `../docs` for that deployment shape.
- Monaco web workers are wired explicitly in `src/index.ts` through `globalThis.MonacoEnvironment`; language-worker imports are required for editor features in Vite.
- `MultiProvider` coordinates redundant Nostr relay and WebTorrent tracker signaling. Each transport gets its own Awareness instance while the editor consumes merged awareness.
- The cross-network harness enables `editor-webrtc-debug` in local storage to capture per-provider data-channel timing; keep that instrumentation compatible when changing provider setup.
- Local persistence is keyed by `roomId` through `IndexeddbPersistence`; changing room ID semantics can orphan or mix cached documents.
- `svelte.config.js` suppresses all `a11y-*` Svelte warnings, so `npm run check` will not report those.
- Tailwind is loaded through the Vite plugin and `@import "tailwindcss"` in `src/style.css`; `tailwind.config.js` sets `important: true`.
- Local declaration shims live under `src/types/` for packages with missing/incomplete types; check there before adding broad `any` workarounds.
