# `hackbox-client`

A Jackbox inspired framework for creating party games - client component.

## Usage

```typescript
import { hackboxClient } from 'hackbox-client';

const hackbox = new hackboxClient('http://localhost:8080');
```

### Create a game room

```typescript
let room: Room = await hackbox.createRoom();
console.log(room); //{id: "20QL9", socketId: "34DsBMVotFWdAJzXAAAl", maxPlayers: 8, players: Array(0)}
```

### Joining a Room

```typescript
let playerId = await hackbox.joinRoom({ roomId: roomCodeInput, playerName: nameInput });
console.log(playerId); //9KD5R
```

### Listening to a room event

```typescript
hackbox.onPlayerJoin((updatedRoom: Room) => {
  console.log(updatedRoom) //{id: "20QL9", socketId: "34DsBMVotFWdAJzXAAAl", maxPlayers: 8, players: Array(1)}
});
```
