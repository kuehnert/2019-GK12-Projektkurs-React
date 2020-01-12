import { CssBaseline } from '@material-ui/core';
import { indigo, orange } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import App from './app/App';
import store from './app/store';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: indigo,
    secondary: orange,
    background: {
      paper: '#eee',
      default: '#ccc',
    },
  },
  typography: {
    htmlFontSize: 14,
    fontSize: 12,
  },
});

const render = () => {
  const App = require('./app/App').default;

  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>{' '}
    </MuiThemeProvider>,
    document.getElementById('root')
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
