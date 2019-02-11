import React, { Component } from 'react';
import { Redirect } from '@reach/router';
import AppContext from '../../AppContext';

function authRequired(WrappedComponent) {
  return class ProtectedRouteComponent extends Component {
    render() {
      return (
        <AppContext.Consumer>
          {({ loggedIn, showAlert }) => {
            if (!loggedIn) {
              showAlert(`Please Login Before Continuing to ${this.props.path}`);
              return <Redirect to="/" />;
            } else {
              return <WrappedComponent {...this.props} />;
            }
          }}
        </AppContext.Consumer>
      );
    }
  };
}

export default authRequired;
