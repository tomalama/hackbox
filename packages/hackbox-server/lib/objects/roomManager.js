class RoomManager {
  constructor () {
    this.rooms = [];
  }

  addRoom (roomId, socketId, maxPlayers) {
    const room = { roomId, socketId, maxPlayers, players: [] };
    this.rooms.push(room);
    return room;
  }

  removeRoom (id) {
    const removedRoom = this.rooms.filter(room => room.roomId === id)[0];

    if (removedRoom) {
      this.room = this.rooms.filter(room => room.roomId !== id);
    }

    return removedRoom;
  }

  getRoom (id) {
    return this.rooms.filter(room => room.roomId === id)[0];
  }

  addPlayer (roomId, player) {
    const room = this.getRoom(roomId);

    if (room.players.length >= room.maxPlayers) {
      return false;
    }

    room.players.push(player);
  }

  removePlayer (roomId, playerId) {
    const room = this.getRoom(roomId);

    room.players.filter(player => player.playerId !== playerId);
  }

  updatePlayerStatus (roomId, playerId, playerIsReady) {
    const room = this.getRoom(roomId);
    const player = room.players.filter(
      player => player.playerId === playerId
    )[0];

    if (player == null) {
      return false;
    }

    player.isReady = playerIsReady;
  }

  addToPlayerScore (roomId, playerId, amount) {
    const room = this.getRoom(roomId);
    const player = room.players.filter(
      player => player.playerId === playerId
    )[0];

    if (player == null) {
      return false;
    }

    player.score += amount;
  }

  allReady (roomId) {
    const room = this.getRoom(roomId);
    room.players.forEach(player => {
      if (player.isReady === false) {
        return false;
      }
    });

    return true;
  }

  roomExists (id) {
    const found = this.rooms.filter(room => room.roomId === id);

    if (found.length > 0) {
      return true;
    }

    return false;
  }
}

module.exports = RoomManager;
