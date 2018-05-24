import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
//import { delay } from 'redux-saga';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga (action) {
        yield put(actions.purchaseBurgerStart());
        try {
            const response = yield  axios.post( '/orders.json?auth=' + action.token, action.order);
            yield put(actions.purchaseBurgerSuccess(response.data.name , action.order));
        }
        catch (error){
            yield put(actions.purchaseBurgerFailure(error));
        }
}

export function* fetchOrdersInitSaga (action) {
    yield put(actions.fetchOrderStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try{
        const response = yield  axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrderSuccess(fetchedOrders));
    }
    catch (error) {
        yield put(actions.fetchOrderFailure(error));
    }           
}