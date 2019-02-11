import React, { Component } from 'react';
import AppContext from '../../AppContext';
import NavBar from '../NavBar';
import Routes from '../Routes';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loggedIn: false,
      handleAuth: this.handleAuth,
      showAlert: this.showAlert
    };
  }

  handleAuth = formPayload => {
    if (this.state.signUpForm) {
      // signup and login
    } else {
      this.setState({ loggedIn: true });
    }
  };

  showAlert = message => {
    alert(message);
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <NavBar />
        <Routes />
      </AppContext.Provider>
    );
  }
}

export default App;
