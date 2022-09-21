import * as ActionTypes from './actionTypes'

export const Ingredients = (state = {
    id: null,
    name: '',
    amount: '',
    tobepurchased: false
},

action) => {
    switch (action.type) {
        case ActionTypes.FETCH_RECIPE_INGREDIENTS:
            return action.payload;
        default:
            return state;
    }
}