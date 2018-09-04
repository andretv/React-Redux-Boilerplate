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
const Login = Loadable({
  loader: () => import('./screens/login'),
  loading: () => <Loading />,
});

const Router = ({ match }) => (
  <Switch>
    <Route exact path={match.url} render={() => <Redirect to={`${match.url}/login`} />} />
    <Route path={`${match.url}/login`} component={Login} />
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
