const io = require('socket.io-client');
import { Room } from '../../hackbox-server/dist/model'; //TODO: import from non-local source

export const hackboxClient = async (url: string) => {
  const socket = await io.connect(url);

  /**
   * Room methods
   */

  const createRoom = () => {
    return new Promise(resolve => {
      socket.emit('hb-createRoom');
      socket.on('hb-roomData', (data: any) => {
        resolve(data);
      });
    });
  };

  const onPlayerJoin = (callbackFn: Function) => {
    socket.on('hb-onPlayerJoin', (room: Room) => {
      callbackFn(room);
    });
  };

  const startGame = ({ roomId, gameType }: {roomId: string, gameType: string}) => {
    socket.emit('hb-startGame', { roomId, gameType });
  };

  /**
   * Player methods
   */

  const joinRoom = ({ roomId, playerName }: {roomId: string, playerName: string}) => {
    return new Promise(resolve => {
      socket.emit('hb-joinRoom', { roomId, playerName });
      socket.on('hb-roomConnectionSuccessful', (playerId: string) => {
        resolve(playerId);
      });
    });
  };

  const onStartGame = (callbackFn: Function) => {
    socket.on('hb-gameStart', (gameType: string) => {
      callbackFn(gameType);
    });
  };

  return {
    createRoom,
    onPlayerJoin,
    startGame,
    joinRoom,
    onStartGame
  };
};