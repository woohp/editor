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

export let roomId: string;
export let name: string;

let provider: WebrtcProvider;
let editor: monaco.editor.ICodeEditor;
let editorModel: monaco.editor.ITextModel;

let states: Map<number, PeerState> = new Map();

let editorEl: HTMLDivElement;
let nameInputEl: HTMLInputElement;
let availableLanguages: [string, string][] = [];
let currentLanguage = "plaintext";

function onChangeName() {
    console.debug("new name:", name);
    const existingUserState = provider.awareness.getLocalState()?.user;
    provider.awareness.setLocalStateField("user", { ...existingUserState, name });
}

function onChangeNameKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") (e.target as HTMLDivElement).blur();
}

async function handleLanguageSelect() {
    const monaco = await import("monaco-editor");

    monaco.editor.setModelLanguage(editorModel, currentLanguage);
    provider.awareness.setLocalStateField("language", currentLanguage);
}

onMount(async () => {
    const monaco = await import("monaco-editor");

    // create the editor and editor model
    const editorConfig = {
        value: "",
        language: currentLanguage,
        scrollBeyondLastLine: false,
    };
    editor = monaco.editor.create(editorEl, editorConfig);
    console.debug("editor:", editor);
    const editorModel_ = editor.getModel();
    if (!editorModel_) return;
    editorModel = editorModel_;
    console.debug("editorModel:", editorModel);

    const ydoc = new Y.Doc();
    const type = ydoc.getText("monaco");

    provider = new WebrtcProvider(roomId, ydoc);
    new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);
    const awareness = provider.awareness;
    awareness.on("change", (changes: Changes) => {
        states = awareness.getStates() as Map<number, PeerState>;
        for (const peerNumber of [...changes.added, ...changes.updated]) {
            const peerLanguage = states.get(peerNumber)?.language;
            if (peerLanguage && peerLanguage !== currentLanguage) {
                currentLanguage = peerLanguage;
                monaco.editor.setModelLanguage(editorModel, currentLanguage);
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
});

function beforeUnload() {
    provider.disconnect();
}
</script>

<div class="h-screen grid grid-cols-[auto,240px] gap-4">
    <div bind:this={editorEl} />

    <div class="font-mono">
        <h3 class="text-2xl leading-normal">Language</h3>
        <select
            bind:value={currentLanguage}
            on:change={handleLanguageSelect}
            class="border border-gray-300 py-1.5 px-3"
        >
            {#each availableLanguages as [langId, langAlias]}
                <option value={langId}>{langAlias}</option>
            {/each}
        </select>

        <h3 class="text-2xl leading-normal mt-4">Peers</h3>
        <ul class="list-inside">
            <li class="marker:content-['-']">
                <input
                    class="w-[160px] ml-2"
                    bind:this={nameInputEl}
                    bind:value={name}
                    on:blur={onChangeName}
                    on:keydown={onChangeNameKeydown}
                />
                <span
                    class="ml-4 cursor-pointer text-xs text-blue-500"
                    on:click={() => nameInputEl.focus()}
                >
                    Edit
                </span>
            </li>
            {#each [...states] as [_, peer], i}
                {#if i > 0}
                <li class="marker:content-['-']">
                    <span class="ml-2">{peer.user.name}</span>
                </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>

<svelte:window on:beforeunload={beforeUnload} />
