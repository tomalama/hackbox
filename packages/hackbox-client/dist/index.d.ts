import { Room } from '../../hackbox-server/dist/model';
export declare const hackboxClient: (url: string) => Promise<{
    createRoom: () => Promise<Room>;
    getRooms: () => Promise<Room[]>;
    onPlayerJoin: (callbackFn: Function) => void;
    startGame: ({ roomId, gameType }: {
        roomId: string;
        gameType: string;
    }) => void;
    joinRoom: ({ roomId, playerName }: {
        roomId: string;
        playerName: string;
    }) => Promise<string>;
    onStartGame: (callbackFn: Function) => void;
}>;
//# sourceMappingURL=index.d.ts.map