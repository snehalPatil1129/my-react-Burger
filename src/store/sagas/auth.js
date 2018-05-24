import { put ,call } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { delay } from 'redux-saga';
import axios from 'axios';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'] , "token");
    yield call([localStorage, 'removeItem'] , "expirationDate");
    yield call([localStorage, 'removeItem'] , "userId");
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkTimeOutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logOut());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB-rZ5008V7OT2sn27HGC3Y7rOrCTdh9ME';
    if (!action.isSignUp) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-rZ5008V7OT2sn27HGC3Y7rOrCTdh9ME';
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkTimeOut(response.data.expiresIn));
    }
    catch (error) {
        yield put(actions.authFailure(error.response.data.error));
    }
}

export function * checkAuthStateSaga (action){
    const token = yield localStorage.getItem('token');
    if (!token) {
       yield put(actions.logOut());
    }
    else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logOut());
        }
        else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}