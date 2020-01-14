import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import LoginPage from '../features/teachers/LoginPage';
import SignUpPage from '../features/teachers/SignUpPage';
import WelcomePage from '../features/welcome/WelcomePage';
import history from '../history';
import { RootState } from './rootReducer';
import Routes from './Routes';

const App: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.teachers);

  if (!isLoggedIn) {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/login" exact component={LoginPage} />
        </Switch>
      </Router>
    );
  } else {
    return <Routes />;
  }
};

export default App;
