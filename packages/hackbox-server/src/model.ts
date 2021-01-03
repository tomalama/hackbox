export class Player {
    constructor() { }
    
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

export interface GameReference {
    gamesTypes: string[];
    demo: GameReferenceDemo;
    actions: GameReferenceAction[];
}

export interface GameReferenceDemo {
    gameLength: number;
    validActions: number[];
    description: string;
}

export interface GameReferenceAction {
    actionName: string;
    threshold: number;
}