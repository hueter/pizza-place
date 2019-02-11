import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './style.css';

const GET_TOPPINGS = gql`
  {
    toppings {
      id
      name
      price
      recommended
    }
  }
`;

class ToppingList extends Component {
  renderButton = topping => {
    const { currentToppings, toggleTopping } = this.props;
    let buttonText = 'Add Topping';
    let buttonClass = 'add-topping';
    if (currentToppings[topping.id]) {
      buttonText = 'Remove Topping';
      buttonClass = 'remove-topping';
    }
    return (
      <button className={buttonClass} onClick={() => toggleTopping(topping)}>
        {buttonText}
      </button>
    );
  };

  render() {
    return (
      <AppContext.Consumer>
        {({ firstTime }) => {
          return (
            <Query query={GET_TOPPINGS}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                  <>
                    <h2>Available Toppings</h2>
                    {firstTime && (
                      <p style={{ color: 'rgb(88, 155, 255)' }}>
                        First Time? Toppings in Blue are Recommended!
                      </p>
                    )}
                    <ul className="topping-list">
                      {data.toppings.map(t => (
                        <li
                          className={`row topping-row ${
                            t.recommended && firstTime
                              ? 'recommended-topping'
                              : ''
                          }`}
                          key={t.id}
                        >
                          <h3>{t.name}</h3>
                          <span>@ ${t.price.toFixed(2)}</span>
                          {this.renderButton(t)}
                        </li>
                      ))}
                    </ul>
                  </>
                );
              }}
            </Query>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default ToppingList;
