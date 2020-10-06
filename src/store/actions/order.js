import * as actionTypes from './ActionTypes'
import RequestResolver from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        console.log(orderData);
        RequestResolver.post('/orders.json', orderData)
            .then((response) => {
                console.log(response);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            }).catch((error) => {
                console.log(error);
                dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCh_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderInit());
        RequestResolver.get('/orders.json')
            .then((response) => {
                console.log(response.data);
                const orders = [];
                const data = response.data;
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        orders.push({
                            ...data[key],
                            id: key
                        })
                    }
                }
                dispatch(fetchOrderSuccess(orders));
            }).catch((error) => {
                dispatch(fetchOrderFail(error))
        })
    }
}
