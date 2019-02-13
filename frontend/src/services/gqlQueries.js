import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation signup($input: NewUserInput!) {
    signup(input: $input) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

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
  {
    myProfile {
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
