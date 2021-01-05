import { Player } from './model';

export class PlayerManager {
  players: Player[];

  constructor () {
    this.players = [];
  }

  addPlayer(playerId: string, roomId: string, socketId: string, name: string): Player {
    const player = new Player();
    player.id = playerId;
    player.roomId = roomId;
    player.socketId = socketId;
    player.name = name;
    player.isReady = false;
    player.score = 0;

    this.players.push(player);
    return player;
  }

  removePlayer(id): Player {
    const removedPlayer = this.players.find(player => player.id === id);

    if (removedPlayer) {
      this.players = this.players.filter(player => player.id !== id);
    }

    return removedPlayer;
  }

  getPlayer(id): Player {
    return this.players.find(player => player.id === id);
  }
}