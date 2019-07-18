import { combineReducers } from 'redux';
import { getHomeDataReducer } from './home';
import { getConditionsReducer } from './conditions';
import { getPriceReducer } from './price';

export default combineReducers({
  home: getHomeDataReducer.getReducerFunction(),
  conditions: getConditionsReducer.getReducerFunction(),
  price: getPriceReducer.getReducerFunction(),
});
