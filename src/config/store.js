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

    // Enable DevTools if browser extension is installed
    // if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    //   middleware = compose(
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
    //   );
    // }




  // Tell react-snap how to save Redux state
  window.snapSaveState = () => {
    console.log('uzet store',store.getState(),);

    return ({
      __PRELOADED_STATE__: store.getState(),
    });
  };

  console.log('preloded',window.__PRELOADED_STATE__);
  console.log('saved',snapSaveState);


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
