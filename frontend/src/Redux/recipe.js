import * as ActionTypes from './actionTypes'

export const Recipe = (state = {
        id: null,
        title: "",
        details: "",
        instructions: "",
        dish_type: "",
        isPublic: false
    }, action) => {
        switch (action.type) {
            case ActionTypes.ADD_RECIPE:
                return {...state,
                    id: action.payload.id,
                    title: action.payload.title,
                    details: action.payload.details,
                    instructions: action.payload.instructions,
                    dishType: action.payload.dishType,
                };

            case ActionTypes.FETCH_RECIPE:
                return action.payload;

            case ActionTypes.EDIT_RECIPE:
                return state.map(recipe => 
                    recipe.id !== action.payload.id ? recipe : {...recipe, ...action.payload});

            case ActionTypes.DELETE_RECIPE:
                return state.filter();

            default:
                return state;
    }

}