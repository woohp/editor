import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const [appUrl, run, roomFile, settleMsText] = process.argv.slice(2);
const settleMs = Number(settleMsText);
const room = randomBytes(20).toString("hex");
const roomUrl = new URL(appUrl);
roomUrl.searchParams.set("room", room);
const hostMarker = `host${run}${Date.now()}`;
const guestMarker = `guest${run}${Date.now()}`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
await context.addInitScript(
    ({ name }) => {
        localStorage.setItem("editor-name", name);
        localStorage.setItem("editor-webrtc-debug", "1");
    },
    { name: `CrossNetworkHost${run}` },
);
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
});

try {
    await page.goto(roomUrl.href);
    await page.locator(".monaco-editor").waitFor({ state: "visible", timeout: 30_000 });
    await page.locator(".monaco-editor").click();
    await page.keyboard.type(`${hostMarker} `);
    writeFileSync(roomFile, JSON.stringify({ room, hostMarker, guestMarker }));

    await page.getByText(`CrossNetworkGuest${run}`, { exact: true }).waitFor({
        state: "visible",
        timeout: 60_000,
    });
    await page.getByText(guestMarker, { exact: false }).waitFor({
        state: "visible",
        timeout: 60_000,
    });
    const peerAndGuestTextWallTime = Date.now();
    await page.waitForTimeout(settleMs);
    const diagnostics = await page.evaluate(() => window.__connectionDiagnostics ?? []);
    console.log(JSON.stringify({ run, room, peerAndGuestTextWallTime, diagnostics, errors }));
} finally {
    await browser.close();
}
