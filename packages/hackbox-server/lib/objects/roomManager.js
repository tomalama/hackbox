class RoomManager {
  constructor () {
    this.rooms = [];
  }

  addRoom (roomId, socketId, maxParticipants) {
    const room = { roomId, socketId, maxParticipants, participants: [] };
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

  addUser (roomId, user) {
    const room = this.getRoom(roomId);

    if (room.participants.length >= room.maxParticipants) {
      return false;
    }

    room.participants.push(user);
  }

  removeUser (roomId, userId) {
    const room = this.getRoom(roomId);

    room.participants.filter(user => user.userId !== userId);
  }

  updateUserStatus (roomId, userId, userIsReady) {
    const room = this.getRoom(roomId);
    const user = room.participants.filter(user => user.userId === userId)[0];

    if (user == null) {
      return false;
    }

    user.isReady = userIsReady;
  }

  addToUserScore (roomId, userId, amount) {
    const room = this.getRoom(roomId);
    const user = room.participants.filter(user => user.userId === userId)[0];

    if (user == null) {
      return false;
    }

    user.score += amount;
  }

  allReady (roomId) {
    const room = this.getRoom(roomId);
    room.participants.forEach(user => {
      if (user.isReady === false) {
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
