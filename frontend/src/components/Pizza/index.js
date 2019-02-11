import React, { Component } from 'react';
import PizzaSVG from '../../svg/pizza_plain.svg';

class Pizza extends Component {
  render() {
    const { currentToppings, size } = this.props;
    return (
      <div>
        <h2>Current Pizza</h2>
        <img
          src={PizzaSVG}
          style={{ width: `${size * 2}em`, height: `${size * 2}em` }}
          alt="your pizza"
        />
        <h2>Current Toppings</h2>
        {Object.keys(currentToppings).map(k => (
          <li>{currentToppings[k].name}</li>
        ))}
      </div>
    );
  }
}

export default Pizza;
