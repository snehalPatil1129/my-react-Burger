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
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json?auth=' + token, order )
        .then( response => {
            console.log("order response",response.data);
            dispatch(purchaseBurgerSuccess(response.data.name , order));
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

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    };
}

export const fetchOrdersInit = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
              console.log('fetchedOrders', fetchedOrders);
           dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(err => {
          
            dispatch(fetchOrderFailure(err));
        });
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