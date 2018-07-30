import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * Store config.
 */
import configStore from 'store/config';

/**
 * Components
 */
import Loading from 'components/loading';

/**
 * Screens.
 */
const App = Loadable({
  loader: () => import('modules/app'),
  loading: () => <Loading />,
});
const Login = Loadable({
  loader: () => import('modules/auth/screens/login'),
  loading: () => <Loading />,
});

const { reduxStore, persistor, history } = configStore();

export const store = reduxStore;

const Root = () => (
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/app" component={App} />
          <Redirect to="/" />
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>
);

export default Root;
