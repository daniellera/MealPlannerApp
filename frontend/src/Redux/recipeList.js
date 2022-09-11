import * as ActionTypes from './actionTypes'

export const RecipeList = (state = [
    {


    }
], action) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_RECIPES:
            return null;

        case ActionTypes.FETCH_MEAL_RECIPES:
            return null;
        
        case ActionTypes.ADD_USER_RECIPE:
            return null;
    }

}