import * as ActionTypes from './actionTypes'
import Axios from "axios"
import {baseUrl} from "../Shared/baseUrl"

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
            `http://localhost:8081/recipe/${recipeId}`
        );

        dispatch({
            type: ActionTypes.FETCH_RECIPE,
            payload: response.data
        })


    }

export const fetchUserRecipes = (userId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `http://localhost:8081/recipe/user-${userId}`
    )

    dispatch({
        type: ActionTypes.FETCH_USER_RECIPES,
        payload: response.data
    })
}

export const fetchMealRecipes = (mealId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `http://localhost:8081/recipe/meal-${mealId}`

    )
    dispatch({
        type: ActionTypes.FETCH_MEAL_RECIPES,
        payload: response.data
    })

}

export const fetchMealList= (userId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `http://localhost:8081/meal/user-${userId}`
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_LIST,
        payload: response.data
    })
}

export const fetchMealPlanList= (userId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `http://localhost:8081/meal-plan/user-${userId}`
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_PLAN_LIST,
        payload: response.data
    })
}