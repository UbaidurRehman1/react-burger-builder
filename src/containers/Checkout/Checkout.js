import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from 'react-router-dom'
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux'

const Checkout = props => {

    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        console.log("You clicked on continue");
        console.log(props.ingredients);
        props.history.push('/checkout/contact-data');
    }

    return (
        !props.ingredients ? <Redirect to="/"/> :
            props.purchased ? <Redirect to="/"/> :
                <div>
                    <CheckoutSummary
                        ingredients={props.ingredients}
                        checkoutCancelled={checkoutCancelled}
                        checkoutContinued={checkoutContinued}
                    />
                    <Route
                        path='/checkout/contact-data'
                        component={ContactData}
                    />
                </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);
