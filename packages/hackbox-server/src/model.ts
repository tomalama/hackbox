/**
 * A player of a hackbox game.
 */
export class Player {
    public isReady: boolean;
    public score: number;

    constructor(
        public id: string,
        public socketId: string,
        public name: string,
    ) { 
        this.isReady = false;
        this.score = 0;
    }
}

/**
 * A room that hosts a game.
 */
export class Room {
    players: Player[];

    constructor(
        public id: string,
        public socketId: string,
        public maxPlayers: number,
    ) {
        this.players = [];
    }
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