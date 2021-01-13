import { Player, Room} from './model';

export class RoomManager {
  private rooms: Room[];

  constructor () {
    this.rooms = [];
  }

  addRoom(id: string, socketId: string , maxPlayers: number): Room {
    const room: Room = new Room(id, socketId, maxPlayers);

    this.rooms.push(room);
    return room;
  }

  removeRoom(id: string): Room {
    const removedRoom = this.getRoom(id);
    this.rooms = this.rooms.filter(room => room.id !== id);

    return removedRoom;
  }

  getRoom(id: string): Room {
    if (!this.roomExists(id)) {
      throw Error('Room not found.');
    }

    return this.rooms.find(room => room.id === id)!;
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  addPlayer(roomId: string, player: Player): boolean {
    const room = this.getRoom(roomId);

    if (!room) {
      return false;
    }

    if (room.players.length >= room.maxPlayers) {
      return false;
    }

    if (room) {
      room.players.push(player);
    }

    return true;
  }

  removePlayer(roomId: string, playerId: string): Player {
    const room = this.getRoom(roomId);
    const removedPlayer = room.players.find(player => player.id === playerId);
    if (!removedPlayer) {
      throw Error('Player not found.');
    }

    return removedPlayer;
  }

  getPlayers(roomId: string): Player[] {
    const room = this.getRoom(roomId);
    return room?.players;
  }

  updatePlayerStatus(roomId: string, playerId: string, playerIsReady: boolean): boolean {
    const room = this.getRoom(roomId)!;

    const player = room.players.filter(
      player => player.id === playerId
    )[0];

    if (player == null) {
      return false;
    }

    player.isReady = playerIsReady;
    return true;
  }

  addToPlayerScore(roomId: string, playerId: string, amount: number): boolean {
    const room = this.getRoom(roomId);
    if (!room) {
      return false;
    }
    const player = room.players.find(player => {
      return player.id == playerId;
    })

    if (player == null) {
      return false;
    }

    player.score += amount;
    return true;
  }

  allReady(roomId: string): boolean {
    const room = this.getRoom(roomId);
    room.players.forEach(player => {
      if (player.isReady === false) {
        return false;
      }
    });

    return true;
  }

  roomExists(id: string): boolean {
    const found = this.rooms.find(room => room.id === id);

    if (found) {
      return true;
    }

    return false;
  }
}