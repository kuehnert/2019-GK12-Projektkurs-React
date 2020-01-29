import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../history';
import TodosPage from '../features/todos/TodosPage';
import EditTodoPage from "../features/todos/EditTodoPage";

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/todos" exact component={TodosPage} />
          {/* <Route path="/todos/:todoId" exact component={TodoPage} /> */}
          <Route path="/todos/:todoId/edit" excat component={EditTodoPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
