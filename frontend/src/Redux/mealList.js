import * as ActionTypes from './actionTypes'

export const MealList = (state = {
},

action) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEAL_LIST:
            return action.payload;

        case ActionTypes.FETCH_MEAL:
            return action.payload;
        
        case ActionTypes.ADD_MEAL:
            return null;
            
        default: return state;
    }

}