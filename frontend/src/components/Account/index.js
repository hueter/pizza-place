import React, { Component } from 'react';
import authRequired from '../../hocs/authRequired';

class Order extends Component {
  render() {
    return <div>Account Component</div>;
  }
}

export default authRequired(Order);
