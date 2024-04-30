import { Buffer } from "node:buffer";

// generate a random sequence of characters
function makeId(): Buffer {
    return Buffer.from(window.crypto.getRandomValues(new Uint8Array(20)));
}

self.MonacoEnvironment = {
    getWorkerUrl: (_workerId: string, label: string) => {
        if (label === "json") {
            return "./json.worker.js";
        }
        if (label === "css" || label === "scss" || label === "less") {
            return "./css.worker.js";
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return "./html.worker.js";
        }
        if (label === "typescript" || label === "javascript") {
            return "./ts.worker.js";
        }
        return "./editor.worker.js";
    },
};

const peerId = makeId();
console.info("peerId:", peerId.toString("hex"));

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("room");

    if (!roomId) {
        const newRoomEl = document.querySelector("#new-room") as HTMLElement;
        newRoomEl.classList.remove("hidden");
        const newRoomLink = newRoomEl.querySelector("a");
        if (newRoomLink) {
            newRoomLink.href = "?room=" + encodeURIComponent(makeId().toString("hex"));
        }
        return;
    }
    if (roomId.length !== 40) {
        console.error("unrecognized roomId:", roomId);
        return;
    }

    const appEl = document.querySelector("#app") as HTMLDivElement;
    appEl.classList.remove("hidden");

    const App = await import("./App.svelte");
    console.debug("App", App);

    const cachedName = localStorage.getItem("editor-name");
    let name: string | null;
    if (cachedName == null) {
        name = prompt("Your name is...");
    } else {
        name = cachedName;
    }
    if (name == null || name === "") {
        name = `Peer ${peerId.toString("hex").slice(0, 8)}`;
    }
    localStorage.setItem("editor-name", name);

    const app = new App.default({
        target: appEl,
        props: { peerId, roomId, name },
    });
}

main();
