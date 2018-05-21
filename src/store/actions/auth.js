import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        localId: authData.localId,
        token: authData.idToken
    };
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    };
}
export const checkTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() =>{
            dispatch(logOut());
        }, expirationTime * 1000);
    }
}
export const logOut = () => {
    return {
        type : actionTypes.AUTH_LOGOUT
    };
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-rZ5008V7OT2sn27HGC3Y7rOrCTdh9ME';
        if (!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-rZ5008V7OT2sn27HGC3Y7rOrCTdh9ME';
        }
        axios.post(url, authData)
            .then((response) => {
                console.log(response);
                dispatch(authSuccess(response.data));
                dispatch(checkTimeOut(response.data.expiresIn));
            })
            .catch((error) => {
                //console.log(error);
                dispatch(authFailure(error.response.data.error));
            });
    };
}