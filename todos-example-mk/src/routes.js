import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import TodoPage from './components/TodoPage';
import TodoEditPage from './components/TodoEditPage';
// import NotFoundPage from './shared/NotFoundPage';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={TodoPage} />
        <Route path="/todos/:id" exact component={TodoEditPage} />
        {/* <Route path="*" component={NotFoundPage} status={404} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
