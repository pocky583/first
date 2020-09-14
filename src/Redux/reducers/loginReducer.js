import {SIGNED_IN, SIGNED_OUT, GET_TOKEN} from '../actions/types';



const userName = '로그인이 필요합니다.';
const userToken = false;

export function loginReducer(state = userName, action){
    switch (action.type){
        case SIGNED_IN:
            return action.payload;
        case SIGNED_OUT:
            return action.payload;
        default:
            return state;
    }
}

export function forToken(state = userToken, action){
    switch (action.type){
        case GET_TOKEN:
            return action.payload;
        default:
            return state;
    }
}