import DateFnsUtils from '@date-io/date-fns';
import { indigo, orange } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { de } from 'date-fns/locale';
import React from 'react';
import './App.css';
import Routes from './Routes';
import { CssBaseline } from '@material-ui/core';

const App: React.FC = (props: any) => {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={de}>
        <CssBaseline />
        <Routes />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: indigo,
    secondary: orange,
    background: {
      paper: '#f0f0f0',
      default: '#fafafa',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 12,
    h1: {
      fontSize: '6rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '4rem',
    },
    h4: {
      fontSize: '3rem',
    },
    h5: {
      fontSize: '2.5rem',
    },
    h6: {
      fontSize: '2rem',
    },
  },
});

export default App;
