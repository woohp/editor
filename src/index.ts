import { Buffer } from 'buffer';

// generate a random sequence of characters
function makeId() {
    const array = new Uint8Array(20);
    return Buffer.from(window.crypto.getRandomValues(array));
}

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId: any, label: string) {
        if (label === 'json') {
            return './json.worker.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return './css.worker.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './html.worker.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.js';
        }
        return './editor.worker.js';
    },
};

const peerId = makeId();

console.info('peerId:', peerId);

window.createRoom = function createRoom() {
    const newRoomId = makeId();
    window.location.href =
        window.location.pathname + '?room=' + encodeURIComponent(newRoomId.toString('base64'));
};

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    let roomId_ = urlParams.get('room');

    if (!roomId_) {
        const newButton = document.querySelector('#new-room') as HTMLElement;
        newButton.classList.remove('hidden');
        return;
    }
    const roomId = Buffer.from(roomId_, 'base64');

    const appEl = document.querySelector('#app') as HTMLDivElement;
    appEl.classList.remove('hidden');

    const App = await import('./App.svelte');
    // const App = require('./App.svelte');
    console.debug('App', App);

    const cachedName = localStorage.getItem('editor-name');
    let name: string | null;
    if (cachedName == null) name = prompt('Your name is...');
    else name = prompt('Your name is...', cachedName);
    if (name == null || name === '') name = `Peer ${peerId.toString('hex').slice(0, 8)}`;
    localStorage.setItem('editor-name', name);

    const app = new App.default({
        target: appEl,
        props: { peerId, roomId, name },
    });
}

main();
