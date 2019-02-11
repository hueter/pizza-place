import React, { Component } from 'react';
import authRequired from '../../hocs/authRequired';

class Order extends Component {
  render() {
    return <div>Order Component</div>;
  }
}

export default authRequired(Order);
