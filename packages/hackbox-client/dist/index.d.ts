export declare const hackboxClient: (url: string) => Promise<{
    createRoom: () => Promise<unknown>;
    onPlayerJoin: (callbackFn: Function) => void;
    startGame: ({ roomId, gameType }: {
        roomId: string;
        gameType: string;
    }) => void;
    joinRoom: ({ roomId, playerName }: {
        roomId: string;
        playerName: string;
    }) => Promise<unknown>;
    onStartGame: (callbackFn: Function) => void;
}>;
//# sourceMappingURL=index.d.ts.map