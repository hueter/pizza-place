import React, { Component } from 'react';
import Modal from '../Modal';
import './style.css';

class OrderModal extends Component {
  render() {
    const { size, toppings, total } = this.props;
    const toppingList = Object.keys(toppings).map(k => toppings[k].name);
    return (
      <Modal>
        <div className="modal">
          <div className="modal-body">
            <h1>Confirm Order</h1>
            <h2 className="modal-pizza-description">
              {size}-inch pizza{' '}
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
                  onClick={this.props.onConfirm}
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

export default OrderModal;
