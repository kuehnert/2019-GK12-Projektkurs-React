import { indigo, orange } from '@material-ui/core/colors';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import Routes from './Routes';

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
    htmlFontSize: 14,
    fontSize: 12,
  },
});

export default App;
