import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as orderActions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        this.props.onGetOrders();
    }

    render () {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} 
                    name ={order.orderData.name} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders : state.orders.orders,
        loading : state.orders.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetOrders : () => dispatch(orderActions.fetchOrdersInit())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));