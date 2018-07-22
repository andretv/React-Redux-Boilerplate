import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import reducers from './reducers'
import DevTools from './dev-tools'

export default (initialState) => {

  const rootPersistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(rootPersistConfig, reducers)

  const enhancer = compose(
    applyMiddleware(
      thunk,
    ),
    DevTools.instrument()
  )

  const reduxStore = createStore(
    persistedReducer,
    initialState,
    enhancer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
  const persistor = persistStore(reduxStore)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      // We need to require for hot reloading to work properly.
      const nextRootReducer = require('./reducers')
      reduxStore.replaceReducer(
        persistReducer(persistConfig, nextRootReducer)
      )
    })
  }

  return { reduxStore, persistor }
}
