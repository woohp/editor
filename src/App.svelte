<script lang="ts">
import type * as monaco from "monaco-editor";
import { onMount } from "svelte";
import { IndexeddbPersistence } from "y-indexeddb";
import { MonacoBinding } from "y-monaco";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

interface Changes {
    added: number[];
    updated: number[];
    removed: number[];
}

interface PeerState {
    user: { name: string };
    language?: string;
}

interface Props {
    roomId: string;
    name: string;
}

const signalingServers = ["wss://signaling.yjs.dev"];

let { roomId, name }: Props = $props();

let provider: WebrtcProvider | undefined;
let editor: monaco.editor.ICodeEditor | undefined;
let editorModel: monaco.editor.ITextModel | undefined;
let editorResizeObserver: ResizeObserver | undefined;

let states = $state(new Map<number, PeerState>());

let editorEl: HTMLDivElement;
let nameInputEl: HTMLInputElement;
let availableLanguages = $state<[string, string][]>([]);
let currentLanguage = $state("plaintext");

function onChangeName() {
    console.debug("new name:", name);
    const existingUserState = provider?.awareness.getLocalState()?.user;
    provider?.awareness.setLocalStateField("user", { ...existingUserState, name });
}

function onChangeNameKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
}

async function handleLanguageSelect() {
    const monaco = await import("monaco-editor");

    if (!editorModel) return;

    monaco.editor.setModelLanguage(editorModel, currentLanguage);
    provider?.awareness.setLocalStateField("language", currentLanguage);
}

onMount(() => {
    let disposed = false;
    let ydoc: Y.Doc | undefined;

    async function initialize() {
        const monaco = await import("monaco-editor");
        if (disposed) return;

        // create the editor and editor model
        const editorConfig = {
            value: "",
            language: currentLanguage,
            scrollBeyondLastLine: false,
        };
        editor = monaco.editor.create(editorEl, editorConfig);
        editorResizeObserver = new ResizeObserver(() => editor?.layout());
        editorResizeObserver.observe(editorEl);
        console.debug("editor:", editor);

        const model = editor.getModel();
        if (!model) return;
        editorModel = model;
        console.debug("editorModel:", editorModel);

        ydoc = new Y.Doc();
        const type = ydoc.getText("monaco");

        provider = new WebrtcProvider(roomId, ydoc, { signaling: signalingServers });
        new MonacoBinding(type, model, new Set([editor]), provider.awareness);
        const awareness = provider.awareness;
        awareness.on("change", (changes: Changes) => {
            states = new Map(awareness.getStates() as Map<number, PeerState>);
            for (const peerNumber of [...changes.added, ...changes.updated]) {
                const peerLanguage = states.get(peerNumber)?.language;
                if (peerLanguage && peerLanguage !== currentLanguage) {
                    currentLanguage = peerLanguage;
                    monaco.editor.setModelLanguage(model, currentLanguage);
                    awareness.setLocalStateField("language", currentLanguage);
                }
            }
        });
        awareness.setLocalStateField("user", { name });

        new IndexeddbPersistence(roomId, ydoc);

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) monaco.editor.setTheme("vs-dark");

        availableLanguages = [];
        for (const lang of monaco.languages.getLanguages()) {
            if (!lang.aliases) continue;
            availableLanguages.push([lang.id, lang.aliases[0]]);
        }
    }

    initialize();

    const beforeUnload = () => provider?.disconnect();
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
        disposed = true;
        window.removeEventListener("beforeunload", beforeUnload);
        editorResizeObserver?.disconnect();
        provider?.disconnect();
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
        class="min-w-0 overflow-auto border-l border-neutral-800 bg-neutral-950 px-4 py-3 font-mono text-sm text-neutral-200"
    >
        <h3 class="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Language</h3>
        <select
            bind:value={currentLanguage}
            onchange={handleLanguageSelect}
            class="w-full max-w-full rounded-sm border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-sm text-neutral-100 outline-none focus:border-blue-500"
        >
            {#each availableLanguages as [langId, langAlias]}
                <option value={langId}>{langAlias}</option>
            {/each}
        </select>

        <h3 class="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Peers</h3>
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
            {#each [...states] as [_, peer], i}
                {#if i > 0}
                <li class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
                    <span class="text-neutral-600">-</span>
                    <span class="min-w-0 truncate text-sm text-neutral-300">{peer.user.name}</span>
                </li>
                {/if}
            {/each}
        </ul>
    </aside>
</div>
