import { combineReducers } from 'redux';
import { getHomeDataReducer } from './home';
import { getConditionsReducer } from './conditions';

export default combineReducers({
  home: getHomeDataReducer.getReducerFunction(),
  conditions: getConditionsReducer.getReducerFunction(),
});
