import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import hackboxClient from "hackbox-client";

class Landing extends Component {
  state = {
    roomId: "",
    name: ""
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickJoin = async () => {
    const { roomId, name } = this.state;
    const hackbox = await hackboxClient("http://localhost:8080");

    const playerId = await hackbox.joinRoom(roomId, name);
  };

  onRouteChange = () => {
    let path = `host`;
    this.props.history.push(path);
  };

  render() {
    const { roomId, name } = this.state;
    return (
      <div>
        <div>Landing</div>
        <div>
          <input name="roomId" value={roomId} onChange={this.onInputChange} />
          <input name="name" value={name} onChange={this.onInputChange} />
          <button onClick={this.onClickJoin}>Join Game</button>
        </div>
        <div>
          <button onClick={this.onRouteChange}>Create Game</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
