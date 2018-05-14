import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
}
export const purchaseBurgerFailure = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAILURE,
        error : error
    };
}
export const purchaseBurger = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', order )
        .then( response => {
            console.log("order response",response.data);
            dispatch(purchaseBurgerSuccess(response.data , order));
        } )
        .catch( error => {
            dispatch(purchaseBurgerFailure(error));
        } );
    }
}

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    };
}