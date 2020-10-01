import React, {useEffect, useState} from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Model/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import RequestResolver from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import ErrorHandler from "../components/hoc/ErrorHandler/ErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const BurgerBuilder = () => {

    let [ingredients, setIngredients] = useState(null);

    let [price, setPrice] = useState(4);

    let [purchasable, setPurchasable] = useState(false);

    let [purchase, setPurchase] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        RequestResolver.get('https://spring-boot-oauth-27802.firebaseio.com/ingredients')
            .then(response => {
                setIngredients(response.data);
            }).catch(() => {
            setError(true);
        });
    }, [])

    const updatePurchaseHandler = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce(((previousValue, currentValue) => {
                return previousValue + currentValue;
            }), 0)
        setPurchasable(sum > 0);
    }


    const addIngredientHandler = type => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount;
        setIngredients(updatedIngredients);
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = price + priceAddition;
        setPrice(newPrice);
        updatePurchaseHandler(updatedIngredients)
    }

    const removeIngredientHandler = type => {
        const oldCount = ingredients[type];
        if (oldCount <= 0)
            return;
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients
        }
        updatedIngredients[type] = updatedCount;
        setIngredients(updatedIngredients);
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = price - priceDeduction;
        setPrice(newPrice);
        updatePurchaseHandler(updatedIngredients);
    }

    const purchaseHandler = () => {
        setPurchase(true);
    }

    const purchaseCancelHandler = () => {
        setPurchase(false);
    }

    const purchaseContinueHandler = () => {
        setLoading(true);
        const order = {
            ingredients,
            price,
            customer: {
                name: 'Ubaid',
                address: {
                    street: 'Lahore ki gali',
                    zipCode: '444000',
                    country: 'Pakistan'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        RequestResolver.post('/orders.json', order)
            .then((response) => {
                setLoading(false);
                setPurchase(false);
                console.log(response);
            }).catch((error) => {
            setLoading(false);
            setPurchase(false);
            console.log(error);
        });
    }

    const disabledInfo = {
        ...ingredients
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummaryView = null;


    let burgerAndBuilderView = error ? <p>Ingredient can't be loaded</p> : <Spinner/>;

    if (ingredients) {
        orderSummaryView = (
            <OrderSummary
                ingredients={ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={price}
            />
        );

        burgerAndBuilderView = (
            <React.Fragment>
                <Burger
                    ingredients={ingredients}
                />
                <BuildControls
                    addIngredientHandler={addIngredientHandler}
                    removeIngredientHandler={removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={price}
                    purchasable={purchasable}
                    purchaseHandler={purchaseHandler}
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

export default ErrorHandler(BurgerBuilder, RequestResolver);
