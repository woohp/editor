<script lang="ts">
    import type { Buffer } from 'buffer';
    import { onMount } from 'svelte';
    import type * as monaco from 'monaco-editor';
    import type { Client } from 'bittorrent-tracker';

    interface SimplePeer {
        id: string;

        on(eventName: 'connect', cb: () => void): void;
        on(eventName: 'data', cb: (data: Uint8Array) => void): void;
        on(eventName: 'close', cb: () => void): void;
        on(eventName: 'error', cb: (err: any) => void): void;

        send(data: string): void;
        destroy(): void;
    }

    interface Peer {
        displayName: string;
        conn: SimplePeer;
        position: CursorType;
        positionDecorations: string[];
        selection: SelectionType;
        selectionDecorations: string[];
    }

    interface CursorType {
        lineNumber: number;
        column: number;
    }

    interface SelectionType {
        selectionStartLineNumber: number;
        selectionStartColumn: number;
        positionLineNumber: number;
        positionColumn: number;
    }

    interface EditsMessage {
        type: 'edits';
        value: monaco.editor.IModelContentChange[];
    }
    interface GreetMessage {
        type: 'greet';
        value: string;
    }
    interface StateMessage {
        type: 'state';
        value: string;
        language: string;
        position: CursorType;
    }
    interface ChangeLanguageMessage {
        type: 'changeLanguage';
        value: string;
    }
    interface CursorMessage {
        type: 'cursor';
        value: CursorType;
    }
    interface SelectionMessage {
        type: 'selection';
        value: SelectionType;
    }
    type Message =
        | EditsMessage
        | GreetMessage
        | StateMessage
        | ChangeLanguageMessage
        | CursorMessage
        | SelectionMessage;

    export let peerId: Buffer;
    export let roomId: Buffer;
    export let name: string;

    let tracker: Client;
    let editor: monaco.editor.ICodeEditor;
    let editorModel: monaco.editor.ITextModel;

    let trackingChanges = true;
    let connectedTrackers: Set<string> = new Set();

    let connections: Map<string, Peer> = new Map();

    let editorEl: HTMLDivElement;
    let availableLanguages: [string, string][] = [];
    let currentLanguage: string = 'plaintext';

    function setupConnection(peer: SimplePeer) {
        const peerId = peer.id;
        const defaultPosition = { lineNumber: 1, column: 1 };
        const defaultSelection = {
            selectionStartLineNumber: 0,
            selectionStartColumn: 0,
            positionLineNumber: 0,
            positionColumn: 0,
        };
        connections.set(peerId, {
            displayName: '',
            conn: peer,
            position: defaultPosition,
            positionDecorations: [],
            selection: defaultSelection,
            selectionDecorations: [],
        });
        connections = connections;

        peer.on('data', (data) => receiveData(peerId, data));
        peer.on('close', () => {
            console.debug('peer closed:', peer.id);
            const peerObject = connections.get(peer.id);
            if (peerObject) {
                editor?.deltaDecorations(peerObject.positionDecorations, []);
                connections.delete(peer.id);
                connections = connections;
            }
        });
        peer.on('error', (err: any) => {
            if (!connections.has(peer.id)) return;
            console.error('peer error:', err);
        });

        peer.send(JSON.stringify({ type: 'greet', value: name }));
        const existingValue = editorModel.getValue();
        if (existingValue.length > 0)
            peer.send(
                JSON.stringify({ type: 'state', value: existingValue, language: currentLanguage })
            );
        const cursorPosition = editor?.getPosition();
        if (cursorPosition != null)
            peer.send(JSON.stringify({ type: 'cursor', value: cursorPosition }));
    }

    async function handleLanguageSelect() {
        const monaco = await import('monaco-editor');

        monaco.editor.setModelLanguage(editorModel, currentLanguage);
        broadcast({ type: 'changeLanguage', value: currentLanguage });
    }

    function broadcast(data: Message) {
        console.debug('broadcasting to:', connections);
        const data_ = JSON.stringify(data);
        for (const peer of connections.values()) {
            try {
                peer.conn.send(data_);
            } catch {}
        }
    }

    async function updatePeerCursor(peer: Peer) {
        const monaco = await import('monaco-editor');

        console.debug('new peer position:', peer.position);
        peer.positionDecorations = editor.deltaDecorations(peer.positionDecorations, [
            {
                range: new monaco.Range(
                    peer.position.lineNumber,
                    peer.position.column,
                    peer.position.lineNumber,
                    peer.position.column
                ),
                options: { className: 'box-content w-px pr-px bg-red-400' },
            },
        ]);
    }

    async function updatePeerSelection(peer: Peer) {
        const monaco = await import('monaco-editor');

        console.debug('new peer selection:', peer.selection);
        peer.selectionDecorations = editor.deltaDecorations(peer.selectionDecorations, [
            {
                range: new monaco.Range(
                    peer.selection.selectionStartLineNumber,
                    peer.selection.selectionStartColumn,
                    peer.selection.positionLineNumber,
                    peer.selection.positionColumn
                ),
                options: { className: 'peer-selection bg-red-300' },
            },
        ]);
    }

    async function receiveData(peerId: string, data_: Uint8Array) {
        const data: Message = JSON.parse(new TextDecoder('utf-8').decode(data_));
        console.debug('incoming:', data);
        const peer = connections.get(peerId);

        if (peer == null) return;
        if (editorModel == null) return;

        const monaco = await import('monaco-editor');

        trackingChanges = false;
        if (data.type === 'edits') {
            const edits = data.value.map((change) => {
                const range = change.range;
                return {
                    range: new monaco.Range(
                        range.startLineNumber,
                        range.startColumn,
                        range.endLineNumber,
                        range.endColumn
                    ),
                    text: change.text,
                    forceMoveMarkers: true,
                };
            });
            editorModel.pushEditOperations([], edits, () => null);
            console.debug('incoming done');
        } else if (data.type === 'greet') {
            peer.displayName = data.value;
            connections = connections;
        } else if (data.type === 'state') {
            editorModel.setValue(data.value);
            currentLanguage = data.language;
            monaco.editor.setModelLanguage(editorModel, data.language);
        } else if (data.type === 'cursor') {
            peer.position = data.value;
            updatePeerCursor(peer);
        } else if (data.type === 'changeLanguage') {
            currentLanguage = data.value;
            monaco.editor.setModelLanguage(editorModel, data.value);
        } else if (data.type === 'selection') {
            peer.selection = data.value;
            updatePeerSelection(peer);
        }
        trackingChanges = true;
    }

    onMount(async () => {
        const [{ Client }, monaco] = await Promise.all([
            import('bittorrent-tracker'),
            import('monaco-editor'),
        ]);

        console.debug('Tracker', Client);
        tracker = new Client({
            infoHash: roomId,
            peerId: peerId,
            announce: [
                'wss://tracker.fastcast.nz',
                'wss://tracker.openwebtorrent.com',
                'wss://tracker.btorrent.xyz',
            ],
        });
        console.debug('tracker:', tracker);

        // create the editor and editor model
        const editorConfig = {
            value: '',
            language: currentLanguage,
            scrollBeyondLastLine: false,
        };
        editor = monaco.editor.create(editorEl, editorConfig);
        console.debug('editor:', editor);
        editorModel = editor.getModel()!;
        console.debug('editorModel:', editorModel);

        if (window.matchMedia('(prefers-color-scheme: dark)').matches)
            monaco.editor.setTheme('vs-dark');

        availableLanguages = monaco.languages
            .getLanguages()
            .filter((lang) => !!lang.aliases)
            .map((lang) => [lang.id, lang.aliases![0]]);

        // listen to events on the editor
        editorModel.onDidChangeContent((event) => {
            console.debug('changeContent:', event);
            if (!trackingChanges) return;
            broadcast({ type: 'edits', value: event.changes });
        });
        editor.onDidChangeCursorPosition((event) => {
            console.debug('changeCursor:', event);
            broadcast({ type: 'cursor', value: event.position });
        });
        editor.onDidChangeCursorSelection((event) => {
            console.debug('selection:', event.selection);
            broadcast({ type: 'selection', value: event.selection });
        });

        // listen to events from the tracker
        tracker.setInterval(15 * 60 * 1000); // every 15 minutes
        // tracker.on('warning', console.warn);
        tracker.on('error', (e: any) => {
            connectedTrackers.delete(e.announce);
            connectedTrackers = connectedTrackers;
        });
        tracker.on('peer', (peer: SimplePeer) => {
            console.debug('peer:', peer);
            const peerId = peer.id;
            if (peerId.length !== 40 || connections.has(peerId)) return;

            peer.on('connect', () => {
                setupConnection(peer);
            });
        });
        tracker.on('update', (e: any) => {
            connectedTrackers.add(e.announce);
            connectedTrackers = connectedTrackers;
        });

        tracker.start();
    });

    function beforeUnload() {
        console.debug('disconnecting from trackers');
        for (const peer of connections.values()) peer.conn.destroy();
        tracker.stop();
    }
</script>

<div class="h-screen grid grid-cols-[auto,240px]">
    <div bind:this={editorEl} />

    <div class="pl-4">
        <h3>Language</h3>
        <select bind:value={currentLanguage} on:change={handleLanguageSelect}>
            {#each availableLanguages as [langId, langAlias]}
                <option value={langId}>{langAlias}</option>
            {/each}
        </select>

        <h3>Peers</h3>
        <ul class="overflow-hidden pl-5">
            <li>{name}</li>
            {#each [...connections] as [_, peer]}
                <li>{peer.displayName}</li>
            {/each}
        </ul>

        {#if connectedTrackers.size == 0}
            <small class="absolute bottom-0 right-0 text-yellow-600">connecting...</small>
        {:else}
            <small class="absolute bottom-0 right-0 text-green-600">
                connected to {connectedTrackers.size} tracker{#if connectedTrackers.size > 1}s{/if}
            </small>
        {/if}
    </div>
</div>

<svelte:window on:beforeunload={beforeUnload} />
