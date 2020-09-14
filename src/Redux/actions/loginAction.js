import {SIGNED_IN, SIGNED_OUT, GET_TOKEN} from './types';

export function signIn(){
    return{
        type: SIGNED_IN,
        payload: '박원민' //username
    };
}

export function signOut(){
    return{
        type: SIGNED_OUT,
        payload: '로그인이 필요합니다.'
    }
}

export function getToken(){
    return{
        type: GET_TOKEN,
        payload: true
    }
}