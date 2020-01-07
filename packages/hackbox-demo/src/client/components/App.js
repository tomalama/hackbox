import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Landing from './Landing';
import Host from './Host';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/host' component={Host} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
