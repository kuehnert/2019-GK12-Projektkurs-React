import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from '../history';
import CharactersPage from '../features/characters/CharactersPage';
import EditCharacterPage from "../features/characters/EditCharacterPage";
import Welcome from './components/Welcome';
import Log from '../features/log/Log';

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/characters" exact component={CharactersPage} />
          {/* <Route path="/characters/:characterId" exact component={CharacterPage} /> */}
          <Route path="/characters/:characterId/edit" excat component={EditCharacterPage} />
          <Route path="/log" exact component={Log} />
          <Route path="/" exact component={Welcome} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
