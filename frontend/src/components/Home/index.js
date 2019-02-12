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

  renderForm = handleAuth => {
    const loginFields = ['Email Address', 'Password'];
    const signUpFields = [...loginFields, 'First Name', 'Last Name'];
    return (
      <>
        <div className="row">
          <div className="col-1 please">
            <h1>Please {this.state.signUpForm ? 'Sign Up' : 'Log In'} First</h1>
            <button
              className="toggle-signup"
              onClick={() =>
                this.setState(st => ({ signUpForm: !st.signUpForm }))
              }
            >
              Actually I Need To {this.state.signUpForm ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>
        <BasicForm
          fields={this.state.signUpForm ? signUpFields : loginFields}
          onSubmit={handleAuth}
        />
      </>
    );
  };

  render() {
    return (
      <div className="container">
        <AppContext.Consumer>
          {({ loggedIn, handleAuth }) => (
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
                </>
              ) : (
                this.renderForm(handleAuth)
              )}
            </div>
          )}
        </AppContext.Consumer>
      </div>
    );
  }
}

export default Home;
