import React, { useState, useEffect } from 'react';
import { hackboxClient } from 'hackbox-client';

function Host() {
  const [hackbox, setHackbox] = useState(false); 
  const [room, setRoom] = useState({});
  const [gameType, setGameType] = useState('demo');

  useEffect(() => {
    const createRoom = async () => {
      const hackbox = new hackboxClient('http://localhost:8080');
      setHackbox(hackbox);

      const room = await hackbox.createRoom();
      console.log(room);
      setRoom(room);

      hackbox.onPlayerJoin(room => {
        console.log(room);
        setRoom(room);
      });
    };

    createRoom();
  }, []);

  const onClickGameMode = gameType => {
    setGameType(gameType);
  }

  const onClickStartGame = () => {
    hackbox.startGame({roomId: room.id, gameType});
  };

  if (!Object.entries(room).length) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Host'>
      <div className='Host__Room-information'>
        <div>
          <h2>Room ID: {room.id}</h2>
        </div>
        <div>
          <h2>Game Mode</h2>
          <button onClick={() => onClickGameMode('demo')}>Demo</button>
        </div>
        <div>
          <h2>Players</h2>
          <ul>
            {room.players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='Host__Room-controls'>
        <button onClick={onClickStartGame}>Start Game</button>
      </div>
    </div>
  );
}

export default Host;
