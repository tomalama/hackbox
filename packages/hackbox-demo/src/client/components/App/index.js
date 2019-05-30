import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "../Landing";
import Host from "../Host";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/host" component={Host} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
