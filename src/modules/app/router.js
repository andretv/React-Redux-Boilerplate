import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

/**
 * Screens.
 */
const Home = Loadable({
  loader: () => import('./screens/home'),
  loading: () => <div>Carregando...</div>,
});

const Router = ({ match }) =>
  <Switch>
    <Route exact path={match.url}
      render={() => <Redirect to={`${match.url}/home`} />} />
    <Route path={`${match.url}/home`} component={Home} />
    <Redirect to={match.url} />
  </Switch>;

export default Router;
