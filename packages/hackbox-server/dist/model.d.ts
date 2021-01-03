export declare class Player {
    id: string;
    roomId: string;
    socketId: string;
    name: string;
    isReady: boolean;
    score: number;
}
export declare class Room {
    id: string;
    socketId: string;
    maxPlayers: number;
    players: Player[];
}
//# sourceMappingURL=model.d.ts.map