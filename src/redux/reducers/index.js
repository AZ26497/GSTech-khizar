import { combineReducers } from 'redux';

import signInReducer from '../reducers/signInReducer';
import forgetReducer from '../reducers/forgetReducer';
import resetPassReducer from '../reducers/resetPassReducer';

export default combineReducers({
    signInReducer: signInReducer,
    forgetReducer: forgetReducer,
    resetPassReducer: resetPassReducer

})