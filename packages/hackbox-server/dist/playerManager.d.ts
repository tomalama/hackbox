import { Player } from './model';
export declare class PlayerManager {
    players: Player[];
    constructor();
    addPlayer(playerId: string, roomId: string, socketId: string, name: string): Player;
    removePlayer(id: any): Player;
    getPlayer(id: any): Player;
}
//# sourceMappingURL=playerManager.d.ts.map