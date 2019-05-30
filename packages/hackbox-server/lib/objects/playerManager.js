class PlayerManager {
  constructor () {
    this.players = [];
  }

  addPlayer (playerId, roomId, socketId, name) {
    const player = {
      playerId,
      roomId,
      socketId,
      name,
      isReady: false,
      score: 0
    };
    this.players.push(player);
    return player;
  }

  removePlayer (id) {
    const removedPlayer = this.players.filter(
      player => player.playerId === id
    )[0];

    if (removedPlayer) {
      this.players = this.players.filter(player => player.playerId !== id);
    }

    return removedPlayer;
  }

  getPlayer (id) {
    return this.players.filter(player => player.playerId === id)[0];
  }
}

module.exports = PlayerManager;
