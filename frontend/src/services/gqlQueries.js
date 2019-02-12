import gql from 'graphql-tag';

export const NEW_PIZZA = gql`
  mutation newPizza($input: NewPizzaInput!) {
    newPizza(input: $input) {
      id
    }
  }
`;

export const NEW_ORDER = gql`
  mutation newOrder($input: NewOrderInput!) {
    newOrder(input: $input) {
      id
    }
  }
`;

export const GET_ORDER_HISTORY = gql`
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

export const GET_TOPPINGS = gql`
  {
    toppings {
      id
      name
      price
      recommended
    }
  }
`;

export const GET_SIZES = gql`
  {
    sizes {
      id
      inches
      price
    }
  }
`;
