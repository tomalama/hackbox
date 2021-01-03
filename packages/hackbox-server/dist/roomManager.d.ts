import { Player, Room } from './model';
export declare class RoomManager {
    rooms: Room[];
    constructor();
    addRoom(id: any, socketId: any, maxPlayers: any): Room;
    removeRoom(id: any): Room;
    getRoom(id: any): Room;
    addPlayer(roomId: any, player: any): boolean;
    removePlayer(roomId: any, playerId: any): void;
    getPlayers(roomId: any): Player[];
    updatePlayerStatus(roomId: any, playerId: any, playerIsReady: any): boolean;
    addToPlayerScore(roomId: any, playerId: any, amount: any): boolean;
    allReady(roomId: any): boolean;
    roomExists(id: any): boolean;
}
