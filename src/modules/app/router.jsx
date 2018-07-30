import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

/**
 * Components
 */
import Loading from 'components/loading';

/**
 * Screens.
 */
const Home = Loadable({
  loader: () => import('./screens/home'),
  loading: () => <Loading />,
});

const Router = ({ match }) => (
  <Switch>
    <Route exact path={match.url} render={() => <Redirect to={`${match.url}/home`} />} />
    <Route path={`${match.url}/home`} component={Home} />
    <Redirect to={match.url} />
  </Switch>
);

Router.propTypes = {
  match: PropTypes.any,
};

Router.defaultProps = {
  match: {},
};

export default Router;
