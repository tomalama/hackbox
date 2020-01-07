class PlayerManager {
  constructor () {
    this.players = [];
  }

  addPlayer ({ id, roomId, socketId, name }) {
    const player = {
      id,
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
    const removedPlayer = this.players.find(player => player.id === id);

    if (removedPlayer) {
      this.players = this.players.filter(player => player.id !== id);
    }

    return removedPlayer;
  }

  getPlayer (id) {
    return this.players.find(player => player.id === id);
  }
}

module.exports = PlayerManager;
