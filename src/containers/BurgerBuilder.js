import React, {useState} from "react";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Model/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const BurgerBuilder = () => {

    let [ingredients, setIngredients] = useState({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    });

    let [price, setPrice] = useState(4);

    let [purchasable, setPurchasable] = useState(false);

    let [purchase, setPurchase] = useState(false);

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
            return ;
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
        alert("You Continue");
    }

    const disabledInfo = {
        ...ingredients
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
        <React.Fragment>
            <Modal
                show={purchase}
                modalClosed={purchaseCancelHandler}>
                <OrderSummary
                    ingredients={ingredients}
                    purchaseCancelled={purchaseCancelHandler}
                    purchaseContinued={purchaseContinueHandler}
                    price={price}
                />
            </Modal>
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

export default BurgerBuilder;
