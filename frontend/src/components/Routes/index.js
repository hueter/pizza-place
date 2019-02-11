import React, { Component } from 'react';
import { Router } from '@reach/router';
import Home from '../Home';
import Order from '../Order';
import Account from '../Account';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <Order path="/order" />
        <Account path="/account" />
      </Router>
    );
  }
}

export default Routes;
