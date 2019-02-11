import React, { PureComponent } from 'react';
import NavLink from '../NavLink';
import './style.css';

class NavBar extends PureComponent {
  render() {
    return (
      <nav className="row">
        <div className="col-1">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="col-1">
          <NavLink to="/order">Order a Pizza</NavLink>
        </div>
        <div className="col-1">
          <NavLink to="/my-orders">My Orders</NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;
