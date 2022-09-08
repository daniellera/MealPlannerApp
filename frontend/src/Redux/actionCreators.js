import * as ActionTypes from './actionTypes'
import Axios from "axios"

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

export const fetchRecipe = () => async (dispatch, getState) => {

        const response = await Axios.get(
            `http://localhost:8081/recipe/1`
        );

        dispatch({
            type: ActionTypes.FETCH_RECIPE,
            payload: response.data
        })

        console.log(response.data)

    }