# `hackbox-server`

A Jackbox inspired framework for creating party games - server component.

## Usage

```javascript
import { hackboxServer } from 'hackbox-server';
import { gameReference } from './gameReference.js';

const port = process.env.PORT || 8080;
hackboxServer(port , gameReference);
//Hackbox online on port 8080!
```

### Game Reference

```javascript
module.exports = {
  gameTypes: ["demo"],
  demo: {
    gameLength: 60000,
    validActionIds: [0, 1],
    description: `This is the description of the game. You have 60 seconds to compete`
  },
  actions: {
    0: { actionName: "action1" },
    1: { actionName: "action2" }
  }
};
```
