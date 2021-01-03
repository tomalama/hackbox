import { Player } from './model';
export declare class PlayerManager {
    players: Player[];
    constructor();
    addPlayer({ id, roomId, socketId, name }: {
        id: any;
        roomId: any;
        socketId: any;
        name: any;
    }): {
        id: any;
        roomId: any;
        socketId: any;
        name: any;
        isReady: boolean;
        score: number;
    };
    removePlayer(id: any): Player;
    getPlayer(id: any): Player;
}
