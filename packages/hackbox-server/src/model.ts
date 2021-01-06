/**
 * A player of a hackbox game.
 */
export class Player {
    constructor() { }
    
    id: string;
    roomId: string;
    socketId: string;
    name: string;
    isReady: boolean;
    score: number;
}

/**
 * The room where a game is hosted.
 */
export class Room {
    id: string;
    socketId: string;
    maxPlayers: number;
    players: Player[];
}

/**
 * The logic for the games running on the hackboxServer.
 */
export interface GameReference {
    gamesTypes: string[];
    demo: GameReferenceDemo;
    actions: GameReferenceAction[];
}

/**
 * TBD.
 */
export interface GameReferenceDemo {
    gameLength: number;
    validActions: number[];
    description: string;
}

/**
 * An action that can be performed by players within a game.
 */
export interface GameReferenceAction {
    actionName: string;
    threshold: number;
}