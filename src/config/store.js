import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import rootReducer from '../reducers';


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

export default () => {
  // Creating store
  let store = null;
  let middleware = null;
  const sagaMiddleware = createSagaMiddleware();
  middleware = applyMiddleware(sagaMiddleware);

  // Tell react-snap how to save Redux state
  window.snapSaveState = () => {
    return ({
      __PRELOADED_STATE__: store.getState(),
    });
  };

  store = createStore(
    rootReducer,
    preloadedState || {},
    middleware
  );

  // Run sagas
  sagaMiddleware.run(rootSaga);

  return {
    store,
  };
};
