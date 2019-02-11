import React, { Component } from 'react';
import { Router } from '@reach/router';
import Home from '../Home';
import Order from '../Order';
import MyOrders from '../MyOrders';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <Order path="/order" />
        <MyOrders path="/my-orders" />
      </Router>
    );
  }
}

export default Routes;
