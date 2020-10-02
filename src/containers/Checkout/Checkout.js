import React, {useEffect, useState} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from 'react-router-dom'
import ContactData from "./ContactData/ContactData";

const Checkout = props => {
    const search = props.location.search;

    const [ingredients, setIngredients] = useState({
        salad: 1,
        meat: 1,
        cheese: 1,
        bacon: 1
    });
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const checkoutURL = props.location.pathname;
        console.log(checkoutURL);
        if (checkoutURL !== '/checkout/contact-data') {
            const ingredients = Object.fromEntries(new URLSearchParams(search));
            const price = ingredients['price'];
            setPrice(price);
            delete ingredients['price'];
            setIngredients(ingredients);
            console.log("Effect ran");
        }
    }, [props.location.pathname, search]);

    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        console.log("You clicked on continue");
        console.log(ingredients);
        props.history.push('/checkout/contact-data');
        // const baseUrl = props.match.url;
        // const url = baseUrl + '/contact-data';
        // console.log(url);
        // props.history.push(url);
        // props.history.replace('/checkout/contact-data');
    }

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelled}
                checkoutContinued={checkoutContinued}
            />
            <Route
                path='/checkout/contact-data'
                render={(props) => {
                    return (
                        <ContactData
                            ingredients={ingredients}
                            price={price}
                            {...props}
                        />
                    );
                }}
            />
        </div>
    );
}

export default Checkout;
