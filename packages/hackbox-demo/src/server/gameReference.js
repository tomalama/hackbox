module.exports = {
  gameTypes: ["demo"],
  demo: {
    gameLength: 60000,
    validActionIds: [0, 1],
    description: `This is the description of the game. You have 60 seconds to compete`
  },
  actions: {
    0: { actionName: "action1", threshold: 0 },
    1: { actionName: "action2", threshold: 0 }
  }
};
