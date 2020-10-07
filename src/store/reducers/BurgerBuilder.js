import * as actionType from '../actions/ActionTypes'
import {updateObject} from "../utility";

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState =  {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIngredient_ = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngredients_ = updateObject(state.ingredients, updatedIngredient_)
    const updatedState_ =  {
        ingredients: updatedIngredients_,
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedState_)
}

const initIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        price: 4,
        building: false
    });
}

const BurgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionType.INIT_INGREDIENT: return initIngredient(state, action);
        case actionType.FETCH_INGREDIENT_FAILED: return updateObject(state, {error: true});
        default: return state;
    }
}

export default BurgerBuilder;
