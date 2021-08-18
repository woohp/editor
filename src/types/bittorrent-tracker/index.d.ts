declare module 'bittorrent-tracker' {
    export class Client {
        constructor(opts: {
            peerId: string | Buffer;
            infoHash: string | Buffer;
            announce: string[];
        });

        setInterval(interval: number);

        on(eventName: 'warning', cb: (item: any) => void);
        on(eventName: 'error', cb: (item: any) => void);
        on(eventName: 'peer', cb: (peer: SimplePeer) => void);
        on(eventName: 'connect', cb: () => void);
        on(eventName: 'update', cb: (event: any) => void);

        start();
        stop();
    }
}
