import { Player, Room} from './model';

export class RoomManager {
  rooms: Room[];

  constructor () {
    this.rooms = [];
  }

  addRoom(id, socketId, maxPlayers): Room {
    const room: Room = new Room();
    room.id = id;
    room.socketId = socketId;
    room.maxPlayers = maxPlayers;
    room.players = [];

    this.rooms.push(room);
    return room;
  }

  removeRoom(id): Room {
    const removedRoom = this.rooms.filter(room => room.id === id)[0];

    if (removedRoom) {
      this.rooms = this.rooms.filter(room => room.id !== id);
    }

    return removedRoom;
  }

  getRoom(id): Room {
    return this.rooms.find(room => room.id === id);
  }

  addPlayer(roomId, player): boolean {
    const room = this.getRoom(roomId);

    if (room.players.length >= room.maxPlayers) {
      return false;
    }

    room.players.push(player);

    return true;
  }

  removePlayer(roomId, playerId) {
    const room = this.getRoom(roomId);

    //TODO: check if succesfully removed and return true/false
    room?.players.filter(player => player.id !== playerId);
  }

  getPlayers(roomId) {
    const room = this.getRoom(roomId);
    return room.players;
  }

  updatePlayerStatus(roomId, playerId, playerIsReady): boolean {
    const room = this.getRoom(roomId);
    const player = room.players.filter(
      player => player.id === playerId
    )[0];

    if (player == null) {
      return false;
    }

    player.isReady = playerIsReady;
    return true;
  }

  addToPlayerScore(roomId, playerId, amount): boolean {
    const room = this.getRoom(roomId);
    const player = room.players.filter(
      player => player.id === playerId
    )[0];

    if (player == null) {
      return false;
    }

    player.score += amount;
    return true;
  }

  allReady(roomId): boolean {
    const room = this.getRoom(roomId);
    room.players.forEach(player => {
      if (player.isReady === false) {
        return false;
      }
    });

    return true;
  }

  roomExists(id): boolean {
    const found = this.rooms.find(room => room.id === id);

    if (found) {
      return true;
    }

    return false;
  }
}