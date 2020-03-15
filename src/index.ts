import * as monaco from 'monaco-editor';

// generate a random sequence of characters
function makeId() {
    const result = [];
    const characters = '0123456789abcdef';
    for (let i = 0; i < 40; i++)
        result.push(characters[Math.floor(Math.random() * characters.length)]);
    return result.join('');
}

function hexToBase64(hex: string) {
    return Buffer.from(hex, 'hex').toString('base64');
}

function base64ToHex(base64: string) {
    return Buffer.from(base64, 'base64').toString('hex');
}

interface SimplePeer {
    id: string;

    on(eventName: 'connect', cb: () => void): void;
    on(eventName: 'data', cb: (data: Uint8Array) => void): void;
    on(eventName: 'close', cb: () => void): void;
    on(eventName: 'error', cb: (err: any) => void): void;

    send(data: string): void;
    destroy(): void;
}

interface CursorType {
    lineNumber: number;
    column: number
}

interface SelectionType {
    selectionStartLineNumber: number;
    selectionStartColumn: number;
    positionLineNumber: number;
    positionColumn: number;
}

interface Peer {
    displayName: string;
    conn: SimplePeer;
    position: CursorType;
    positionDecorations: string[];
    selection: SelectionType;
    selectionDecorations: string[];
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
type Message = EditsMessage | GreetMessage | StateMessage | ChangeLanguageMessage | CursorMessage | SelectionMessage;

const peerId = makeId();
let tracker: any = null;
const connections: Map<string, Peer> = new Map();
let name: string|null = null;
let editor: monaco.editor.ICodeEditor|null = null;
let editorModel: monaco.editor.ITextModel|null = null;
const languagesSelect = document.querySelector('select#languages') as HTMLSelectElement;
let trackingChanges = true;

console.info('peerId:', peerId);

function updatePeersDisplay() {
    const frags = [`<li>${ name }<\/li>`];
    for (const peer of connections.values()) {
        frags.push(`<li>${ peer.displayName }<\/li>`);
    }
    document.querySelector('#peers')!.innerHTML = frags.join('');
}

function createRoom() {
    const newRoomId = makeId();
    window.location.href = window.location.pathname + '?room=' + encodeURIComponent(hexToBase64(newRoomId));
}

async function joinRoom(roomId: string) {

    const cachedName = localStorage.getItem('editor-name');
    if (cachedName == null)
        name = prompt('Your name is...');
    else
        name = prompt('Your name is...', cachedName);
    if (name == null || name === '')
        name = `Peer ${ peerId.slice(0, 8) }`;
    localStorage.setItem('editor-name', name);
    updatePeersDisplay();

    const Tracker = await import('bittorrent-tracker');
    tracker = new Tracker({
        infoHash: base64ToHex(roomId),
        peerId: peerId,
        announce: ['wss://tracker.openwebtorrent.com', 'wss://tracker.btorrent.xyz'],
    });
    console.debug('tracker:', tracker);
    tracker.setInterval(15 * 60 * 1000);  // every 15 minutes
    tracker.on('warning', console.warn);
    tracker.on('error', console.error);
    tracker.on('peer', (peer: SimplePeer) => {
        console.debug('peer:', peer);
        const peerId = peer.id;
        if (peerId.length !== 40 || connections.has(peerId))
            return;

        peer.on('connect', () => {
            setupConnection(peer);
            updatePeersDisplay();
        });
    });
    tracker.start();
}

function setupConnection(peer: SimplePeer) {
    const peerId = peer.id
    const defaultPosition = {lineNumber: 1, column: 1};
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

    peer.on('data', (data) => receiveData(peerId, data));
    peer.on('close', () => {
        console.debug('peer closed:', peer.id);
        const peerObject = connections.get(peer.id);
        if (peerObject) {
            editor?.deltaDecorations(peerObject.positionDecorations, []);
            connections.delete(peer.id);
        }
        updatePeersDisplay();
    });
    peer.on('error', (err: any) => {
        if (!connections.has(peer.id))
            return;
        console.error('peer error:', err);
    });

    peer.send(JSON.stringify({type: 'greet', value: name}));
    const existingValue = editorModel!.getValue();
    if (existingValue.length > 0)
        peer.send(JSON.stringify({type: 'state', value: existingValue, language: languagesSelect.value}));
    const cursorPosition = editor?.getPosition();
    if (cursorPosition != null)
        peer.send(JSON.stringify({type: 'cursor', value: cursorPosition}));
}

function broadcast(data: Message) {
    console.debug('broadcasting to:', connections);
    const data_ = JSON.stringify(data);
    for (const peer of connections.values()) {
        try {
            peer.conn.send(data_);
        } catch {
        }
    }
}

async function updatePeerCursor(peer: Peer) {
    const monaco = await import('monaco-editor');

    console.debug('new peer position:', peer.position);
    peer.positionDecorations = editor!.deltaDecorations(
        peer.positionDecorations, [{
            range: new monaco.Range(peer.position.lineNumber, peer.position.column, peer.position.lineNumber, peer.position.column),
            options: { className: 'peer-cursor' }
        }]
    );
}

async function updatePeerSelection(peer: Peer) {
    const monaco = await import('monaco-editor');

    console.debug('new peer selection:', peer.selection);
    peer.selectionDecorations = editor!.deltaDecorations(
        peer.selectionDecorations, [{
            range: new monaco.Range(
                peer.selection.selectionStartLineNumber,
                peer.selection.selectionStartColumn,
                peer.selection.positionLineNumber,
                peer.selection.positionColumn,
            ),
            options: { className: 'peer-selection' }
        }]
    );
}

async function receiveData(peerId: string, data_: Uint8Array) {
    const data: Message = JSON.parse(new TextDecoder('utf-8').decode(data_));
    console.debug('incoming:', data);
    const peer = connections.get(peerId);

    if (peer == null)
        return;
    if (editorModel == null)
        return;

    const monaco = await import('monaco-editor');

    trackingChanges = false;
    if (data.type === 'edits') {
        const edits = data.value.map(change => {
            const range = change.range;
            return {
                range: new monaco.Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn),
                text: change.text,
                forceMoveMarkers: true
            }
        });
        editorModel.pushEditOperations([], edits, () => null);
        console.debug('incoming done');
    } else if (data.type === 'greet') {
        peer.displayName = data.value;
        updatePeersDisplay();
    } else if (data.type === 'state') {
        editorModel.setValue(data.value);
        languagesSelect.value = data.language;
        monaco.editor.setModelLanguage(editorModel!, data.language);
    } else if (data.type === 'cursor') {
        peer.position = data.value;
        updatePeerCursor(peer);
    } else if (data.type === 'changeLanguage') {
        languagesSelect.value = data.value;
        monaco.editor.setModelLanguage(editorModel!, data.value);
    } else if (data.type === 'selection') {
        peer.selection = data.value;
        updatePeerSelection(peer);
    }
    trackingChanges = true;
}

async function main () {

    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');

    if (!roomId) {
        const newButton = document.querySelector('#new-room') as HTMLButtonElement;
        newButton.addEventListener('click', createRoom, false);
        newButton.style.display = 'block';
        return;
    } else {
        const container = document.querySelector('#container') as HTMLDivElement;
        container.style.display = 'grid';
    }

    joinRoom(roomId);

    // create the editor and editor model
    const monaco = await import('monaco-editor');
    const editorConfig = {
        value: '',
        language: 'plaintext',
        scrollBeyondLastLine: false,
    };
    editor = monaco.editor.create(document.getElementById('editor') as HTMLDivElement, editorConfig);
    console.debug('editor:', editor);
    editorModel = editor.getModel();
    console.debug('model:', editorModel);

    // listen to events on the editor
    editorModel!.onDidChangeContent(event => {
        console.debug('changeContent:', event);
        if (!trackingChanges)
            return;
        broadcast({type: 'edits', value: event.changes});
    });
    editor!.onDidChangeCursorPosition(event => {
        console.debug('changeCursor:', event);
        broadcast({type: 'cursor', value: event.position});
    });
    editor!.onDidChangeCursorSelection(event => {
        console.debug('selection:', event.selection);
        broadcast({type: 'selection', value: event.selection});
    });

    // populate langauges list
    languagesSelect.innerHTML = monaco.languages.getLanguages()
        .filter(lang => lang.aliases !== undefined)
        .map(lang => {
            return `<option value="${ lang.id }">${ lang.aliases![0] }<\/option>`;
        })
        .join('');
    languagesSelect.addEventListener('change', (event) => {
        monaco.editor.setModelLanguage(editorModel!, languagesSelect.value);
        broadcast({type: 'changeLanguage', value: languagesSelect.value});
    });

    window.addEventListener('beforeunload', function() {
        for (const peer of connections.values())
            peer.conn.destroy();
        tracker.stop();
    });

}

main();
