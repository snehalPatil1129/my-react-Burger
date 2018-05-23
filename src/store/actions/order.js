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
export const purchaseBurger = (order ,token ) => {
    return {
        type : actionTypes.PURCHASE_BURGER,
        order : order,
        token : token
    }
}

export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersInit = (token, userId) => {
   return {
       type : actionTypes.FETCH_ORDERS,
       token : token,
       userId : userId
   }
}
export const fetchOrderSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    };
}
export const fetchOrderFailure = (err) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAILURE,
        error : err
    };
}
export const fetchOrderStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    };
}