import { Socket } from 'socket.io-client';
import { Room } from 'hackbox-server';
export declare class hackboxClient {
    socket: Socket;
    constructor(url: string);
    /**
     * Room methods
     */
    createRoom(): Promise<Room>;
    onPlayerJoin(callbackFn: Function): void;
    startGame({ roomId, gameType }: {
        roomId: string;
        gameType: string;
    }): void;
    getRooms(): Promise<Room[]>;
    /**
     * Player methods
     */
    joinRoom({ roomId, playerName }: {
        roomId: string;
        playerName: string;
    }): Promise<string>;
    onStartGame(callbackFn: Function): void;
}
//# sourceMappingURL=index.d.ts.map