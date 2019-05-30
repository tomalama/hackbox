import React, { Component } from "react";
import hackboxClient from "hackbox-client";

class Host extends Component {
  state = {
    room: {}
  };

  async componentDidMount() {
    const hackbox = await hackboxClient("http://localhost:8080");
    const room = await hackbox.createRoom();
    this.setState(() => ({ room }));

    hackbox.onPlayerJoin(room => {
      this.setState(() => ({ room }));
    });
  }

  render() {
    const { room } = this.state;
    console.log(room);
    if (!room) {
      return <div>Loading...</div>;
    }
    return <div>Host: {this.state.room.roomId}</div>;
  }
}

export default Host;
