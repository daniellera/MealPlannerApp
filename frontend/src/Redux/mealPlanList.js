import * as ActionTypes from './actionTypes'

export const MealPlanList = (state = {
},

action) => {
    switch (action.type) {
        case ActionTypes.FETCH_MEAL_PLAN_LIST:
            return action.payload;

        case ActionTypes.FETCH_MEAL_PLAN:
            return action.payload;
        
        case ActionTypes.ADD_MEAL_PLAN:
            return null;
            
        default: return state;
    }

}
