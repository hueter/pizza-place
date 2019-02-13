import React, { Component } from 'react';
import AppContext from '../../AppContext';
import NavBar from '../NavBar';
import Routes from '../Routes';
import { graphql, compose } from 'react-apollo';
import { SIGNUP, LOGIN } from '../../services/gqlQueries';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      loggedIn: false,
      handleAuth: this.handleAuth,
      handleLogout: this.handleLogout,
      showAlert: this.showAlert,
      clearError: this.clearError,
      firstTime: true
    };
  }

  componentDidMount() {
    // check if user has been here before
    const firstTime = !localStorage.getItem('visitedBefore');
    if (!firstTime) {
      localStorage.setItem('visitedBefore', true);
    }
    const token = localStorage.getItem('token');
    this.setState({ loading: false, firstTime, loggedIn: !!token });
  }

  handleAuth = signup => {
    return async formData => {
      this.clearError();
      try {
        const { signupMutation, loginMutation } = this.props;

        let response;
        let token;

        if (signup) {
          response = await signupMutation({ variables: { input: formData } });
          token = response.data.signup.token;
        } else {
          response = await loginMutation({
            variables: { email: formData.email, password: formData.password }
          });
          token = response.data.login.token;
        }
        localStorage.setItem('token', token);
        this.setState({ loggedIn: true });
      } catch (error) {
        console.log(error);
        const errorMessage = error.graphQLErrors
          .map(e => e.message)
          .join('.\n');
        this.setState({ error: errorMessage });
      }
    };
  };

  handleLogout = () => {
    this.setState({ loading: true }, () => {
      localStorage.removeItem('token');
      this.setState({ loggedIn: false, loading: false });
    });
  };

  showAlert = message => {
    alert(message);
  };

  clearError = () => {
    this.setState({ error: '' });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <AppContext.Provider value={this.state}>
        <NavBar />
        <Routes />
      </AppContext.Provider>
    );
  }
}

export default compose(
  graphql(SIGNUP, { name: 'signupMutation' }),
  graphql(LOGIN, { name: 'loginMutation' })
)(App);
