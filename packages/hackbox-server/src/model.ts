export class Player {
    id: string;
    roomId: string;
    socketId: string;
    name: string;
    isReady: boolean;
    score: number;
}

export class Room {
    id: string;
    socketId: string;
    maxPlayers: number;
    players: Player[];
}