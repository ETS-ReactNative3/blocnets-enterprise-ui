import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/index';

export default function configureStore(initialState) {

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // options like actionSanitizer, stateSanitizer
      }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk)
  );

  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  );

  store.subscribe(() => {
    //console.log("STORE CHANGED: ", store.getState());
  })

  return store;
}
