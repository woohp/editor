import { mount } from "svelte";
import App from "./App.svelte";
import "./style.css";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// generate a random sequence of characters
function makeId(): string {
    return [...window.crypto.getRandomValues(new Uint8Array(20))]
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

globalThis.MonacoEnvironment = {
    getWorker: (_workerId: string, label: string) => {
        if (label === "json") {
            return new JsonWorker();
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new CssWorker();
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new HtmlWorker();
        }
        if (label === "typescript" || label === "javascript") {
            return new TsWorker();
        }
        return new EditorWorker();
    },
};

const peerId = makeId();
console.info("peerId:", peerId);

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("room");

    if (!roomId) {
        const newRoomEl = document.querySelector("#new-room") as HTMLElement;
        newRoomEl.classList.remove("hidden");
        const newRoomLink = newRoomEl.querySelector("a");
        if (newRoomLink) {
            newRoomLink.href = "?room=" + encodeURIComponent(makeId());
        }
        return;
    }
    if (roomId.length !== 40) {
        console.error("unrecognized roomId:", roomId);
        return;
    }

    const appEl = document.querySelector("#app") as HTMLDivElement;
    appEl.classList.remove("hidden");

    const cachedName = localStorage.getItem("editor-name");
    let name: string | null;
    if (cachedName == null) {
        name = prompt("Your name is...");
    } else {
        name = cachedName;
    }
    if (name == null || name === "") {
        name = `Peer ${peerId.slice(0, 8)}`;
    }
    localStorage.setItem("editor-name", name);

    mount(App, {
        target: appEl,
        props: { roomId, name },
    });
}

main();
