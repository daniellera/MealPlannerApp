import * as ActionTypes from './actionTypes'
import Axios from "axios"
import {baseUrl} from "../Shared/baseUrl"

const authHeaders = () => {
    return (dispatch, getState) => {
        const authToken = getState().token;
        console.log(authToken);

        return { 'Authorization': 'Bearer ' + authToken}
    }
}

const requestBody = () => {
    return {}
}

export const addToken = (token) => ({
    type: ActionTypes.ADD_TOKEN,
    payload: token
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const deleteUser = () => ({
    type: ActionTypes.DELETE_USER
})

export const fetchRecipe = (recipeId) => async (dispatch, getState) => {

        const response = await Axios.get(
            `${baseUrl}/recipe/${recipeId}`
        );

        dispatch({
            type: ActionTypes.FETCH_RECIPE,
            payload: response.data
        })
    }

export const fetchUserRecipes = (token) => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/recipe/my-recipes`, {headers: { 'Authorization': 'Bearer ' + token}}
    )

    dispatch({
        type: ActionTypes.FETCH_USER_RECIPES,
        payload: response.data
    })
}

export const fetchMealRecipes = (mealId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/recipe/meal-${mealId}`, authHeaders

    )
    dispatch({
        type: ActionTypes.FETCH_MEAL_RECIPES,
        payload: response.data
    })

}

export const fetchMealList= () => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal/my-meals`, requestBody, authHeaders
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_LIST,
        payload: response.data
    })
}

export const fetchMealPlanList= () => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal-plan/my-meal-plans`, requestBody, authHeaders
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_PLAN_LIST,
        payload: response.data
    })
}