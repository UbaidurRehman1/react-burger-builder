import React, {useEffect, useState} from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Model/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import RequestResolver from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from '../../store/actions/index'


const BurgerBuilder = props => {

    let [purchase, setPurchase] = useState(false);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        props.onInitIngredients();
    }, [])

    const isPurchasable = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce(((previousValue, currentValue) => {
                return previousValue + currentValue;
            }), 0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchase(true);
        } else {
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchase(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout' );
    }

    const disabledInfo = {
        ...props.ingredients
    }
    for (let key in disabledInfo) {
        if (disabledInfo.hasOwnProperty(key)) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
    }

    let orderSummaryView = null;


    let burgerAndBuilderView = props.error ? <p>Ingredient can't be loaded</p> : <Spinner/>;

    console.log(props.ingredients);
    if (props.ingredients) {
        orderSummaryView = (
            <OrderSummary
                ingredients={props.ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={props.price}
            />
        );

        burgerAndBuilderView = (
            <React.Fragment>
                <Burger
                    ingredients={props.ingredients}
                />
                <BuildControls
                    addIngredientHandler={props.onIngredientAdded}
                    removeIngredientHandler={props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={props.price}
                    purchasable={isPurchasable(props.ingredients)}
                    purchaseHandler={purchaseHandler}
                    isAuth={props.isAuth}
                />
            </React.Fragment>
        );
    }

    if (loading) {
        orderSummaryView = (
            <Spinner/>
        );
    }

    return (
        <React.Fragment>
            <Modal
                show={purchase}
                loading={loading}
                modalClosed={purchaseCancelHandler}>
                {orderSummaryView}
            </Modal>
            {burgerAndBuilderView}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name) => dispatch(actionTypes.addIngredient(name)),
        onIngredientRemoved: (name) => dispatch(actionTypes.removeIngredient(name)),
        onInitIngredients: () => dispatch(actionTypes.initIngredients()),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, RequestResolver));
