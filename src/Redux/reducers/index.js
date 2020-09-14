import {combineReducers} from 'redux';
import {loginReducer, forToken} from './loginReducer';

export default combineReducers({
    userName: loginReducer,
    userToken: forToken
})