import { takeEvery, all , takeLatest} from 'redux-saga/effects';
import {
    logoutSaga,
    checkTimeOutSaga,
    authUserSaga,
    checkAuthStateSaga
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersInitSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkTimeOutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, checkAuthStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS_BURGER, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersInitSaga);
}