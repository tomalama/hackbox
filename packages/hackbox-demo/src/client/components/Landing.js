import React, { useState } from 'react';
import { hackboxClient } from 'hackbox-client';
import Boggle from './Boggle';

function Landing() {
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [gameType, setGameType] = useState('');

  const onRoomIdChange = e => {
    const roomId = e.target.value;
    setRoomId(roomId);
  };

  const onPlayerNameChange = e => {
    const playerName = e.target.value;
    setPlayerName(playerName);
  };

  const onClickJoin = async () => {
    const hackbox = new hackboxClient('http://localhost:8080');

    const playerId = await hackbox.joinRoom({ roomId, playerName });
    setPlayerId(playerId);

    hackbox.onStartGame(gameType => {
      setGameType(gameType);
    });
  };

  if (gameType) {
    return <Boggle />;
  }

  if (playerId) {
    return (
      <div>
        <h2>Welcome {playerName}!</h2>
      </div>
    );
  }

  return (
    <div>
      <div>Landing</div>
      <div>
        <input name='roomId' value={roomId} onChange={onRoomIdChange} />
        <input
          name='playerName'
          value={playerName}
          onChange={onPlayerNameChange}
        />
        <button onClick={onClickJoin}>Join Game</button>
      </div>
    </div>
  );
}

export default Landing;
