import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const sshHost = process.argv[2];
const attempts = Number(process.argv[3] ?? process.env.CROSS_NETWORK_ATTEMPTS ?? 5);
const appUrl = process.env.CROSS_NETWORK_APP_URL ?? "https://woohp.github.io/editor/";
const settleMs = Number(process.env.CROSS_NETWORK_SETTLE_MS ?? 12_000);
const controlPath = join(tmpdir(), "editor-cross-network-%C");
const remoteDir = "/tmp/editor-cross-network";
const scriptDir = dirname(fileURLToPath(import.meta.url));

if (!sshHost) {
    console.error("Usage: npm run test:cross-network -- <ssh-host> [attempts]");
    process.exit(2);
}
if (!Number.isInteger(attempts) || attempts < 1) {
    console.error("attempts must be a positive integer");
    process.exit(2);
}

const tempDir = await mkdtemp(join(tmpdir(), "editor-cross-network-"));
const results = [];
let masterStarted = false;

try {
    await run("ssh", [
        "-MNf",
        "-o",
        "ControlMaster=yes",
        "-o",
        `ControlPath=${controlPath}`,
        "-o",
        "ControlPersist=10m",
        sshHost,
    ]);
    masterStarted = true;
    const sshOptions = ["-o", `ControlPath=${controlPath}`];
    await run("ssh", [
        ...sshOptions,
        sshHost,
        `export PATH=/opt/homebrew/bin:$PATH; mkdir -p ${remoteDir}; cd ${remoteDir}; test -f package.json || npm init -y >/dev/null; test -d node_modules/selenium-webdriver || npm install selenium-webdriver --no-audit --no-fund >/dev/null`,
    ]);
    await run("scp", [
        ...sshOptions,
        join(scriptDir, "guest.mjs"),
        `${sshHost}:${remoteDir}/guest.mjs`,
    ]);

    for (let runNumber = 1; runNumber <= attempts; runNumber++) {
        const roomFile = join(tempDir, `room-${runNumber}`);
        const hostProcess = spawn(
            process.execPath,
            [join(scriptDir, "host.mjs"), appUrl, String(runNumber), roomFile, String(settleMs)],
            { stdio: ["ignore", "pipe", "pipe"] },
        );
        const hostOutput = collect(hostProcess);

        try {
            const roomPayload = await waitForFile(roomFile, 30_000);
            const { room } = JSON.parse(roomPayload);
            console.log(`run ${runNumber}/${attempts}: room ${room}`);
            const remoteCommand = [
                "export PATH=/opt/homebrew/bin:$PATH;",
                `cd ${remoteDir};`,
                "node guest.mjs",
                shellQuote(appUrl),
                shellQuote(roomPayload),
                String(runNumber),
                String(settleMs),
            ].join(" ");
            const guestOutput = await run("ssh", [...sshOptions, sshHost, remoteCommand]);
            const hostResult = await hostOutput;
            const guest = parseJsonOutput(guestOutput.stdout, "guest");
            const host = parseJsonOutput(hostResult.stdout, "host");
            const result = summarizeRun(host, guest);
            results.push({ host, guest, summary: result });
            console.log(formatSummary(result));
        } catch (error) {
            hostProcess.kill("SIGTERM");
            await hostOutput.catch(() => undefined);
            throw error;
        }
    }

    const report = {
        createdAt: new Date().toISOString(),
        sshHost,
        appUrl,
        attempts,
        results,
        aggregate: aggregate(results.map(({ summary }) => summary)),
    };
    const resultsDir = join(scriptDir, "results");
    await mkdir(resultsDir, { recursive: true });
    const reportPath = join(resultsDir, `${Date.now()}.json`);
    await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`report: ${reportPath}`);
    console.log(formatAggregate(report.aggregate));

    if (results.some(({ summary }) => !summary.passed)) process.exitCode = 1;
} finally {
    if (masterStarted) {
        const sshOptions = ["-o", `ControlPath=${controlPath}`];
        await run("ssh", [...sshOptions, sshHost, `rm -rf ${remoteDir}`]).catch(() => undefined);
        await run("ssh", ["-O", "exit", ...sshOptions, sshHost]).catch(() => undefined);
    }
    await rm(tempDir, { recursive: true, force: true });
}

function summarizeRun(host, guest) {
    const guestConnects = peerConnectTimes(guest.diagnostics, guest.startedWallTime);
    const hostConnects = peerConnectTimes(host.diagnostics, guest.startedWallTime);
    const providers = ["nostr", "webtorrent"];
    const guestUiMs = guest.peerAndHostTextWallTime - guest.startedWallTime;
    const hostUiMs = host.peerAndGuestTextWallTime - guest.startedWallTime;
    const passed = providers.every(
        (provider) =>
            Number.isFinite(guestConnects[provider]) && Number.isFinite(hostConnects[provider]),
    );
    return {
        run: Number(guest.run),
        room: guest.room,
        guestUiMs,
        hostUiMs,
        guestConnects,
        hostConnects,
        passed,
    };
}

function peerConnectTimes(diagnostics, startWallTime) {
    const times = {};
    for (const entry of diagnostics) {
        const detail = entry.detail;
        if (detail?.event?.type !== "peer-connect" || typeof detail.provider !== "string") continue;
        const elapsed = entry.wallTime - startWallTime;
        times[detail.provider] = Math.min(times[detail.provider] ?? Infinity, elapsed);
    }
    return times;
}

function aggregate(summaries) {
    return {
        passed: summaries.filter(({ passed }) => passed).length,
        attempts: summaries.length,
        guestUiMs: stats(summaries.map(({ guestUiMs }) => guestUiMs)),
        hostUiMs: stats(summaries.map(({ hostUiMs }) => hostUiMs)),
        nostrMs: stats(
            summaries.map(({ guestConnects }) => guestConnects.nostr).filter(Number.isFinite),
        ),
        webtorrentMs: stats(
            summaries.map(({ guestConnects }) => guestConnects.webtorrent).filter(Number.isFinite),
        ),
    };
}

function stats(values) {
    if (values.length === 0) return null;
    const sorted = [...values].sort((a, b) => a - b);
    return {
        min: Math.round(sorted[0]),
        median: Math.round(sorted[Math.floor(sorted.length / 2)]),
        max: Math.round(sorted.at(-1)),
    };
}

function formatSummary(result) {
    const provider = (name) =>
        Number.isFinite(result.guestConnects[name])
            ? `${Math.round(result.guestConnects[name])}ms`
            : "FAILED";
    return `  peer guest=${Math.round(result.guestUiMs)}ms host=${Math.round(result.hostUiMs)}ms; nostr=${provider("nostr")}; webtorrent=${provider("webtorrent")}; ${result.passed ? "PASS" : "FAIL"}`;
}

function formatAggregate(result) {
    const median = (value) => (value ? `${value.median}ms` : "FAILED");
    return `passed ${result.passed}/${result.attempts}; median guest peer=${median(result.guestUiMs)}, host peer=${median(result.hostUiMs)}, nostr=${median(result.nostrMs)}, webtorrent=${median(result.webtorrentMs)}`;
}

function parseJsonOutput(output, label) {
    const lines = output.trim().split("\n").filter(Boolean);
    try {
        return JSON.parse(lines.at(-1));
    } catch {
        throw new Error(`Could not parse ${label} output:\n${output}`);
    }
}

async function waitForFile(path, timeoutMs) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        try {
            return (await readFile(path, "utf8")).trim();
        } catch {
            await new Promise((resolve) => setTimeout(resolve, 200));
        }
    }
    throw new Error(`Timed out waiting for ${path}`);
}

function collect(child) {
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => (stdout += chunk));
    child.stderr.on("data", (chunk) => (stderr += chunk));
    return new Promise((resolve, reject) => {
        child.on("error", reject);
        child.on("exit", (code) => {
            if (code === 0) resolve({ stdout, stderr });
            else reject(new Error(`Host process exited ${code}:\n${stderr || stdout}`));
        });
    });
}

function run(command, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
        let stdout = "";
        let stderr = "";
        child.stdout.on("data", (chunk) => (stdout += chunk));
        child.stderr.on("data", (chunk) => (stderr += chunk));
        child.on("error", reject);
        child.on("exit", (code) => {
            if (code === 0) resolve({ stdout, stderr });
            else reject(new Error(`${command} exited ${code}:\n${stderr || stdout}`));
        });
    });
}

function shellQuote(value) {
    return `'${String(value).replaceAll("'", `'\\''`)}'`;
}
