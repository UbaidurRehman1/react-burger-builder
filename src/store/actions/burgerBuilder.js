import * as actionTypes from './ActionTypes'
import RequestResolver from "../../axios-orders";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const _initIngredients = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENT,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        RequestResolver.get('https://spring-boot-oauth-27802.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(_initIngredients(response.data))
            }).catch(() => {
                dispatch(fetchIngredientFailed());
        });
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}
