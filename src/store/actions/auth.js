import * as actionTypes from './actionTypes'
//import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        localId: userId,
        token: token
    };
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    };
}
export const checkTimeOut = (expirationTime) => {
    return {
        type : actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime :expirationTime
    };
}
export const logOut = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
}
export const logoutSucceed = () => {
    return { 
            type: actionTypes.AUTH_LOGOUT
    };
}

export const auth = (email, password, isSignUp) => {
    return {
        type : actionTypes.AUTH_USER,
        email : email,
        password : password,
        isSignUp : isSignUp
    }
}

export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    };
}

export const checkAuthState = () => {
   return {
        type : actionTypes.AUTH_CHECK_STATE
   };
}