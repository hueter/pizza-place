import React, { Component } from 'react';
import authRequired from '../../hocs/authRequired';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AppContext from '../../AppContext';
import moment from 'moment';
import './style.css';

const GET_ORDER_HISTORY = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      orders {
        id
        createdAt
        total
        pizzas {
          id
          toppings {
            name
          }
          size {
            inches
          }
        }
      }
    }
  }
`;
class Order extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({ userId }) => {
          return (
            <Query query={GET_ORDER_HISTORY} variables={{ userId }}>
              {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                  <div className="row order-history">
                    <h1>Your Order History</h1>
                    <table className="order-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Pizzas Ordered</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.user.orders.map(order => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{moment(order.createdAt).format('LLLL')}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td className="pizzas-cell">
                              <ol>
                                {order.pizzas.map(pizza => {
                                  return (
                                    <li key={`${order.id}-${pizza.id}`}>
                                      {pizza.size.inches}-inch pizza
                                      {pizza.toppings.length > 0 &&
                                        ' with ' +
                                          pizza.toppings
                                            .map(t => t.name)
                                            .join(', ')}
                                    </li>
                                  );
                                })}
                              </ol>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default authRequired(Order);
