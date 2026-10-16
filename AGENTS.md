# Editor agent guide

Editor is a serverless, collaborative Monaco editor: a static Svelte 5 + Vite app on GitHub Pages. Yjs syncs documents peer-to-peer over WebRTC; public Nostr relays and WebTorrent trackers handle only discovery. There is no backend. It is a small personal project in a public repo and targets current Chrome and Firefox (the cross-network guest runs Firefox).

## Commands

- Install: `npm install` (`package-lock.json` is the only lockfile)
- Dev server: `npm run dev`
- Format: `npm run format`
- Type check: `npm run check`
- Lint: `npm run lint`
- Build: `npm run build`
- Cross-network sync: `npm run test:cross-network -- <ssh-host> [attempts]`; read `e2e/cross-network/README.md` first. It needs a second machine on a different network, so ask before running it.

There is no unit-test runner. After code changes run `format`, `check`, `lint`, and `build`. For collaboration changes, also try two tabs on one room (open the second from the URL; Duplicate Tab copies `sessionStorage` and with it the peer ID), and propose the cross-network harness for signaling, NAT, or provider changes.

## Boundaries

- `npm run build` writes to `docs/`, which is committed and served by GitHub Pages from `master`. Rebuild and commit it with source changes; do not change the output directory or `base: "./"`.
- `y-multiprovider`, `y-nostr`, `y-webtorrent`, and `webrtc-data-peer` are the owner's packages, installed from git. Fix transport, awareness, and discovery bugs there rather than working around them here. `y-nostr` and `y-webtorrent` pin `webrtc-data-peer` by commit, so a fix there also needs a bump in both.
- Do not add local type shims: an ambient `declare module` silently replaces a package's bundled types.

## Durable decisions

- The room ID is the only access secret and the shared identity: it derives the Nostr topic and encryption key, relay selection, WebTorrent info hash, and IndexedDB key. Changing its format or derivation, or renaming the Yjs text (`"monaco"`), splits peers across builds and orphans cached documents.
- `MultiProvider` merges transports into one logical peer by the `peerId` in local awareness state and drops states without it. Update awareness with `setLocalStateField`, never by replacing the state without `peerId`.
- Nostr and WebTorrent discovery are deliberate redundancy, not alternatives.
- The cross-network harness relies on `localStorage["editor-webrtc-debug"]` and `window.__connectionDiagnostics`; keep both working when changing provider setup.
