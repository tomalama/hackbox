import { Player, Room } from './model';
export declare class RoomManager {
    private rooms;
    constructor();
    addRoom(id: string, socketId: string, maxPlayers: number): Room;
    removeRoom(id: string): Room;
    getRoom(id: string): Room;
    getRooms(): Room[];
    addPlayer(roomId: string, player: Player): boolean;
    removePlayer(roomId: string, playerId: string): Player;
    getPlayers(roomId: string): Player[];
    updatePlayerStatus(roomId: string, playerId: string, playerIsReady: boolean): boolean;
    addToPlayerScore(roomId: string, playerId: string, amount: number): boolean;
    allReady(roomId: string): boolean;
    roomExists(id: string): boolean;
}
//# sourceMappingURL=roomManager.d.ts.map