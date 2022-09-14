import * as ActionTypes from './actionTypes'
import Axios from "axios"
import {baseUrl} from "../Shared/baseUrl"
import axios from 'axios'

function authHeaders() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
        const token = user.token;
        return token;
    } else {
        return {};
    }
}

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${authHeaders()}`
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

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
    const bigToken = getState().token;
    const response = await Axios.get(
        `${baseUrl}/recipe/my-recipes`, authHeaders()
    )

    dispatch({
        type: ActionTypes.FETCH_USER_RECIPES,
        payload: response.data
    })
}

export const fetchMealRecipes = (mealId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/recipe/meal-${mealId}`

    )
    dispatch({
        type: ActionTypes.FETCH_MEAL_RECIPES,
        payload: response.data
    })

}

export const fetchMealList= () => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal/my-meals`
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_LIST,
        payload: response.data
    })
}

export const fetchMealPlanList= () => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal-plan/my-meal-plans`
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_PLAN_LIST,
        payload: response.data
    })
}

export const fetchMealsByMealPlan= (mealPlanId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `http://localhost:8081/meal/meal-plan-${mealPlanId}`
    )

    dispatch({
        type: ActionTypes.FETCH_MEALS_BY_MEAL_PLAN,
        payload: response.data
    })
}