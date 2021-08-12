declare module 'bittorrent-tracker' {
    export class Client {
        constructor(opts: { peerId: string; infoHash: string; announce: string[] });

        setInterval(interval: number);

        on(eventName: 'warning', cb: (item: any) => any);
        on(eventName: 'error', cb: (item: any) => any);
        on(eventName: 'peer', cb: (peer: SimplePeer) => any);
        on(eventName: 'connect', cb: () => any);
        on(eventName: 'update', cb: (event: any) => any);

        start();
        stop();
    }
}
