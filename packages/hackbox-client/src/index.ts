import { Socket, io } from 'socket.io-client';
import { Room } from 'hackbox-server';

export class hackboxClient {
  socket: Socket;

  constructor(url: string) {
    this.socket = io(url);
  }

  /**
   * Room methods
   */

  createRoom(): Promise<Room> {
    return new Promise<Room>(resolve => {
      this.socket.emit('hb-createRoom');
      this.socket.on('hb-roomData', (room: Room) => {
        resolve(room);
      });
    });
  };

  onPlayerJoin(callbackFn: Function): void {
    this.socket.on('hb-onPlayerJoin', (room: Room) => {
      callbackFn(room);
    });
  };

  startGame({ roomId, gameType }: {roomId: string, gameType: string}): void {
    this.socket.emit('hb-startGame', { roomId, gameType });
  };

  getRooms(): Promise<Room[]> {
    return new Promise<Room[]>(resolve => {
      this.socket.emit('hb-getRooms');
      this.socket.on('hb-roomsData', (rooms: Room[]) => {
        resolve(rooms);
      });
    });
  }

  /**
   * Player methods
   */

  joinRoom({ roomId, playerName }: {roomId: string, playerName: string}): Promise<string> {
    return new Promise<string>(resolve => {
      this.socket.emit('hb-joinRoom', { roomId, playerName });
      this.socket.on('hb-roomConnectionSuccessful', (playerId: string) => {
        resolve(playerId);
      });
    });
  };

  onStartGame(callbackFn: Function): void {
    this.socket.on('hb-gameStart', (gameType: string) => {
      callbackFn(gameType);
    });
  };
};