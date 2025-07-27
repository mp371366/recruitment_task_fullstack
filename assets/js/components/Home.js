// ./assets/js/components/Home.js

import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Currency from './Currency';
import Index from './Index';

class Home extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className={"navbar-brand"} to={"/"}>Kantor</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/:currency" component={Currency} />
        </Switch>
      </div>
    )
  }
}

export default Home;
