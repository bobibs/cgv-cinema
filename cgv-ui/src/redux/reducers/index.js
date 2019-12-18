import { combineReducers } from 'redux';
import LogReducer from './LogReducers';
import CartReducer from './CartReducer';

export default combineReducers({
	LogReducer,
	CartReducer
});
