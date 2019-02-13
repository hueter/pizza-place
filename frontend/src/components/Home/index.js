import React, { PureComponent } from 'react';
import { Link } from '@reach/router';
import BasicForm from '../BasicForm';
import PizzaStock from '../../images/pizza_stock.jpg';
import AppContext from '../../AppContext';
import './style.css';

class Home extends PureComponent {
  state = {
    signUpForm: false
  };

  renderForm = (handleAuth, clearError) => {
    const fields = [
      { label: 'Email Address', name: 'email', show: true },
      { label: 'Password', name: 'password', show: true },
      { label: 'First Name', name: 'firstName', show: this.state.signUpForm },
      { label: 'Last Name', name: 'lastName', show: this.state.signUpForm }
    ];
    return (
      <>
        <div className="row">
          <div className="col-1 please">
            <h1>Please {this.state.signUpForm ? 'Sign Up' : 'Log In'} First</h1>
            <button
              className="toggle-signup"
              onClick={() => {
                this.setState(st => ({ signUpForm: !st.signUpForm }));
                clearError();
              }}
            >
              Actually I Need To {this.state.signUpForm ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>
        <BasicForm
          fields={fields}
          onSubmit={handleAuth(this.state.signUpForm)}
        />
      </>
    );
  };

  render() {
    return (
      <div className="container">
        <AppContext.Consumer>
          {({ loggedIn, handleAuth, handleLogout, error, clearError }) => (
            <div className="row home-main">
              <h1>Welcome to the Pizza Place</h1>
              <div className="pizza-hero">
                <img src={PizzaStock} alt="Yummy Pizza" />
              </div>
              {loggedIn ? (
                <>
                  <h2>Great! You're Logged In.</h2>
                  <h2>
                    Go Ahead and <Link to="/order">Order Now!</Link>
                  </h2>
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                this.renderForm(handleAuth, clearError)
              )}
              {error && <h3 className="error">Error: {error}</h3>}
            </div>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

export default Home;
