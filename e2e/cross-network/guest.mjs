import { Builder, By, until } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox.js";

const [appUrl, roomPayload, run, settleMsText] = process.argv.slice(2);
const settleMs = Number(settleMsText);
const { room, hostMarker, guestMarker } = JSON.parse(roomPayload);
const roomUrl = new URL(appUrl);
roomUrl.searchParams.set("room", room);
const driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(new firefox.Options().addArguments("-headless"))
    .build();

try {
    await driver.get(appUrl);
    await driver.executeScript(
        `localStorage.setItem("editor-name", arguments[0]); localStorage.setItem("editor-webrtc-debug", "1");`,
        `CrossNetworkGuest${run}`,
    );

    const startedWallTime = Date.now();
    await driver.get(roomUrl.href);
    const editorInput = await driver.wait(
        until.elementLocated(By.css(".monaco-editor textarea")),
        30_000,
    );
    await driver.wait(async () => {
        const nameInput = await driver.findElement(By.css("aside input"));
        return (await nameInput.getAttribute("value")) === `CrossNetworkGuest${run}`;
    }, 15_000);
    await driver.wait(
        async () =>
            (await driver.findElement(By.css("body")).getText()).includes(`CrossNetworkHost${run}`),
        60_000,
    );
    await driver.wait(
        async () => (await driver.findElement(By.css("body")).getText()).includes(hostMarker),
        60_000,
    );
    const peerAndHostTextWallTime = Date.now();

    await driver.executeScript("arguments[0].focus()", editorInput);
    await editorInput.sendKeys(guestMarker);
    await driver.sleep(settleMs);
    const diagnostics = await driver.executeScript("return window.__connectionDiagnostics || []");
    console.log(
        JSON.stringify({
            run,
            room,
            startedWallTime,
            peerAndHostTextWallTime,
            diagnostics,
        }),
    );
} finally {
    await driver.quit();
}
