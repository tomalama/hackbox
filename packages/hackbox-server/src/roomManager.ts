import { Player, Room} from './model';

export class RoomManager {
  rooms: Room[];

  constructor () {
    this.rooms = [];
  }

  addRoom (id, socketId, maxPlayers) {
    const room: Room = { id, socketId, maxPlayers, players: [] };
    this.rooms.push(room);
    return room;
  }

  removeRoom (id) {
    const removedRoom = this.rooms.filter(room => room.id === id)[0];

    if (removedRoom) {
      this.rooms = this.rooms.filter(room => room.id !== id);
    }

    return removedRoom;
  }

  getRoom (id) {
    return this.rooms.find(room => room.id === id);
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

    room.players.filter(player => player.id !== playerId);
  }

  getPlayers (roomId) {
    const room = this.getRoom(roomId);
    return room.players;
  }

  updatePlayerStatus (roomId, playerId, playerIsReady) {
    const room = this.getRoom(roomId);
    const player = room.players.filter(
      player => player.id === playerId
    )[0];

    if (player == null) {
      return false;
    }

    player.isReady = playerIsReady;
  }

  addToPlayerScore (roomId, playerId, amount) {
    const room = this.getRoom(roomId);
    const player = room.players.filter(
      player => player.id === playerId
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
    const found = this.rooms.find(room => room.id === id);

    if (found) {
      return true;
    }

    return false;
  }
}