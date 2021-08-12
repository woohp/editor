// generate a random sequence of characters
function makeId() {
    const result = [];
    const characters = '0123456789abcdef';
    for (let i = 0; i < 40; i++)
        result.push(characters[Math.floor(Math.random() * characters.length)]);
    return result.join('');
}

function hexToBase64(hex: string) {
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return btoa(str);
}

function base64ToHex(base64: string) {
    return atob(base64)
        .split('')
        .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
}

self.MonacoEnvironment = {
    getWorkerUrl: function(moduleId: any, label: string) {
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

function createRoom() {
    const newRoomId = makeId();
    window.location.href =
        window.location.pathname + '?room=' + encodeURIComponent(hexToBase64(newRoomId));
}

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    let roomId = urlParams.get('room');

    if (!roomId) {
        const newButton = document.querySelector('#new-room') as HTMLButtonElement;
        newButton.addEventListener('click', createRoom, false);
        newButton.classList.remove('hidden');
        return;
    }
    roomId = base64ToHex(roomId);

    const appEl = document.querySelector('#app') as HTMLDivElement;
    appEl.classList.remove('hidden');

    const App = await import('./App.svelte');
    // const App = require('./App.svelte');
    console.debug('App', App);

    const cachedName = localStorage.getItem('editor-name');
    let name: string | null;
    if (cachedName == null) name = prompt('Your name is...');
    else name = prompt('Your name is...', cachedName);
    if (name == null || name === '') name = `Peer ${peerId.slice(0, 8)}`;
    localStorage.setItem('editor-name', name);

    const app = new App.default({
        target: appEl,
        props: { peerId, roomId, name },
    });
}

main();
