declare module "bittorrent-tracker" {
    type SimplePeer = unknown;

    export class Client {
        constructor(opts: {
            peerId: string | Buffer;
            infoHash: string | Buffer;
            announce: string[];
        });

        setInterval(interval: number): void;

        on(eventName: "warning", cb: (item: unknown) => void): void;
        on(eventName: "error", cb: (item: unknown) => void): void;
        on(eventName: "peer", cb: (peer: SimplePeer) => void): void;
        on(eventName: "connect", cb: () => void): void;
        on(eventName: "update", cb: (event: unknown) => void): void;

        start(): void;
        stop(): void;
    }
}
