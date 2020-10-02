import React from "react";
import classes from './Burger.module.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {

    let ingredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            const numberOfIngredients = +props.ingredients[ingredientKey];
           return [...Array(numberOfIngredients)].map((_, i) => {
               return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
           })
        }).reduce((previousValue, currentValue) => {
             return previousValue.concat(currentValue);
        });
    console.log(ingredients);
    if (ingredients.length === 0) {
        ingredients = <p>Please Add Ingredients to build Burger</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;
