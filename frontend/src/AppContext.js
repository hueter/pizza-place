import React from 'react';

const AppContext = React.createContext({
  loading: false,
  error: '',
  loggedIn: false,
  handleAuth: () => {},
  handleLogout: () => {},
  showAlert: () => {},
  clearError: () => {},
  firstTime: true
});

export default AppContext;
