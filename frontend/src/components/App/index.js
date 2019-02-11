import React, { Component } from 'react';
import AppContext from '../../AppContext';
import NavBar from '../NavBar';
import Routes from '../Routes';
import { saveSession, rehydrateSession } from '../../services/session';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      loggedIn: true,
      userId: null,
      handleAuth: this.handleAuth,
      showAlert: this.showAlert,
      firstTime: true
    };
  }

  componentDidMount() {
    // check if user has been here before
    // const visitedBefore = rehydrateSession('visitedBefore');
    // if (visitedBefore) {
    //   this.setState({ firstTime: false });
    // } else {
    //   // if it's their first time, mark it down that they have
    //   saveSession('visitedBefore', true);
    // }
    const loggedIn = rehydrateSession('token');
    this.setState({ loading: false });
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

export default App;
