export declare const hackboxClient: (url: any) => Promise<{
    createRoom: () => Promise<unknown>;
    onPlayerJoin: (cb: any) => void;
    startGame: ({ roomId, gameType }: {
        roomId: any;
        gameType: any;
    }) => void;
    joinRoom: ({ roomId, playerName }: {
        roomId: any;
        playerName: any;
    }) => Promise<unknown>;
    onStartGame: (cb: any) => void;
}>;
//# sourceMappingURL=index.d.ts.map