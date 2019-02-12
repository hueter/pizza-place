import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import Modal from '../Modal';
import './style.css';
import {
  NEW_PIZZA,
  NEW_ORDER,
  GET_ORDER_HISTORY
} from '../../services/gqlQueries';

class OrderModal extends Component {
  onConfirm = async () => {
    const {
      newPizzaMutation,
      size,
      toppings,
      total,
      newOrderMutation,
      placeOrder
    } = this.props;
    const result = await newPizzaMutation({
      variables: {
        input: {
          size: { inches: size.inches },
          toppings: Object.keys(toppings).map(k => ({ name: toppings[k].name }))
        }
      }
    });
    const pizzaID = result.data.newPizza.id;
    await newOrderMutation({
      variables: {
        input: {
          userId: 1,
          pizzas: [{ id: pizzaID }],
          total: parseFloat(total)
        }
      },
      refetchQueries: [{ query: GET_ORDER_HISTORY, variables: { userId: 1 } }]
    });
    placeOrder();
  };

  render() {
    const { size, toppings, total } = this.props;
    const toppingList = Object.keys(toppings).map(k => toppings[k].name);
    return (
      <Modal>
        <div className="modal">
          <div className="modal-body">
            <h1>Confirm Order</h1>
            <h2 className="modal-pizza-description">
              {size.inches}-inch pizza{' '}
              {toppingList.length > 0 && ' with ' + toppingList.join(', ')}
            </h2>
            <h1>Total: ${total}</h1>
            <div className="row modal-button-row">
              <div className="col-1 modal-button-col">
                <button
                  className="modal-cancel-button"
                  onClick={this.props.onCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="col-1 modal-button-col">
                <button
                  className="modal-confirm-button"
                  onClick={this.onConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default compose(
  graphql(NEW_PIZZA, { name: 'newPizzaMutation' }),
  graphql(NEW_ORDER, { name: 'newOrderMutation' })
)(OrderModal);
