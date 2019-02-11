import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { Component } from 'react';
import './style.css';

const GET_SIZES = gql`
  {
    sizes {
      id
      inches
      price
    }
  }
`;
class SelectPizzaSize extends Component {
  render() {
    return (
      <Query query={GET_SIZES}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <>
              <select
                className="pizza-size-select"
                onChange={this.props.changeSize}
              >
                {data.sizes.map(s => (
                  <option key={s.id} value={JSON.stringify(s)}>
                    {s.inches}"
                  </option>
                ))}
              </select>
            </>
          );
        }}
      </Query>
    );
  }
}

export default SelectPizzaSize;
