import { indigo, orange } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Routes from './Routes';
import './App.css';

const App: React.FC = (props: any) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  );
};

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: indigo,
    secondary: orange,
    background: {
      paper: '#eee',
      default: '#ddd',
    },
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 13,
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
