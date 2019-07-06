import { combineReducers } from 'redux';
import { getHomeDataReducer } from './home';

export default combineReducers({
  home: getHomeDataReducer.getReducerFunction(),
});
