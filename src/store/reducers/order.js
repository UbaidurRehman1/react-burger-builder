import
{PURCHASE_INIT,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCESS,
    PURCHASE_BURGER_FAIL,
    FETCH_ORDERS_INIT,
    FETCH_ORDER_SUCCESS,
    FETCh_ORDER_FAIL} from "../actions/ActionTypes";
import {updateObject} from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}


const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId,
    }
    return updateObject(state,{loading: false, orders: state.orders.concat(newOrder), purchased: true})
}
const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_INIT: return updateObject(state, {purchased: false});
        case PURCHASE_BURGER_START: return updateObject(state, {loading: true});
        case PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false})
        case FETCH_ORDERS_INIT: return updateObject(state, {loading: true});
        case FETCH_ORDER_SUCCESS: return updateObject(state, {orders: action.orders, loading: false});
        case FETCh_ORDER_FAIL: return updateObject(state, {loading: true})
        default: return state;
    }
};

export default OrderReducer;
