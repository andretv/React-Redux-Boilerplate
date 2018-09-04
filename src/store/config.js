/**
 * Main Redux Store configuration.
 *
 * Some useful links:
 * Redux         @tutorial https://github.com/reduxjs/redux
 * Redux Thunk   @tutorial https://github.com/reduxjs/redux-thunk
 * Redux Persist @tutorial https://github.com/rt2zz/redux-persist
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import freeze from 'redux-freeze';

/**
 * Packages used to connect React Router to Redux.
 * More info:
 * Connected React Router @tutorial https://github.com/supasate/connected-react-router
 */
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from './reducers';
import DevTools from './dev-tools';

/**
 * @function configStore
 * @param {?object} initialState Optional initial state to store.
 *
 * @description Configures redux store with redux persist,
 * and adds HotModuleReolad support.
 */
const configStore = (initialState) => {
  /**
   * @description Browser history.
   */
  const history = createBrowserHistory();

  /**
   * @typedef  {object}
   * @property {string}     key       Key to persist reducer.
   * @property {WebStorage} storage   Defaults to localStorage for web.
   * @property {string[]}   whitelist Only reducers in this list will be persisted.
   * @property {string[]}   blacklist Reducers in this list will not be persisted.
   *
   * @description Redux persist root configuration.
   * For nested persistors visit:
   * @tutorial https://github.com/rt2zz/redux-persist#nested-persists
   */
  const rootPersistConfig = {
    key: 'root',
    storage,
  };

  /**
   * @description Persisted root reducer.
   */
  const persistedReducer = persistReducer(rootPersistConfig, reducers);

  /**
   * @description Redux middlewares.
   */
  const middlewares = [
    routerMiddleware(history),
    thunk,
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(freeze);
  }

  /**
   * @description Store enhancer used to apply middlewares and devtools.
   */
  const enhancer = compose(
    applyMiddleware(
      ...middlewares,
    ),
    DevTools.instrument(),
  );

  /**
   * @description Redux store.
   */
  const reduxStore = createStore(
    connectRouter(history)(persistedReducer),
    initialState,
    enhancer,
    /* eslint no-underscore-dangle: 0 */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

  /**
   * @description Store persistor.
   */
  const persistor = persistStore(reduxStore);

  if (module.hot) {
    /**
     * Enable Webpack hot module replacement for reducers.
     */
    module.hot.accept(() => {
      /**
       * We need to require for hot reloading to work properly.
       */
      /* eslint global-require: 0 */
      const nextRootReducer = require('./reducers');
      reduxStore.replaceReducer(
        persistReducer(rootPersistConfig, nextRootReducer),
      );
    });
  }

  return { reduxStore, persistor, history };
};

export default configStore;
