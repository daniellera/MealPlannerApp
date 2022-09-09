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

export const fetchRecipe = (id) => async (dispatch, getState) => {

        const response = await Axios.get(
            `${baseUrl}/recipe/${id}`
        );

        dispatch({
            type: ActionTypes.FETCH_RECIPE,
            payload: response.data
        })

        

    }
export const fetchIngredients = (id) => async (dispatch, getState) => {

    const response = await Axios.get(
        `${baseUrl}/ingredients/recipe/${id}`
    );

    dispatch({
        type: ActionTypes.FETCH_RECIPE_INGREDIENTS,
        payload: response.data
    })
}