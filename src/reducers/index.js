import { combineReducers } from 'redux';
import { getHomeDataReducer } from './home';
import { getConditionsReducer } from './conditions';
import { getPriceReducer } from './price';
import { getReservedClassReducer } from './reservation';


export default combineReducers({
  home: getHomeDataReducer.getReducerFunction(),
  conditions: getConditionsReducer.getReducerFunction(),
  price: getPriceReducer.getReducerFunction(),
  reservedClass: getReservedClassReducer.getReducerFunction(),
});
