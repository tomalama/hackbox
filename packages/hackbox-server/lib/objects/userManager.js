class UserManager {
  constructor () {
    this.users = [];
  }

  addUser (userId, roomId, socketId, username) {
    const user = {
      userId,
      roomId,
      socketId,
      username,
      isReady: false,
      score: 0
    };
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    const removedUser = this.users.filter(user => user.userId === id)[0];

    if (removedUser) {
      this.users = this.users.filter(user => user.userId !== id);
    }

    return removedUser;
  }

  getUser (id) {
    return this.users.filter(user => user.userId === id)[0];
  }
}

module.exports = UserManager;
