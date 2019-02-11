import React, { Component } from 'react';
import './style.css';

let svgMap = {};
let req = require.context('../../svg', false, /.*\.svg$/);
req.keys().forEach(function(key) {
  svgMap[key.slice(2, -4)] = req(key);
});

class Pizza extends Component {
  render() {
    const { currentToppings, size } = this.props;
    return (
      <div>
        <h2>Current Pizza</h2>
        <div className="pizza-holder">
          <img
            className={`the-pizza inch-${size}`}
            src={svgMap.pizza}
            alt="your pizza"
          />
          {Object.keys(currentToppings).map(k => {
            const topping = currentToppings[k].name.replace(/ /g, '_');
            return (
              <img
                src={svgMap[topping]}
                className={`inch-${size} topping`}
                alt={`${svgMap[topping]} topping`}
                key={k}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Pizza;
