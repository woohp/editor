# Editor agent guide

Editor is a serverless, collaborative Monaco editor: a static Svelte 5 app on GitHub Pages (https://woohp.github.io/editor/). Public Nostr relays and WebTorrent trackers are used only for peer discovery; documents sync peer-to-peer over WebRTC with Yjs and are cached locally in IndexedDB. There is no backend, account, or server-side storage.

This is a small personal project in a public repo. Favor the simplest code that works in a current Chrome (`browserslist`); do not add machinery for rare peer/transport races, abstractions for a second editor or room type, or defensive handling for states the libraries already guarantee.

## Dependencies

- `y-multiprovider`, `y-nostr`, `y-webtorrent`, and their `webrtc-data-peer` dependency are the owner's own packages, installed from git and pinned only by `package-lock.json`. Fix transport, awareness, or discovery bugs there and update the lockfile here; do not patch around them in the app.
- Those git packages build in their `prepare` scripts, which npm runs only when listed in `allowScripts`. Keep those entries matched to the package versions.
- `vite` and `vitest` are overridden to Vite+ (`vite-plus`), tracked at `latest`. Import config helpers from `vite-plus`, not `vite`; lint enforces this.
- Dependencies ship their own types. Do not add local declaration shims; an ambient `declare module` overrides a package's real types. `MultiAwareness` is not a y-protocols `Awareness`, so `App.svelte` casts it for `MonacoBinding`.

## Build and deployment

- Vite root is `src`; `npm run build` writes to `../docs`, which is committed and served by GitHub Pages from `master`. Rebuild and commit `docs/` alongside source changes. Do not change the output directory or `base: "./"`.
- `index.ts` serves both pages: without `?room=` it shows the "New" link; with a 40-character room ID it mounts `App.svelte`. Monaco loads through a dynamic import so the landing page stays light.
- Monaco language workers are wired explicitly through `globalThis.MonacoEnvironment` in `src/index.ts`; Vite needs those `?worker` imports for language features.

## Collaboration invariants

- The room ID is the shared identity for everything: it names the Yjs room, seeds y-nostr's default relay selection, derives the WebTorrent info hash, and keys `IndexeddbPersistence`. Changing its format or derivation splits peers across relays/swarms and orphans cached documents.
- Document text lives in `ydoc.getText("monaco")`. The selected language is not document state: it travels as the awareness field `language`, and any peer's change is adopted by everyone.
- `MultiProvider` merges per-transport awareness into one logical peer by the `peerId` field of local awareness state. Keep `peerId` in that state: update fields with `setLocalStateField`, never replace the whole state without it.
- The logical peer ID is per tab (`sessionStorage`), so reloads keep their identity while separate tabs are separate peers. The display name is shared across tabs (`localStorage`).
- Both discovery paths (Nostr and WebTorrent) are intentional redundancy, not alternatives to choose between. The status panel's "signal" counts transports with at least one connected relay/tracker, not peers.
- Setting `localStorage["editor-webrtc-debug"] = "1"` enables provider debug logging and records `peer-connect` events in `window.__connectionDiagnostics`. The cross-network harness depends on both; keep them working when changing provider setup.

## Styling

Tailwind v4 is loaded through `@tailwindcss/vite` and `@import "tailwindcss"` in `src/style.css`; there is no JS config. `style.css` also styles y-monaco's remote cursor classes (`yRemoteSelection*`).

## Commands

- Install: `npm install` (`package-lock.json` is the only lockfile)
- Dev server: `npm run dev`
- Format: `npm run format`
- Type check: `npm run check` (svelte-check with the TypeScript native preview)
- Lint: `npm run lint` (type-aware oxlint through Vite+)
- Build: `npm run build`
- Cross-network sync: `npm run test:cross-network -- <ssh-host> [attempts]`; read `e2e/cross-network/README.md` first. It needs a second machine on a genuinely different network, so ask before running it.

There is no unit-test runner. After code changes run `format`, `check`, `lint`, and `build`. For collaboration changes, also exercise two tabs on one room in the dev server, and propose the cross-network harness for signaling, NAT, or provider changes.
