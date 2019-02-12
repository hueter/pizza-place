import React, { Component } from 'react';
import { navigate } from '@reach/router';
import authRequired from '../../hocs/authRequired';
import ToppingList from '../ToppingList';
import SelectPizzaSize from '../SelectPizzaSize';
import Pizza from '../Pizza';
import './style.css';
import OrderModal from '../OrderModal';

class Order extends Component {
  state = {
    currentToppings: {},
    size: {
      inches: 12,
      price: 10
    },
    modalOpen: false
  };

  handleSubmit = () => {};

  toggleTopping = topping => {
    const { currentToppings } = this.state;
    let nextToppings;
    if (currentToppings[topping.id]) {
      nextToppings = { ...currentToppings };
      delete nextToppings[topping.id];
    } else {
      nextToppings = { ...currentToppings, [topping.id]: topping };
    }

    this.setState({ currentToppings: nextToppings });
  };

  changeSize = e => {
    this.setState({ size: JSON.parse(e.target.value) });
  };

  placeOrder = () => {
    this.setState({ modalOpen: false }, () => {
      navigate('/my-orders');
    });
  };

  toggleModal = () => {
    return this.setState(st => {
      return { modalOpen: !st.modalOpen };
    });
  };

  getTotal = () => {
    const { currentToppings, size } = this.state;
    let total = 0;
    Object.keys(currentToppings).forEach(t => {
      total += currentToppings[t].price;
    });
    total += size.price;

    return total.toFixed(2);
  };

  render() {
    return (
      <div className="container">
        {this.state.modalOpen && (
          <OrderModal
            onCancel={this.toggleModal}
            placeOrder={this.placeOrder}
            size={this.state.size}
            toppings={this.state.currentToppings}
            total={this.getTotal()}
          />
        )}
        <div className="row" style={{ margin: '1% 5%' }}>
          <div className="col-1 pizza-col">
            <h2>Total: ${this.getTotal()}</h2>
            <Pizza
              currentToppings={this.state.currentToppings}
              size={this.state.size.inches}
            />
          </div>
          <div className="col-1 options-col">
            <h2>Select Pizza Size</h2>
            <SelectPizzaSize changeSize={this.changeSize} />
            <ToppingList
              toggleTopping={this.toggleTopping}
              currentToppings={this.state.currentToppings}
            />
          </div>
          <div className="col-1 order-col">
            <button className="order-now" onClick={this.toggleModal}>
              Order Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default authRequired(Order);
