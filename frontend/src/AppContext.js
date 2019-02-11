import React from 'react';

const AppContext = React.createContext({
  error: '',
  loggedIn: false,
  handleAuth: () => {},
  showAlert: () => {}
});

export default AppContext;
