import React, { PureComponent } from 'react';
import NavLink from '../NavLink';

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
          <NavLink to="/account">My Orders</NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;
