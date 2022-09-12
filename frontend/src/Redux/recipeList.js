import * as ActionTypes from './actionTypes'

export const RecipeList = (state = {
},

action) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_RECIPES:
            return action.payload;

        case ActionTypes.FETCH_MEAL_RECIPES:
            return action.payload;
        
        case ActionTypes.ADD_USER_RECIPE:
            return null;
            
        default: return state;
    }

}