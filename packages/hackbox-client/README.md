# `hackbox-client`

A Jackbox inspired framework for creating party games - client component.

## Usage

```javascript
const hackboxClient = require("hackbox-client");
```

### Hosting

```javascript
async componentDidMount() {
  const hackbox = await hackboxClient("http://localhost:8080");
  const room = await hackbox.createRoom();
  this.setState(() => ({ room }));

  hackbox.onPlayerJoin(room => {
    this.setState(() => ({ room }));
  });
}
```

### Joining a Room

```javascript
const hackbox = await hackboxClient("http://localhost:8080");
const playerId = await hackbox.joinRoom(roomId, name);
```
