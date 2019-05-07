import { hot } from 'react-hot-loader/root';
import React from 'react';
import './style.css';

import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';

import RouterContainer from './RouterContainer';
import store from './store';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey
  },
  status: {
    danger: 'orange'
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <RouterContainer />
      </MuiThemeProvider>
    </Provider>
  );
}

export default hot(App);
