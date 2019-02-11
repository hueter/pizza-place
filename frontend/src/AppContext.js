import React from 'react';

const AppContext = React.createContext({
  loading: false,
  error: '',
  loggedIn: true,
  userId: null,
  handleAuth: () => {},
  showAlert: () => {},
  firstTime: true
});

export default AppContext;
