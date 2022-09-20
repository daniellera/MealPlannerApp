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

// API CALLS:

/////////////////////////////////// RECIPES /////////////////////////////////////////////////////////////

export const fetchRecipe = (recipeId) => async (dispatch, getState) => {

        const response = await Axios.get(
            `${baseUrl}/recipe/${recipeId}`
        );

        dispatch({
            type: ActionTypes.FETCH_RECIPE,
            payload: response.data
        })
}


export const fetchUserRecipes = () => async (dispatch, getState) => {
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

export const addRecipe = (recipe) => async (dispatch, getState) => {
    const response = await Axios.post(
        `${baseUrl}/recipe/add`, recipe
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_RECIPES,
        payload: response.data
    })

}

export const editRecipe = (recipeId, newRecipe) => async (dispatch, getState) => {
    const response = await Axios.put(
        `${baseUrl}/recipe/${recipeId}/update`, newRecipe
    )

    dispatch({
        type: ActionTypes.EDIT_RECIPE,
        payload: response.data
    })
}

export const deleteRecipe = (recipeId) => async (dispatch, getState) => {
    const response = await Axios.put(
        `${baseUrl}/recipe/${recipeId}/delete`
    )

    dispatch({
        type: ActionTypes.DELETE_RECIPE,
        payload: response.data
    })
}

/////////////////////////////////// MEALS /////////////////////////////////////////////////////////////

export const fetchMealList= () => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal/my-meals`
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_LIST,
        payload: response.data
    })
}

export const fetchMeal= (mealId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal/${mealId}`
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL,
        payload: response.data
    })
}

export const fetchMealsByMealPlan= (mealPlanId) => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal/meal-plan-${mealPlanId}`
    )

    dispatch({
        type: ActionTypes.FETCH_MEALS_BY_MEAL_PLAN,
        payload: response.data
    })
}

export const addRecipeToMeal = (mealId, recipeId) => async (dispatch, getState) => {
    const response = await Axios.post(
        `${baseUrl}/meal/${mealId}/add-recipe-${recipeId}`
    )

    dispatch({
        type: ActionTypes.ADD_RECIPE_TO_MEAL,
        payload: response.data
    })
}

export const deleteRecipeFromMeal = (mealId, recipeId) => async (dispatch, getState) => {
    const response = await Axios.delete(
        `${baseUrl}/meal/${mealId}/delete-recipe-${recipeId}`
    )

    dispatch({
        type: ActionTypes.DELETE_RECIPE_FROM_MEAL,
        payload: response.data
    })
}

export const addMeal = (meal) => async (dispatch, getState) => {
    const response = await Axios.post(
        `${baseUrl}/meal/add`, meal
    )

    dispatch({
        type: ActionTypes.ADD_MEAL,
        payload: response.data
    })
}

//TODO: Delete Meal

/////////////////////////////////// MEAL PLANS /////////////////////////////////////////////////////////////

export const fetchMealPlanList= () => async (dispatch, getState) => {
    const response = await Axios.get(
        `${baseUrl}/meal-plan/my-meal-plans`
    )

    dispatch({
        type: ActionTypes.FETCH_MEAL_PLAN_LIST,
        payload: response.data
    })
}

export const addMealToMealPlan = (mealPlanId, mealId) => async (dispatch, getState) => {
    const response = await Axios.post(
        `${baseUrl}/meal-plan/${mealPlanId}/add-meal-${mealId}`
    )

    dispatch({
        type: ActionTypes.ADD_MEAL_TO_MEAL_PLAN,
        payload: response.data
    })
}

export const deleteMealFromMealPlan = (mealPlanId, mealId) => async (dispatch, getState) => {
    const response = await Axios.delete(
        `${baseUrl}/meal-plan/${mealPlanId}/delete-meal-${mealId}`

    )

    dispatch({
        type: ActionTypes.DELETE_MEAL_FROM_MEAL_PLAN,
        payload: response.data
    })
}