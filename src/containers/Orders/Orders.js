import React, {useEffect} from "react";
import Order from "../../components/Order/Order";
import RequestResolver from "../../axios-orders";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import {fetchOrders} from "../../store/actions";
import {connect} from "react-redux";

const Orders = props => {


    useEffect(() => {
        props.onFetchOrders(props.token, props.userId);
    }, []);

    return (
        props.loading ? <Spinner/> :
        <div>
            {
                props.orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                })
            }
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, RequestResolver));
