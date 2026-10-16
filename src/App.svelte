<script lang="ts">
import type * as monaco from "monaco-editor";
import { onMount } from "svelte";
import { SvelteMap } from "svelte/reactivity";
import { MultiProvider } from "y-multiprovider";
import { NostrProvider } from "y-nostr";
import { IndexeddbPersistence } from "y-indexeddb";
import { MonacoBinding } from "y-monaco";
import type { Awareness } from "y-protocols/awareness";
import { createPeerId, WebtorrentProvider } from "y-webtorrent";
import * as Y from "yjs";

interface PeerState {
    user?: { name: string };
    language?: string;
}

interface ConnectionStatusEvent {
    provider: string;
    event: {
        status: string;
        relay?: string;
        tracker?: string;
    };
}

interface Props {
    roomId: string;
    name: string;
    peerId: string;
}

const providerCount = 2;

let { roomId, name, peerId }: Props = $props();

let provider: MultiProvider | undefined;
let setLanguage: (language: string) => void = () => {};

let states = $state(new Map<number, PeerState>());
// "<provider>:<endpoint>" -> provider name, for each connected relay/tracker
const connectedEndpoints = new SvelteMap<string, string>();
const connectedProviderCount = $derived(new Set(connectedEndpoints.values()).size);
const providerActive = $derived(connectedProviderCount > 0 || states.size > 0);

let editorEl: HTMLDivElement;
let nameInputEl: HTMLInputElement;
let availableLanguages = $state<[string, string][]>([]);
let currentLanguage = $state("plaintext");

function onChangeName() {
    localStorage.setItem("editor-name", name);
    provider?.awareness.setLocalStateField("user", { name });
}

function onChangeNameKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
}

onMount(() => {
    let disposed = false;
    let editor: monaco.editor.IStandaloneCodeEditor | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let ydoc: Y.Doc | undefined;

    async function initialize() {
        const monaco = await import("monaco-editor");
        if (disposed) return;

        editor = monaco.editor.create(editorEl, {
            language: currentLanguage,
            scrollBeyondLastLine: false,
        });
        resizeObserver = new ResizeObserver(() => editor?.layout());
        resizeObserver.observe(editorEl);
        const model = editor.getModel()!;

        ydoc = new Y.Doc();
        const type = ydoc.getText("monaco");
        const debugConnections = localStorage.getItem("editor-webrtc-debug") === "1";

        provider = new MultiProvider(roomId, ydoc, {
            providers: [
                {
                    name: "nostr",
                    create: ({ doc, awareness }) =>
                        new NostrProvider(roomId, doc, { awareness, debug: debugConnections }),
                },
                {
                    name: "webtorrent",
                    create: ({ doc, awareness }) =>
                        new WebtorrentProvider(roomId, doc, {
                            awareness,
                            peerId: createPeerId(),
                            debug: debugConnections,
                        }),
                },
            ],
        });

        if (debugConnections) {
            provider.on("debug", (debug: unknown) => {
                const detail = debug as { provider?: string; event?: { type?: string } };
                if (detail.event?.type !== "peer-connect") return;
                const diagnostics = (window as typeof window & {
                    __connectionDiagnostics?: unknown[];
                }).__connectionDiagnostics ??= [];
                diagnostics.push({
                    wallTime: Date.now(),
                    monotonicTime: performance.now(),
                    detail,
                });
                console.debug("[WebRTC]", detail);
            });
        }

        provider.on("status", (status: unknown) => {
            const { provider: providerName, event } = status as ConnectionStatusEvent;
            const endpoint = `${providerName}:${event.relay ?? event.tracker ?? "default"}`;
            if (event.status === "connected") connectedEndpoints.set(endpoint, providerName);
            else connectedEndpoints.delete(endpoint);
        });
        provider.on("connection-error", (error: unknown) => {
            const { provider: providerName } = error as { provider: string };
            console.warn(`${providerName} connection error`);
        });

        const awareness = provider.awareness;
        setLanguage = (language) => {
            currentLanguage = language;
            monaco.editor.setModelLanguage(model, language);
            awareness.setLocalStateField("language", language);
        };
        awareness.setLocalState({ peerId });
        awareness.on("change", (changes) => {
            states = new Map(
                [...awareness.getStates()].filter(([clientId]) => clientId !== ydoc!.clientID),
            ) as Map<number, PeerState>;
            for (const clientId of [...changes.added, ...changes.updated]) {
                const peerLanguage = states.get(clientId)?.language;
                if (peerLanguage && peerLanguage !== currentLanguage) setLanguage(peerLanguage);
            }
        });
        awareness.setLocalStateField("user", { name });
        new MonacoBinding(type, model, new Set([editor]), awareness as unknown as Awareness);

        new IndexeddbPersistence(roomId, ydoc);

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) monaco.editor.setTheme("vs-dark");

        availableLanguages = [];
        for (const lang of monaco.languages.getLanguages()) {
            if (!lang.aliases) continue;
            availableLanguages.push([lang.id, lang.aliases[0]]);
        }
    }

    initialize();

    const beforeUnload = () => provider?.destroy();
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
        disposed = true;
        window.removeEventListener("beforeunload", beforeUnload);
        resizeObserver?.disconnect();
        provider?.destroy();
        editor?.dispose();
        ydoc?.destroy();
    };
});
</script>

<div
    class="grid h-screen grid-cols-[minmax(0,1fr)_18rem] overflow-hidden bg-neutral-950 text-neutral-100"
>
    <div class="min-h-0 min-w-0" bind:this={editorEl}></div>

    <aside
        class="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden border-l border-neutral-800 bg-neutral-950 px-4 py-3 font-mono text-sm text-neutral-200"
    >
        <div>
            <h3 class="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Language</h3>
            <select
                bind:value={currentLanguage}
                onchange={() => setLanguage(currentLanguage)}
                class="w-full max-w-full rounded-sm border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-sm text-neutral-100 outline-none focus:border-blue-500"
            >
                {#each availableLanguages as [langId, langAlias]}
                    <option value={langId}>{langAlias}</option>
                {/each}
            </select>
        </div>

        <div class="min-h-0 overflow-auto pt-6">
            <h3 class="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Peers</h3>
            <ul class="space-y-2">
                <li class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
                    <span class="text-neutral-600">-</span>
                    <input
                        class="min-w-0 bg-transparent text-sm text-neutral-100 outline-none selection:bg-blue-500/30"
                        bind:this={nameInputEl}
                        bind:value={name}
                        onblur={onChangeName}
                        onkeydown={onChangeNameKeydown}
                    />
                    <button
                        type="button"
                        class="cursor-pointer text-xs text-blue-400 hover:text-blue-300"
                        onclick={() => nameInputEl.focus()}
                    >
                        Edit
                    </button>
                </li>
                {#each [...states] as [_, peer]}
                    <li class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
                        <span class="text-neutral-600">-</span>
                        <span class="min-w-0 truncate text-sm text-neutral-300">{peer.user?.name ?? "Anonymous"}</span>
                    </li>
                {/each}
            </ul>
        </div>

        <div class="border-t border-neutral-800 pt-3">
            <h3 class="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Status</h3>
            <dl class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 gap-y-1 text-xs">
                <dt class="text-neutral-600">provider</dt>
                <dd class="text-neutral-300">{providerActive ? "active" : "idle"}</dd>

                <dt class="text-neutral-600">signal</dt>
                <dd class="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 text-neutral-300">
                    <span
                        class={connectedProviderCount > 0 ? "h-1.5 w-1.5 rounded-full bg-green-400" : "h-1.5 w-1.5 rounded-full bg-red-500"}
                    ></span>
                    <span>{connectedProviderCount > 0 ? `${connectedProviderCount}/${providerCount} connected` : "connecting"}</span>
                </dd>

                <dt class="text-neutral-600">sync</dt>
                <dd class="text-neutral-300">{states.size > 0 ? "synced" : "waiting"}</dd>

                <dt class="text-neutral-600">peers</dt>
                <dd class="text-neutral-300">{states.size} rtc</dd>

                <dt class="text-neutral-600">transports</dt>
                <dd class="text-neutral-300">Nostr + WebTorrent</dd>
            </dl>
        </div>
    </aside>
</div>
