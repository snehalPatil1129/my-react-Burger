import { takeEvery } from 'redux-saga/effects';
import {
    logoutSaga,
    checkTimeOutSaga,
    authUserSaga,
    checkAuthStateSaga
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga , fetchOrdersInitSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga);
}

export function* watchBurgerBuilder () {
    yield takeEvery(actionTypes.INIT_INGREDIENTS_BURGER , initIngredientsSaga);
}

export function* watchOrder () {
    yield takeEvery(actionTypes.PURCHASE_BURGER , purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS , fetchOrdersInitSaga);
}