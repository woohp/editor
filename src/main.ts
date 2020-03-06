import Discovery from 'torrent-discovery';
import * as monaco from 'monaco-editor';

// generate a random sequence of characters
function makeId() {
    let result = [];
    const characters = '0123456789abcdef';
    for (let i = 0; i < 40; i++)
        result.push(characters[Math.floor(Math.random() * characters.length)]);
    return result.join('');
}

interface SimplePeer {
    id: string;

    on(eventName: 'connect', cb: () => any): any;
    on(eventName: 'data', cb: (data: Uint8Array) => any): any;
    on(eventName: 'close', cb: () => any): any;
    on(eventName: 'error', cb: (err: any) => any): any;

    send(data: string): any;
    destroy(): any;
}

interface Peer {
    displayName: string;
    conn: SimplePeer;
}

const peerId = makeId();
const connections: Map<string, Peer> = new Map();
let name: string|null = null;
let editorModel: monaco.editor.ITextModel|null = null;
let trackingChanges = true;

console.log('peerId:', peerId);

function updatePeersDisplay() {
    const frags = [`<li>${ name }<\/li>`];
    for (const peer of connections.values()) {
        frags.push(`<li>${ peer.displayName }<\/li>`);
    }
    document.querySelector('#peers')!.innerHTML = frags.join('');
}

function createRoom() {
    window.location.href = window.location.pathname + '?room=' + makeId();
}

function joinRoom(roomId: string) {
    const cachedName = localStorage.getItem('editor-name');
    if (cachedName == null)
        name = prompt('Your name is...');
    else
        name = prompt('Your name is...', cachedName);
    if (name == null)
        return;
    localStorage.setItem('editor-name', name);
    updatePeersDisplay();

    const discovery = new Discovery({
        infoHash: roomId,
        peerId: peerId,
        announce: ['wss://tracker.openwebtorrent.com'],
    });
    console.log('discovery:', discovery);
    discovery.on('warning', console.warn);
    discovery.on('error', console.error);
    discovery.on('peer', (peer: SimplePeer, _source: string) => {
        console.log('peer:', peer);
        const peerId = peer.id;
        if (peerId.length !== 40 || connections.has(peerId))
            return;

        peer.on('connect', () => {
            setupConnection(peer);
            updatePeersDisplay();
        });
    });
}

function setupConnection(peer: SimplePeer) {
    const peerId = peer.id
    connections.set(peerId, {displayName: '', conn: peer});

    peer.on('data', (data) => receiveData(peerId, data));
    peer.on('close', () => {
        console.log('peer closed:', peer.id);
        connections.delete(peer.id);
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
        peer.send(JSON.stringify({type: 'state', value: existingValue}));
}

function broadcast(data: any) {
    console.log('broadcasting to:', connections);
    const data_ = JSON.stringify(data);
    for (const peer of connections.values()) {
        try {
            peer.conn.send(data_);
        } catch {
        }
    }
}

function receiveData(peerId: string, data_: Uint8Array) {
    const data = JSON.parse(new TextDecoder('utf-8').decode(data_));
    console.log('incoming:', data);

    if (data.type === 'edits') {
        const edits = data.value;
        for (let edit of edits)
            edit.forceMoveMarkers = true;

        trackingChanges = false;
        editorModel!.pushEditOperations([], edits, () => null);
        trackingChanges = true;
        console.log('incoming done');
    } else if (data.type === 'greet') {
        const value = data.value;
        const peer = connections.get(peerId);
        if (peer != null)
            peer.displayName = value;
        updatePeersDisplay();
    } else if (data.type === 'state') {
        trackingChanges = false;
        editorModel!.setValue(data.value);
        trackingChanges = true;
    }
}

export default () => {

    console.log('main');

    const newButton = document.querySelector('#new-room') as HTMLButtonElement;
    newButton.addEventListener('click', createRoom, false);

    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');

    if (!roomId) {
        newButton.style.display = 'block';
        return;
    }

    joinRoom(roomId);

    // create the editor

    // populate langauges list
    document.querySelector('#languages')!.innerHTML = monaco.languages.getLanguages()
        .filter(lang => lang.aliases !== undefined)
        .map(lang => {
            return `<option value="${ lang.id }">${ lang.aliases![0] }<\/option>`;
        }).join('');

    const editor = monaco.editor.create(document.getElementById('editor') as HTMLDivElement, {
        value: '',
        language: 'plaintext'
    });
    console.log('editor:', editor);

    editorModel = editor.getModel();
    const languagesSelect = document.querySelector('#languages') as HTMLSelectElement;
    languagesSelect.addEventListener('change', (event) => {
        monaco.editor.setModelLanguage(editorModel!, languagesSelect.value);
    });
    console.log('model:', editorModel);

    editorModel!.onDidChangeContent(event => {
        console.log('change:', event);
        if (!trackingChanges)
            return;
        broadcast({type: 'edits', value: event.changes});
    });

    window.addEventListener('beforeunload', function() {
        for (let peer of connections.values())
            peer.conn.destroy();
    });

}
